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
  { title: 'Foundation', description: 'Started with one goal: make operations simpler and more reliable.' },
  { title: 'Delivery', description: 'Built automation systems for teams moving fast, without breaking processes.' },
  { title: 'Applied AI', description: 'Applied AI where it made sense: speed, accuracy, and decision support.' },
  { title: 'Refinement', description: 'Refining systems over time so they stay useful as the business changes.' },
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
            <h1 className="mb-8">Built for operational clarity. Engineered for performance.</h1>
            
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                Mindstream Solutions exists to bring structure to complex operations. We design automated systems that support how your team actually works. Every workflow is rebuilt to reduce friction, improve reliability, and deliver measurable impact.
              </p>
              <p>
                Our philosophy is simple: remove friction, remove noise, and build processes that let smart people move faster. Tools should reduce busywork, not create more of it.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="mb-12 text-center">Our Journey</h2>
            
            {/* Timeline container with centered spine */}
            <div className="relative">
              {/* Centered vertical spine line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/30" />
              
              <div className="space-y-12">
                {timelineData.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      ref={setRef(index)}
                      data-index={index}
                      className={`relative flex items-center transition-all duration-700 ease-out ${
                        inView[index] 
                          ? 'opacity-100 translate-x-0 blur-0' 
                          : `opacity-0 ${isLeft ? '-translate-x-8' : 'translate-x-8'} blur-[2px]`
                      }`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      {/* Left side content */}
                      <div className={`w-5/12 ${isLeft ? 'pr-8' : ''}`}>
                        {isLeft && (
                          <Card 
                            className="border-primary/20 bg-background/95 backdrop-blur-sm pointer-events-auto
                              transition-all duration-300 ease-out
                              hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(81,53,101,0.3)] hover:border-primary/50"
                            style={{ transformOrigin: 'right center' }}
                          >
                            <CardContent className="p-8">
                              <h3 className="text-xl mb-2 text-right">{item.title}</h3>
                              <p className="text-foreground/70 text-right">{item.description}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                      
                      {/* Center milestone dot */}
                      <div className="w-2/12 flex justify-center">
                        <div className="w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                      </div>
                      
                      {/* Right side content */}
                      <div className={`w-5/12 ${!isLeft ? 'pl-8' : ''}`}>
                        {!isLeft && (
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
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <Card className="border-secondary/20 bg-background/95 backdrop-blur-sm pointer-events-auto">
              <CardContent className="p-12">
                <h3 className="text-2xl mb-4">Our Approach</h3>
                <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                  Every project starts with understanding how work actually moves through your business. We map the workflow, find the friction, and redesign the system so it runs cleanly. The result: workflows that make sense, teams that move faster, and operations you can trust.
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
