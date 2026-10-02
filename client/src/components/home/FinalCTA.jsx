import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../ui/Button.jsx';

export default function FinalCTA() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.25),transparent_55%)]" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-royal-500/10 blur-3xl" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight text-balance">
              Not Sure Which Visa Is Right For You?
            </h2>
            <p className="mt-5 text-navy-100/80 text-base sm:text-lg leading-relaxed">
              Talk to our consultants and get guidance based on your goals and profile.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button to="/contact" variant="white" size="lg" iconRight={ArrowRight}>
                Book Your Free Consultation
              </Button>
              <Button
                href="tel:+10000000000"
                variant="secondary"
                size="lg"
                icon={Phone}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Call Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}