import { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@/components/Grid';
import { Layout } from '@/components/Layout';
import SpotlightCard from '@/components/SpotlightCard';
import ServiceDetailModal from '@/components/ServiceDetailModal';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  bullets: string[];
  expanded: {
    title: string;
    whoFor: string;
    whatWeDo: string;
    useCases: string[];
    howItWorks: string[];
    outcome: string;
  };
}

const servicesData: ServiceCard[] = [
  {
    id: 1,
    title: 'Operational Automation',
    description: 'Remove repetitive manual work and make everyday processes run reliably.',
    bullets: [
      'Replace manual admin with automated workflows',
      'Reduce errors, delays, and handoffs',
      'Systems that run in the background without babysitting',
    ],
    expanded: {
      title: 'Operational Automation',
      whoFor: 'Teams spending too much time on repetitive tasks, internal admin, or manual coordination.',
      whatWeDo: 'We design and build automation that replaces day-to-day operational work with reliable systems. This includes internal processes, notifications, approvals, syncs, and background jobs that run consistently without human intervention.',
      useCases: [
        'Internal task and approval workflows',
        'Notifications, reminders, and status updates',
        'Data syncing between tools',
        'Scheduled checks, updates, and housekeeping tasks',
      ],
      howItWorks: [
        'Map the current manual process',
        'Identify failure points and inefficiencies',
        'Design a clean automation flow',
        'Build, test, and deploy',
        'Monitor and refine',
      ],
      outcome: 'Less admin. Fewer mistakes. Operations that don\'t rely on memory or manual effort.',
    },
  },
  {
    id: 2,
    title: 'Data Flow and Processing',
    description: 'Clean, structured, and reliable data across your systems.',
    bullets: [
      'Ingest, clean, and normalise data',
      'Deduplication and enrichment',
      'Reliable data movement between tools',
    ],
    expanded: {
      title: 'Data Flow and Processing',
      whoFor: 'Teams dealing with messy, duplicated, or inconsistent data across multiple platforms.',
      whatWeDo: 'We build data pipelines that collect, clean, enrich, and move data between systems in a predictable and controlled way. This ensures your data is usable, trustworthy, and aligned across tools.',
      useCases: [
        'Importing data from multiple sources',
        'Deduplicating and cleaning records',
        'Enriching data with external sources',
        'Scheduled or event-based data syncs',
      ],
      howItWorks: [
        'Define data sources and destinations',
        'Design a consistent data structure',
        'Build transformation and validation logic',
        'Implement error handling and logging',
        'Deploy and monitor data health',
      ],
      outcome: 'Accurate data you can actually rely on, without manual cleanup.',
    },
  },
  {
    id: 3,
    title: 'Systems Integration and Architecture',
    description: 'Designing how your tools work together before anything is built.',
    bullets: [
      'API-based integrations',
      'Event-driven system design',
      'Scalable, documented architecture',
    ],
    expanded: {
      title: 'Systems Integration and Architecture',
      whoFor: 'Teams using multiple tools that don\'t communicate cleanly, or systems that have grown without a clear structure.',
      whatWeDo: 'We design and implement the architecture that connects your tools into a coherent system. This includes how data moves, how events trigger actions, and how failures are handled.',
      useCases: [
        'Tool-to-tool integrations',
        'Event-triggered workflows',
        'Permission and access control design',
        'System documentation and handover',
      ],
      howItWorks: [
        'Review existing tools and workflows',
        'Design a scalable integration architecture',
        'Define triggers, flows, and fallbacks',
        'Build and test integrations',
        'Document and hand over the system',
      ],
      outcome: 'A system that\'s designed, not duct-taped.',
    },
  },
  {
    id: 4,
    title: 'AI-Enabled Workflows',
    description: 'Practical AI built into real systems. Not bolted on.',
    bullets: [
      'AI used where it saves time',
      'Human-in-the-loop by design',
      'Guardrails and control built in',
    ],
    expanded: {
      title: 'AI-Enabled Workflows',
      whoFor: 'Teams wanting to use AI safely and usefully inside existing workflows.',
      whatWeDo: 'We integrate AI into operational systems where it genuinely reduces workload. This includes classification, summarisation, drafting, and decision support, always with oversight and control.',
      useCases: [
        'Email or ticket classification',
        'Content and report drafting',
        'Summarising meetings or documents',
        'Internal knowledge workflows',
      ],
      howItWorks: [
        'Identify high-impact AI opportunities',
        'Define boundaries and human oversight',
        'Integrate AI into workflows',
        'Add logging, versioning, and rollback',
        'Test and refine usage',
      ],
      outcome: 'AI that supports your team instead of creating risk or noise.',
    },
  },
  {
    id: 5,
    title: 'Revenue and Pipeline Systems',
    description: 'Reliable lead handling, follow-ups, and visibility.',
    bullets: [
      'Lead capture and routing',
      'CRM lifecycle automation',
      'Outreach and follow-up systems',
    ],
    expanded: {
      title: 'Revenue and Pipeline Systems',
      whoFor: 'Businesses losing leads, missing follow-ups, or lacking visibility into their pipeline.',
      whatWeDo: 'We build systems that manage leads and opportunities from first contact through to close, ensuring nothing falls through the cracks.',
      useCases: [
        'Lead capture and qualification',
        'CRM automation and hygiene',
        'Outreach and follow-up sequences',
        'Pipeline reporting and visibility',
      ],
      howItWorks: [
        'Map your revenue lifecycle',
        'Define rules for routing and follow-ups',
        'Build automation around the CRM',
        'Add reporting and alerts',
        'Monitor and improve over time',
      ],
      outcome: 'Consistent follow-up, clearer pipelines, and fewer missed opportunities.',
    },
  },
  {
    id: 6,
    title: 'Ongoing Optimisation and Support',
    description: 'Keeping systems healthy as your business evolves.',
    bullets: [
      'Monitoring and maintenance',
      'Incremental improvements',
      'Long-term system support',
    ],
    expanded: {
      title: 'Ongoing Optimisation and Support',
      whoFor: 'Teams who want systems that improve over time, not break quietly.',
      whatWeDo: 'We provide ongoing support, monitoring, and optimisation for the systems we build. This ensures reliability, performance, and adaptability as your business changes.',
      useCases: [
        'System monitoring and alerts',
        'Workflow improvements',
        'New automation requests',
        'Performance and cost optimisation',
      ],
      howItWorks: [
        'Continuous monitoring',
        'Regular reviews and improvements',
        'Rapid response to issues',
        'Strategic system evolution',
      ],
      outcome: 'Systems that stay reliable and relevant long after launch.',
    },
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);

  const handleCardClick = (service: ServiceCard) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
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

      <section className="relative min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero / Intro Section */}
          <div className="mb-20 text-center animate-fade-in">
            <h1 className="mb-6">Services</h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-4">
              Systems-first automation, data flow, and AI-enabled workflows that remove manual work and improve operational reliability.
            </p>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Designed for teams that want clean architecture, predictable execution, and measurable outcomes.
            </p>
          </div>

          {/* Services Grid - 2x3 on desktop, responsive on smaller screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {servicesData.map((service) => (
              <SpotlightCard
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="flex flex-col h-full min-h-[280px]"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl mb-4">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {service.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground/70 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-primary/80 font-medium mt-auto pt-4 border-t border-primary/10">
                    Click to view details
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* How We Work Section */}
          <div className="mt-16 lg:mt-24">
            {/* Main container */}
            <div className="rounded-3xl border border-primary/20 bg-background/95 backdrop-blur-sm p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl mb-6">How We Work</h2>
              <p className="text-foreground/70 text-lg max-w-3xl mx-auto mb-8">
                Every engagement starts with understanding your systems, not selling you a tool. We take a structured, systems-first approach to ensure everything we build integrates cleanly and delivers lasting impact.
              </p>
              <Link
                to="/#contact"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Discuss your project
              </Link>
            </div>

            {/* Three phase cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="rounded-3xl border border-primary/20 bg-background/95 backdrop-blur-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Discovery</h3>
                <p className="text-foreground/70">Deep analysis of your operations and pain points</p>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-background/95 backdrop-blur-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Design</h3>
                <p className="text-foreground/70">Strategic architecture built for clarity and scale</p>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-background/95 backdrop-blur-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Deployment</h3>
                <p className="text-foreground/70">Seamless integration with ongoing support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <ServiceDetailModal
        isOpen={selectedService !== null}
        onClose={handleCloseModal}
        service={selectedService?.expanded || null}
      />
    </Layout>
  );
};

export default Services;
