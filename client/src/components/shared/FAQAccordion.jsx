import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/helpers.js';

export default function FAQAccordion({ items = [], defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item._id || i}
            className={cn(
              'rounded-2xl border transition-all duration-200 overflow-hidden',
              isOpen
                ? 'border-royal-200 bg-white shadow-card'
                : 'border-navy-100 bg-white hover:border-navy-200'
            )}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  'font-semibold text-[0.95rem] sm:text-base pr-2',
                  isOpen ? 'text-royal-700' : 'text-navy-900'
                )}
              >
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 shrink-0 transition-transform duration-300',
                  isOpen ? 'rotate-180 text-royal-600' : 'text-navy-400'
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 -mt-1 text-sm text-navy-500 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}