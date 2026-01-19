import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceDetail {
  title: string;
  whoFor: string;
  whatWeDo: string;
  useCases: string[];
  howItWorks: string[];
  outcome: string;
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-primary/20 bg-background/98 backdrop-blur-md shadow-2xl animate-fade-in">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 hover:bg-primary/10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Content */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl md:text-4xl mb-8 pr-10">{service.title}</h2>

          <div className="space-y-8">
            {/* Who this is for */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Who this is for</h3>
              <p className="text-foreground/80">{service.whoFor}</p>
            </div>

            {/* What we do */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">What we do</h3>
              <p className="text-foreground/80">{service.whatWeDo}</p>
            </div>

            {/* Typical use cases */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Typical use cases</h3>
              <ul className="space-y-2">
                {service.useCases.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">How it works</h3>
              <ol className="space-y-2">
                {service.howItWorks.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/80">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Outcome */}
            <div className="pt-4 border-t border-primary/10">
              <h3 className="text-lg font-semibold text-primary mb-2">Outcome</h3>
              <p className="text-foreground/90 font-medium">{service.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
