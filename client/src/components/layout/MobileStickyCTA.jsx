import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="bg-white/95 backdrop-blur-xl border-t border-navy-100 p-3 shadow-[0_-4px_20px_-4px_rgba(15,30,56,0.1)]">
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-royal-600 to-royal-500 text-white font-semibold text-sm shadow-glow active:scale-[0.98] transition-transform"
        >
          <CalendarCheck className="w-4 h-4" />
          Book Free Consultation
        </Link>
      </div>
    </div>
  );
}