import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Plane, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';

const pathways = {
  study: {
    id: 'study',
    label: 'Study Abroad',
    icon: GraduationCap,
    description: 'Pursue higher education at top global universities.',
    countries: ['Canada', 'UK', 'Australia', 'USA', 'Germany'],
  },
  work: {
    id: 'work',
    label: 'Work Abroad',
    icon: Briefcase,
    description: 'Explore international employment and work permit options.',
    countries: ['Canada', 'Germany', 'Australia', 'New Zealand', 'UAE'],
  },
  visit: {
    id: 'visit',
    label: 'Visit Abroad',
    icon: Plane,
    description: 'Plan short-term travel, family visits or tourism.',
    countries: ['France', 'UK', 'UAE', 'USA', 'Australia'],
  },
  immigration: {
    id: 'immigration',
    label: 'Immigration / PR',
    icon: Home,
    description: 'Understand long-term settlement and residency pathways.',
    countries: ['Canada', 'Australia', 'New Zealand', 'Germany', 'Ireland'],
  },
};

export default function VisaPathway() {
  const [active, setActive] = useState('study');
  const current = pathways[active];

  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="relative container-page">
        <SectionHeading
          eyebrow="Find Your Path"
          title="What Is Your Goal?"
          description="Select your objective and we’ll point you toward the most suitable destinations."
          light
        />

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {Object.values(pathways).map((p) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border transition-all duration-300 text-center ${
                  isActive
                    ? 'bg-white border-white shadow-card-hover'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                aria-pressed={isActive}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-royal-500 text-white' : 'bg-white/10 text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    isActive ? 'text-navy-900' : 'text-white'
                  }`}
                >
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 max-w-4xl mx-auto rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-7 sm:p-9"
          >
            <p className="text-navy-100/80 text-center mb-6">{current.description}</p>
            <div className="mb-3 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-300">
                Popular destinations
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {current.countries.map((c) => (
                <span
                  key={c}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-medium text-white"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
                Talk to a Consultant
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}