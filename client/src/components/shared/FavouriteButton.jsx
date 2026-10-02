import { Heart } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext.jsx';
import { cn } from '../../utils/helpers.js';

export default function FavouriteButton({ slug, className }) {
  const { profile, toggleFavourite } = useProfile();
  const active = profile.favouriteCountries?.includes(slug);

  const handle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(slug);
  };

  return (
    <button
      onClick={handle}
      aria-label={active ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={active}
      className={cn(
        'w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90',
        active
          ? 'bg-red-500 text-white shadow-card'
          : 'bg-white/85 text-navy-500 hover:bg-white hover:text-red-500 shadow-soft',
        className
      )}
    >
      <Heart
        className={cn('w-4 h-4', active && 'fill-current')}
        strokeWidth={2.2}
      />
    </button>
  );
}