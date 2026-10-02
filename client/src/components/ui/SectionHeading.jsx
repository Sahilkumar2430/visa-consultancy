import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers.js';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  light = false,
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'inline-block text-xs font-bold tracking-[0.15em] uppercase mb-4',
            light ? 'text-royal-300' : 'text-royal-600'
          )}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className={cn(
          'font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance leading-[1.15]',
          light ? 'text-white' : 'text-navy-900'
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn(
            'mt-5 text-base sm:text-lg leading-relaxed',
            light ? 'text-navy-100/80' : 'text-navy-500'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}