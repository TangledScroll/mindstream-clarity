import Grid from '@/components/Grid';
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
      <div className="fixed inset-0 z-0">
        <Grid 
          direction="diagonal" 
          speed={1.5} 
          borderColor="rgba(81, 53, 101, 0.15)" 
          squareSize={60}
          hoverFillColor="rgba(81, 53, 101, 0.08)"
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Operational clarity, built properly
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl leading-relaxed">
              Mindstream Solutions builds systems that handle the busywork, so your team can focus on what actually matters.
            </p>
            <Button size="lg" className="text-base pointer-events-auto" asChild>
              <a href="#contact">Build with precision</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section - Sophisticated Layered Design */}
      <section className="relative z-10 min-h-screen py-32 pointer-events-none">
        {/* Translucent Center Overlay - rounded top corners, gradient bottom */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-full max-w-6xl rounded-t-3xl bg-gradient-to-b from-black/30 via-black/30 to-black/20 backdrop-blur-sm"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          {/* Section Header */}
          <div className="mb-32 animate-fade-in">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="text-sm font-medium text-primary tracking-[0.2em] uppercase">
                Core Systems
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-6">
              Systems that do<br />the heavy lifting
            </h2>
          </div>

          {/* Service Blocks - Staggered Timeline Layout */}
          <div className="space-y-40">
            {/* Service 1 - Automation Architecture */}
            <div className="grid md:grid-cols-12 gap-8 items-start group animate-fade-in">
              <div className="md:col-span-1 pt-2">
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
              </div>
              <div className="md:col-span-4">
                <div className="text-6xl md:text-7xl font-bold text-primary/10 mb-4">01</div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  Automation<br />Architecture
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-12">
                <div className="border-l-2 border-primary/20 pl-8 group-hover:border-primary/60 transition-colors duration-300">
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                    We design and automate operational workflows so they run consistently, with fewer manual steps and fewer points of failure.
                  </p>
                  <p className="text-base text-foreground/60 leading-relaxed">
                    The result: fewer errors, less manual work, and systems that scale without slowing you down.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2 - AI-Driven Processes */}
            <div className="grid md:grid-cols-12 gap-8 items-start group animate-fade-in md:ml-20">
              <div className="md:col-span-1 pt-2">
                <div className="w-3 h-3 rounded-full bg-secondary ring-4 ring-secondary/20"></div>
              </div>
              <div className="md:col-span-4">
                <div className="text-6xl md:text-7xl font-bold text-secondary/10 mb-4">02</div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground group-hover:text-secondary transition-colors duration-300">
                  AI-Driven<br />Processes
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-12">
                <div className="border-l-2 border-secondary/20 pl-8 group-hover:border-secondary/60 transition-colors duration-300">
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                    We apply AI where it makes practical sense. Speeding up repeatable tasks, supporting decisions, and reducing cognitive load.
                  </p>
                  <p className="text-base text-foreground/60 leading-relaxed">
                    Practical by design. Built to be used.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3 - Data Simplification */}
            <div className="grid md:grid-cols-12 gap-8 items-start group animate-fade-in">
              <div className="md:col-span-1 pt-2">
                <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20"></div>
              </div>
              <div className="md:col-span-4">
                <div className="text-6xl md:text-7xl font-bold text-accent/10 mb-4">03</div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                  Data Simplification<br />& Clarity
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-12">
                <div className="border-l-2 border-accent/20 pl-8 group-hover:border-accent/60 transition-colors duration-300">
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                    Your data shouldn't slow you down. We structure and surface it so you can see what's happening without digging.
                  </p>
                  <p className="text-base text-foreground/60 leading-relaxed">
                    And what to do next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Minimal Statement - seamlessly connected to Services */}
      <section className="relative z-10 py-32 px-6 pointer-events-none -mt-1">
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-full max-w-6xl rounded-b-3xl bg-gradient-to-b from-black/20 to-black/20 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center space-y-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2]">
              Built for clarity.<br />Driven by precision.
            </h2>
            
            <div className="h-px w-24 bg-primary mx-auto"></div>
            
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Mindstream Solutions exists to bring structure to complex operations. We design systems that replace fragmented processes with clear, reliable workflows built for real-world use.
            </p>
            
            <p className="text-lg font-medium text-foreground/90 pt-8">
              Every workflow tells a story. We make sure yours is sharp.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Refined Layout */}
      <section className="relative z-10 py-32 px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 animate-fade-in">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="text-sm font-medium text-primary tracking-[0.2em] uppercase">
                Client Impact
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-light">What clients say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group animate-fade-in">
              <div className="border-l-4 border-primary/30 pl-6 py-4 hover:border-primary transition-colors duration-300">
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed italic">
                  "Mindstream didn't just fix our workflow. They rebuilt it into something that finally works."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">AD</span>
                  </div>
                  <p className="text-sm font-medium text-foreground/60">A.D.</p>
                </div>
              </div>
            </div>

            <div className="group animate-fade-in md:mt-12">
              <div className="border-l-4 border-secondary/30 pl-6 py-4 hover:border-secondary transition-colors duration-300">
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed italic">
                  "Clear thinking, well-built systems, and no unnecessary complexity. Working with them changed how we operate day to day."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-secondary">SM</span>
                  </div>
                  <p className="text-sm font-medium text-foreground/60">S.M.</p>
                </div>
              </div>
            </div>

            <div className="group animate-fade-in md:mt-24">
              <div className="border-l-4 border-accent/40 pl-6 py-4 hover:border-accent transition-colors duration-300">
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed italic">
                  "Fast, structured, and grounded in the realities of a growing business. Exactly what we needed."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent">RK</span>
                  </div>
                  <p className="text-sm font-medium text-foreground/60">R.K.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section - Sophisticated Minimal */}
      <section id="contact" className="relative z-10 py-32 px-6 pointer-events-none">
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-full max-w-6xl rounded-3xl bg-black/25 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="text-sm font-medium text-primary tracking-[0.2em] uppercase">
                Let's Talk
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] mb-6">
              Ready to streamline<br />your operations?
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Let's build systems that remove friction and scale cleanly.
            </p>
          </div>

          <div className="bg-background/40 backdrop-blur-md border border-primary/20 rounded-lg p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/60 border-primary/20 focus:border-primary pointer-events-auto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/60 border-primary/20 focus:border-primary pointer-events-auto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-background/60 border-primary/20 focus:border-primary resize-none pointer-events-auto"
                />
              </div>
              <Button type="submit" className="w-full pointer-events-auto" size="lg">
                Start the conversation
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
