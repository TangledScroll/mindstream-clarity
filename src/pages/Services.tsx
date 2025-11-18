import { GradientBlinds } from '@/components/GradientBlinds';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Automation Architecture',
      description: 'We map, rebuild, and automate your operational systems from the ground up. Every workflow is analysed, optimised, and reconstructed using intelligent, scalable logic. The outcome is simple: consistency without chaos.',
      color: 'primary',
    },
    {
      title: 'AI-Driven Processes',
      description: 'From decision support to intelligent routing, we implement AI where it genuinely strengthens your operations. No gimmicks. No over-complication. Just practical intelligence applied with precision.',
      color: 'secondary',
    },
    {
      title: 'Data Simplification & Clarity',
      description: 'Your data should work for you — not drown you. We organise, structure, and visualise information so your team makes faster, sharper decisions with absolute confidence.',
      color: 'accent',
    },
  ];

  return (
    <Layout>
      <GradientBlinds />
      
      <section className="relative min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center animate-fade-in">
            <h1 className="mb-6">Services</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Strategic systems designed to remove friction and deliver measurable results.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <Card 
                key={index}
                className={`border-${service.color}/20 bg-background/95 backdrop-blur-sm hover:shadow-xl transition-all`}
              >
                <CardContent className="p-12">
                  <div className="flex items-start gap-8">
                    <div className={`w-16 h-16 rounded-lg bg-${service.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <div className={`w-8 h-8 bg-${service.color} rounded`}></div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl mb-6">{service.title}</h2>
                      <p className="text-lg text-foreground/70 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Card className="border-primary/20 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-12">
                <h3 className="text-2xl mb-4">How We Work</h3>
                <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
                  Every engagement begins with understanding. We analyse your current systems, identify opportunities, and build solutions that integrate seamlessly with your operations. Our approach is methodical, transparent, and focused on long-term impact.
                </p>
                <Button size="lg" asChild>
                  <Link to="/#contact">Discuss Your Project</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="border-primary/10 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl mb-3 font-semibold">Discovery</h4>
                <p className="text-foreground/70">
                  Deep analysis of your operations and pain points
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl mb-3 font-semibold">Design</h4>
                <p className="text-foreground/70">
                  Strategic architecture built for clarity and scale
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl mb-3 font-semibold">Deployment</h4>
                <p className="text-foreground/70">
                  Seamless integration with ongoing support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
