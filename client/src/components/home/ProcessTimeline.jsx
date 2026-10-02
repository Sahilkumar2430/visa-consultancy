import { motion } from 'framer-motion';
import { MessageSquare, ClipboardCheck, Globe2, FileText, Send, BadgeCheck } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const steps = [
  { n: '01', title: 'Free Consultation', desc: 'Share your goals and profile with our team.', icon: MessageSquare },
  { n: '02', title: 'Profile Assessment', desc: 'We review your eligibility and options.', icon: ClipboardCheck },
  { n: '03', title: 'Country & Visa Selection', desc: 'Choose the destination that fits you best.', icon: Globe2 },
  { n: '04', title: 'Documentation', desc: 'Prepare and organise required documents.', icon: FileText },
  { n: '05', title: 'Application Submission', desc: 'Submit your application correctly and on time.', icon: Send },
  { n: '06', title: 'Visa Decision', desc: 'Await the decision from the relevant authority.', icon: BadgeCheck },
];

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Process"
          title="Your Journey With Us"
          description="A clear, step-by-step process designed to keep you informed."
        />

        {/* Desktop timeline */}
        <div className="hidden lg:block mt-16">
          <div className="relative">
            <div className="absolute top-[2.1rem] left-0 right-0 h-0.5 bg-navy-100" />
            <div className="grid grid-cols-6 gap-4 relative">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 w-[4.2rem] h-[4.2rem] rounded-2xl bg-white border-2 border-royal-200 flex items-center justify-center shadow-soft mb-5">
                      <Icon className="w-6 h-6 text-royal-600" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-royal-600 text-white text-[0.65rem] font-bold flex items-center justify-center">
                        {s.n}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-navy-900 text-sm mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-xs text-navy-400 leading-relaxed">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="lg:hidden mt-12 space-y-1">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-white border-2 border-royal-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-royal-600" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-royal-600 text-white text-[0.6rem] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                  </div>
                  {!isLast && <div className="w-0.5 flex-1 bg-navy-100 my-1" />}
                </div>
                <div className="pb-7 pt-1.5">
                  <h3 className="font-display font-bold text-navy-900 text-base mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-navy-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}