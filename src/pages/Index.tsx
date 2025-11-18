import { GradientBlinds } from '@/components/GradientBlinds';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <GradientBlinds />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Clarity that cuts through noise
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl leading-relaxed">
              Mindstream Solutions builds intelligent systems that remove friction, sharpen operations, and give your business space to think.
            </p>
            <Button size="lg" className="text-base" asChild>
              <a href="#contact">Build with precision</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Systems that do the heavy lifting</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Designed to remove complexity and deliver measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-background/95 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <div className="w-6 h-6 bg-primary rounded"></div>
                </div>
                <h3 className="text-2xl mb-4">Automation Architecture</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We design, streamline, and automate your operational workflows with clarity and precision. The result: fewer manual steps, fewer errors, and a system that scales without slowing down.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-background/95 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <div className="w-6 h-6 bg-secondary rounded"></div>
                </div>
                <h3 className="text-2xl mb-4">AI-Driven Processes</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Strategic use of AI to enhance decision-making, accelerate tasks, and provide insight where it matters. Always grounded. Always practical.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-background/95 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6">
                  <div className="w-6 h-6 bg-accent rounded"></div>
                </div>
                <h3 className="text-2xl mb-4">Data Simplification & Clarity</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Your data shouldn't slow you down. We organise, structure, and visualise it so you always know what's happening — and what to do next.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8 text-center">Built for clarity. Driven by precision.</h2>
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              Mindstream Solutions was created to bring structure to chaos. We design systems that replace clutter with clarity — systems that think, adapt, and elevate the way businesses operate. No noise. No nonsense. Just intelligent foundations that move work forward.
            </p>
            <p className="text-center font-medium text-foreground">
              Every workflow tells a story. We make sure yours is sharp.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 text-center">What clients say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-background">
              <CardContent className="p-8">
                <p className="text-lg text-foreground/80 mb-6 italic leading-relaxed">
                  "Mindstream didn't just fix our workflow. They rebuilt it into something that finally makes sense."
                </p>
                <p className="text-sm font-medium">A.D.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background">
              <CardContent className="p-8">
                <p className="text-lg text-foreground/80 mb-6 italic leading-relaxed">
                  "Elegant systems. Clear thinking. Zero friction. Working with them changed how we operate day to day."
                </p>
                <p className="text-sm font-medium">S.M.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background">
              <CardContent className="p-8">
                <p className="text-lg text-foreground/80 mb-6 italic leading-relaxed">
                  "Fast, structured, and grounded in the realities of a growing business. Exactly what we needed."
                </p>
                <p className="text-sm font-medium">R.K.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Ready to streamline your operations?</h2>
            <p className="text-lg text-foreground/70">
              Let's build systems that help your business move with clarity.
            </p>
          </div>

          <Card className="border-primary/20 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-2"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Start the conversation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
