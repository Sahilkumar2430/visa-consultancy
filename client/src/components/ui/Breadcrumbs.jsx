import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-sm">
      <Link
        to="/"
        className="flex items-center gap-1.5 text-navy-400 hover:text-royal-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-navy-300" />
            {isLast || !item.path ? (
              <span className="text-navy-700 font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="text-navy-400 hover:text-royal-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}