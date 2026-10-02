import { Link } from 'react-router-dom';

export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="Home">
      <div className="relative w-9 h-9 shrink-0">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-royal-500 to-teal-500 opacity-100 group-hover:opacity-90 transition-opacity" />
        <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full">
          <path d="M18 6 L25 24 L18 20.5 L11 24 Z" fill="white" />
          <circle cx="18" cy="28.5" r="2" fill="white" opacity="0.85" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold text-[1.05rem] tracking-tight ${
            light ? 'text-white' : 'text-navy-900'
          }`}
        >
          Global<span className="text-royal-500">Path</span>
        </span>
        <span
          className={`text-[0.6rem] font-semibold tracking-[0.18em] uppercase mt-0.5 ${
            light ? 'text-navy-200' : 'text-navy-400'
          }`}
        >
          Visa Consultancy
        </span>
      </div>
    </Link>
  );
}