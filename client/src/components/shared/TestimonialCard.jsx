import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex flex-col h-full p-7 rounded-3xl bg-white border border-navy-100 shadow-soft hover:shadow-card transition-shadow duration-300"
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-royal-100" />
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < (testimonial.rating || 5)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-navy-100 text-navy-100'
            }`}
          />
        ))}
      </div>
      <p className="text-navy-600 leading-relaxed text-sm flex-1 mb-6">
        “{testimonial.content}”
      </p>
      <div className="flex items-center gap-3 pt-5 border-t border-navy-100">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-cream-100"
        />
        <div className="min-w-0">
          <p className="font-semibold text-navy-900 text-sm truncate">{testimonial.name}</p>
          <p className="text-xs text-navy-400 truncate">
            {testimonial.visaType} · {testimonial.country}
          </p>
        </div>
      </div>
      {testimonial.isSample && (
        <span className="absolute top-4 left-4 text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
          Sample
        </span>
      )}
    </motion.div>
  );
}