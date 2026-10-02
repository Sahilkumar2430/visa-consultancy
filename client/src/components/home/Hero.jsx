import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import Button from '../ui/Button.jsx';
import QuickLeadForm from '../forms/QuickLeadForm.jsx';

const trustPoints = [
  { value: '10+', label: 'Years Experience' },
  { value: '5,000+', label: 'Clients Assisted' },
  { value: '15+', label: 'Countries' },
  { value: '95%', label: 'Support Success*' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-950/85 to-navy-900/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.18),transparent_55%)]" />
      </div>

      <div className="relative container-page pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-7"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold text-white/90 tracking-wide">
                Trusted Visa & Immigration Guidance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white leading-[1.08] tracking-tight text-balance"
            >
              Your Journey Abroad{' '}
              <span className="gradient-text">Starts Here.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-base sm:text-lg text-navy-100/85 leading-relaxed max-w-xl"
            >
              Expert guidance for study visas, work permits, immigration and international
              education opportunities — tailored to your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
                Book Free Consultation
              </Button>
              <Button to="/countries" variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                Explore Countries
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {trustPoints.map((p) => (
                <div key={p.label}>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    {p.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-navy-200/80 leading-tight">
                    {p.label}
                  </div>
                </div>
              ))}
            </motion.div>
            <p className="mt-3 text-[0.65rem] text-navy-300/60">
              *Based on applications supported to date. Visa approval is decided solely by
              immigration authorities.
            </p>
          </div>

          {/* Right: Quick lead form */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <QuickLeadForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade into cream */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  );
}