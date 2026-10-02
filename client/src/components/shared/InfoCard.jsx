import { motion } from 'framer-motion';

export default function InfoCard({ icon: Icon, title, children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="p-6 sm:p-7 rounded-2xl bg-white border border-navy-100 hover:border-royal-200 hover:shadow-card transition-all duration-300"
    >
      {Icon && (
        <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-royal-600" />
        </div>
      )}
      <h3 className="font-display font-bold text-navy-900 text-base mb-2">{title}</h3>
      <div className="text-sm text-navy-500 leading-relaxed">{children}</div>
    </motion.div>
  );
}