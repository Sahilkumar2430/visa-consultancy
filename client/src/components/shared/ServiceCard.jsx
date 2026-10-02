import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function ServiceCard({ service, index = 0 }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group block h-full p-7 rounded-3xl bg-white border border-navy-100 hover:border-royal-200 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-50 to-teal-50 flex items-center justify-center mb-5 group-hover:from-royal-500 group-hover:to-teal-500 transition-all duration-300">
          <Icon className="w-6 h-6 text-royal-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="font-display text-lg font-bold text-navy-900 mb-2.5 group-hover:text-royal-700 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-navy-500 leading-relaxed mb-5">{service.shortDescription}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );
}