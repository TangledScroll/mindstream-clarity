import { useRef, useEffect } from "react";
import "./Grid.css";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

type TrailSquare = {
  x: number;
  y: number;
  time: number;
};

export interface GridProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
}

const Grid: React.FC<GridProps> = ({
  direction = "right",
  speed = 2,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const trailRef = useRef<TrailSquare[]>([]);
  const velocityRef = useRef<GridOffset>({ x: 0, y: 0 });

  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const effectiveSpeed = Math.max(speed, 0.1);

    const setVelocityFromDirection = (
      dir: GridProps["direction"],
      spd: number
    ) => {
      switch (dir) {
        case "right":
          velocityRef.current = { x: -spd, y: 0 };
          break;
        case "left":
          velocityRef.current = { x: spd, y: 0 };
          break;
        case "up":
          velocityRef.current = { x: 0, y: -spd };
          break;
        case "down":
          velocityRef.current = { x: 0, y: spd };
          break;
        case "diagonal":
        default:
          velocityRef.current = { x: -spd, y: -spd };
          break;
      }
    };

    // Initialise velocity from prop direction/speed
    setVelocityFromDirection(direction, effectiveSpeed);

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const roundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      const TRAIL_DURATION = 500; // ms, tweak if you want longer/shorter trails

      // Remove old trail entries
      trailRef.current = trailRef.current.filter(
        (t) => now - t.time < TRAIL_DURATION
      );

      const startX =
        Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY =
        Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          const cellX = Math.floor((x - startX) / squareSize);
          const cellY = Math.floor((y - startY) / squareSize);

          const isHovered =
            hoveredSquareRef.current &&
            cellX === hoveredSquareRef.current.x &&
            cellY === hoveredSquareRef.current.y;

          // How "strong" is the trail on this cell (0..1)?
          let trailStrength = 0;
          for (const t of trailRef.current) {
            if (t.x === cellX && t.y === cellY) {
              const age = now - t.time;
              if (age < TRAIL_DURATION) {
                const life = 1 - age / TRAIL_DURATION; // 1 → 0 as it ages
                if (life > trailStrength) trailStrength = life;
              }
            }
          }

          // Draw hover or trail fill (hover overrides, always full strength)
          if (isHovered || trailStrength > 0) {
            const alpha = isHovered ? 1 : trailStrength;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = hoverFillColor;
            roundRect(ctx, squareX, squareY, squareSize, squareSize, 8);
            ctx.fill();
            ctx.restore();
          }

          // Border
          ctx.strokeStyle = borderColor;
          roundRect(ctx, squareX, squareY, squareSize, squareSize, 8);
          ctx.stroke();
        }
      }

      // Vignette kept, but fully transparent as you set it
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const vx = velocityRef.current.x;
      const vy = velocityRef.current.y;

      // Wrap offsets to keep them in [0, squareSize) range
      gridOffset.current.x =
        (gridOffset.current.x + vx + squareSize) % squareSize;
      gridOffset.current.y =
        (gridOffset.current.y + vy + squareSize) % squareSize;

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX =
        Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY =
        Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };

        // Add this square to the trail
        trailRef.current.push({
          x: hoveredSquareX,
          y: hoveredSquareY,
          time: performance.now(),
        });

        // Cap trail length so it doesn't grow forever
        if (trailRef.current.length > 300) {
          trailRef.current.shift();
        }
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    // Drag start
    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      isDraggingRef.current = true;
      dragStartRef.current = { x, y };
    };

    // Drag end → set new velocity from drag vector
    const handleMouseUp = (event: MouseEvent) => {
      if (!isDraggingRef.current || !dragStartRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const endX = event.clientX - rect.left;
      const endY = event.clientY - rect.top;

      const dx = endX - dragStartRef.current.x;
      const dy = endY - dragStartRef.current.y;

      isDraggingRef.current = false;
      dragStartRef.current = null;

      const len = Math.hypot(dx, dy);
      if (len < 5) {
        // tiny drag – ignore
        return;
      }

      const nx = dx / len;
      const ny = dy / len;

      // User expectation: drag up → grid moves up, etc.
      velocityRef.current = {
        x: -nx * speed,
        y: -ny * speed,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleMouseDown);
    // use window for mouseup so releasing outside canvas still works
    window.addEventListener("mouseup", handleMouseUp);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <div className="grid-wrapper">
      <canvas ref={canvasRef} className="grid-canvas" />
    </div>
  );
};

export default Grid;
