import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold tracking-tight text-foreground">
              Mindstream Solutions
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`text-sm transition-colors ${
                  isActive('/') ? 'text-foreground font-medium' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm transition-colors ${
                  isActive('/about') ? 'text-foreground font-medium' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`text-sm transition-colors ${
                  isActive('/services') ? 'text-foreground font-medium' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Services
              </Link>
              <Button size="sm" asChild>
                <Link to="/#contact">Get Started</Link>
              </Button>
            </div>

            <div className="md:hidden">
              <Button variant="outline" size="sm" asChild>
                <Link to="/#contact">Contact</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="relative z-10 border-t border-primary/10 bg-background mt-32">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mindstream Solutions</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Building intelligent systems that remove friction and sharpen operations.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <Button size="sm" asChild>
                <Link to="/#contact">Start a Conversation</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-primary/10">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Mindstream Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
