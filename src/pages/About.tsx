import { GradientBlinds } from '@/components/GradientBlinds';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const timeline = [
    {
      title: 'Foundation',
      description: 'Founded with a focus on operational clarity',
    },
    {
      title: 'Growth',
      description: 'Built systems for high-growth teams',
    },
    {
      title: 'Innovation',
      description: 'Expanded into AI-driven workflow intelligence',
    },
    {
      title: 'Evolution',
      description: 'Continually refining the foundation of business automation',
    },
  ];

  return (
    <Layout>
      <GradientBlinds />
      
      <section className="relative min-h-screen pt-32 pb-24 px-6">
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
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <Card 
                  key={index}
                  className="border-primary/20 bg-background/95 backdrop-blur-sm hover:shadow-lg transition-all"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <Card className="border-secondary/20 bg-background/95 backdrop-blur-sm">
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
