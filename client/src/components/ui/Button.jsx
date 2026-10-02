import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers.js';

const variants = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-800 shadow-soft hover:shadow-card active:scale-[0.98]',
  accent:
    'bg-gradient-to-r from-royal-600 to-royal-500 text-white hover:from-royal-700 hover:to-royal-600 shadow-soft hover:shadow-glow active:scale-[0.98]',
  secondary:
    'bg-white text-navy-900 border border-navy-200 hover:border-navy-300 hover:bg-navy-50 active:scale-[0.98]',
  ghost: 'text-navy-700 hover:bg-navy-50 active:scale-[0.98]',
  outline:
    'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white active:scale-[0.98]',
  white:
    'bg-white text-navy-900 hover:bg-cream-100 shadow-soft hover:shadow-card active:scale-[0.98]',
  teal: 'bg-teal-500 text-white hover:bg-teal-600 shadow-soft active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
  xl: 'px-8 py-4 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  icon: Icon,
  iconRight: IconRight,
  loading,
  disabled,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap',
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      <span>{children}</span>
      {IconRight && <IconRight className="w-4 h-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}