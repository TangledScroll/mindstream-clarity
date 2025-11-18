import { useEffect, useRef } from 'react';
import './GradientBlinds.css';

interface GradientBlindsProps {
  className?: string;
}

export const GradientBlinds = ({ className = '' }: GradientBlindsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Gradient colors
    const color1 = '#513565'; // Deep Purple
    const color2 = '#647260'; // Earthy Green
    const bgColor = '#FEF6EB'; // Warm Cream

    const blindCount = 14;
    const noise = 0.25;
    const distort = 0.2;

    let animationFrameId: number;

    const animate = () => {
      // Ease mouse position
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Clear with background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const blindWidth = canvas.width / blindCount;
      const time = Date.now() * 0.0003;

      for (let i = 0; i < blindCount; i++) {
        const x = i * blindWidth;
        const normalizedX = i / blindCount;

        // Calculate spotlight influence
        const distanceFromMouse = Math.abs(normalizedX - mouseRef.current.x);
        const spotlightInfluence = Math.max(0, 1 - distanceFromMouse * 2);

        // Add subtle noise and distortion
        const noiseValue = Math.sin(time + i * 0.5) * noise;
        const distortValue = Math.sin(time * 0.5 + i * 0.3) * distort;

        // Blend between colors based on position and mouse
        const colorMix = normalizedX + noiseValue + (spotlightInfluence * 0.3);
        const gradient = ctx.createLinearGradient(x, 0, x + blindWidth, canvas.height);

        // Parse hex to rgb
        const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : { r: 0, g: 0, b: 0 };
        };

        const c1 = hexToRgb(color1);
        const c2 = hexToRgb(color2);

        const mixedColor = {
          r: Math.round(c1.r + (c2.r - c1.r) * colorMix),
          g: Math.round(c1.g + (c2.g - c1.g) * colorMix),
          b: Math.round(c1.b + (c2.b - c1.b) * colorMix),
        };

        const alpha = 0.15 + (spotlightInfluence * 0.15);

        gradient.addColorStop(0, `rgba(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}, ${alpha - distortValue * 0.1})`);
        gradient.addColorStop(0.5, `rgba(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}, ${alpha - distortValue * 0.1})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, 0, blindWidth + 1, canvas.height);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`gradient-blinds ${className}`}
    />
  );
};
