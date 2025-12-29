import { useEffect, useRef, useState } from 'react';
import Grid from '@/components/Grid';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

function useInViewList(count: number, options?: IntersectionObserverInit) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [inView, setInView] = useState<boolean[]>(() => Array(count).fill(false));

  useEffect(() => {
    setInView(Array(count).fill(false));
    refs.current = refs.current.slice(0, count);

    const observer = new IntersectionObserver((entries) => {
      setInView((prev) => {
        const next = [...prev];
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (!Number.isNaN(idx) && entry.isIntersecting) {
            next[idx] = true;
          }
        }
        return next;
      });
    }, options ?? { threshold: 0.3, rootMargin: '0px' });

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [count]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { inView, setRef };
}

const timelineData = [
  { title: 'Foundation', description: 'Founded with a focus on operational clarity.' },
  { title: 'Growth', description: 'Built systems for high-growth teams.' },
  { title: 'Innovation', description: 'Expanded into AI-driven workflow intelligence.' },
  { title: 'Evolution', description: 'Continually refining business automation.' },
];

const About = () => {
  const { inView, setRef } = useInViewList(timelineData.length, { 
    threshold: 0.3, 
    rootMargin: '0px 0px -10% 0px' 
  });

  return (
    <Layout>
      <div className="fixed inset-0 z-0">
        <Grid 
          direction="diagonal" 
          speed={1.5} 
          borderColor="rgba(81, 53, 101, 0.15)" 
          squareSize={60}
          hoverFillColor="rgba(81, 53, 101, 0.08)"
        />
      </div>
      
      <section className="relative z-10 min-h-screen pt-32 pb-24 px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 animate-fade-in">
            <h1 className="mb-8">Designed for clarity. Engineered for performance.</h1>
            
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                Mindstream Solutions exists to bring structure to complexity. We design automated systems that think with you — not against you. Every workflow is rebuilt with precision, clarity, and measurable impact.
              </p>
              <p>
                Our philosophy is simple: remove friction, remove noise, and build processes that let smart people move faster. Tools should enhance your thinking, not distract from it.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="mb-12 text-center">Our Journey</h2>
            
            {/* Timeline container with spine */}
            <div className="relative">
              {/* Vertical spine line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/30" />
              
              <div className="space-y-8">
                {timelineData.map((item, index) => (
                  <div
                    key={index}
                    ref={setRef(index)}
                    data-index={index}
                    className={`relative pl-16 transition-all duration-700 ease-out ${
                      inView[index] 
                        ? 'opacity-100 translate-y-0 blur-0' 
                        : 'opacity-0 translate-y-8 blur-[2px]'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* Milestone dot */}
                    <div className="absolute left-4 top-8 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    
                    {/* Timeline Card with hover effects */}
                    <Card 
                      className="border-primary/20 bg-background/95 backdrop-blur-sm pointer-events-auto
                        transition-all duration-300 ease-out
                        hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(81,53,101,0.3)] hover:border-primary/50"
                      style={{ transformOrigin: 'left center' }}
                    >
                      <CardContent className="p-8">
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-foreground/70">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <Card className="border-secondary/20 bg-background/95 backdrop-blur-sm pointer-events-auto">
              <CardContent className="p-12">
                <h3 className="text-2xl mb-4">Our Approach</h3>
                <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                  Every project begins with deep analysis. We map your operations, identify friction points, and design systems that eliminate waste. The result is clarity at scale — workflows that make sense, teams that move faster, and businesses that operate with confidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
