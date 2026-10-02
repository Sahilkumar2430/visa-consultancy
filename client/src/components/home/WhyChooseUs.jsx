import { motion } from 'framer-motion';
import {
  UserCheck,
  Target,
  Eye,
  FileText,
  Globe2,
  Activity,
  Layers,
  Headphones,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const features = [
  {
    icon: UserCheck,
    title: 'Experienced Consultants',
    desc: 'Guidance from advisors with practical knowledge across destinations.',
  },
  {
    icon: Target,
    title: 'Personalised Guidance',
    desc: 'Recommendations tailored to your profile, goals and budget.',
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    desc: 'Clear steps, honest expectations and no hidden surprises.',
  },
  {
    icon: FileText,
    title: 'Document Assistance',
    desc: 'Help organising and preparing your application documents.',
  },
  {
    icon: Globe2,
    title: 'Country-Specific Expertise',
    desc: 'In-depth understanding of requirements for each destination.',
  },
  {
    icon: Activity,
    title: 'Application Tracking',
    desc: 'Stay informed about progress at every stage of your application.',
  },
  {
    icon: Layers,
    title: 'End-to-End Support',
    desc: 'From first enquiry to final decision — we’re with you throughout.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Assistance',
    desc: 'A single point of contact for your questions and updates.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Choose GlobalPath?"
          description="We combine personal attention with structured processes to make your journey smoother."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-navy-100 hover:border-royal-200 hover:shadow-card transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-royal-600" />
                </div>
                <h3 className="font-display font-bold text-navy-900 text-[0.95rem] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}