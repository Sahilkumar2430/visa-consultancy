import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialCarousel({ items = [], autoPlayMs = 6000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), autoPlayMs);
    return () => clearInterval(t);
  }, [paused, items.length, autoPlayMs]);

  if (!items.length) return null;

  const go = (dir) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  const t = items[index];

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rounded-3xl bg-white border border-navy-100 shadow-card p-8 sm:p-10 relative overflow-hidden min-h-[280px]">
        <Quote className="absolute top-6 right-8 w-16 h-16 text-royal-100" />

        <AnimatePresence mode="wait">
          <motion.div
            key={t._id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="relative"
          >
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (t.rating || 5)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-navy-100 text-navy-100'
                  }`}
                />
              ))}
            </div>

            <p className="text-lg text-navy-700 leading-relaxed mb-8">
              “{t.content}”
            </p>

            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-cream-100"
              />
              <div>
                <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                <p className="text-xs text-navy-400">
                  {t.visaType} · {t.country}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 w-10 h-10 rounded-full bg-white border border-navy-100 shadow-soft flex items-center justify-center text-navy-600 hover:bg-navy-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 w-10 h-10 rounded-full bg-white border border-navy-100 shadow-soft flex items-center justify-center text-navy-600 hover:bg-navy-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? 'w-8 bg-royal-500'
                    : 'w-1.5 bg-navy-200 hover:bg-navy-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}