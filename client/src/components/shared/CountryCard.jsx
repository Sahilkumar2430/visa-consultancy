import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavouriteButton from './FavouriteButton.jsx';

export default function CountryCard({ country, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        to={`/countries/${country.slug}`}
        className="group block h-full rounded-3xl overflow-hidden bg-white border border-navy-100 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
          <img
            src={country.heroImage}
            alt={country.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-soft">
            <span className="text-lg leading-none" aria-hidden="true">
              {country.flag}
            </span>
            <span className="text-xs font-bold text-navy-900">{country.name}</span>
          </div>

          <FavouriteButton
            slug={country.slug}
            className="absolute top-4 right-4"
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-bold text-navy-900 mb-3">
            {country.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {country.visaTypes?.slice(0, 3).map((vt) => (
              <span
                key={vt}
                className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full bg-royal-50 text-royal-700"
              >
                {vt}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
            Explore {country.name}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}