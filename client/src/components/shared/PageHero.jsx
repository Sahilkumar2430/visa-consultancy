import { motion } from 'framer-motion';
import Breadcrumbs from '../ui/Breadcrumbs.jsx';

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  image,
  children,
  align = 'left',
}) {
  return (
    <section className="relative bg-navy-950 overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/90 to-navy-900/70" />
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_55%)]" />

      <div className="relative container-page py-14 lg:py-20">
        {breadcrumbs.length > 0 && (
          <div className="mb-6 text-navy-200">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-royal-300 mb-4"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] text-balance"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-navy-100/85 text-base sm:text-lg leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}