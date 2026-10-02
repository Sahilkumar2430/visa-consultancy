import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'gp_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage unavailable — don't show banner
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[70]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-white rounded-2xl shadow-card-hover border border-navy-100 p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-royal-50 flex items-center justify-center shrink-0">
                <Cookie className="w-4 h-4 text-royal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-900 text-sm">
                  We use cookies
                </p>
                <p className="text-xs text-navy-500 leading-relaxed mt-1">
                  We use cookies to improve your experience. See our{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-royal-600 underline hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={accept}
                    className="px-4 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setVisible(false)}
                    className="px-4 py-1.5 rounded-lg text-navy-500 text-xs font-semibold hover:bg-navy-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="p-1 rounded-lg text-navy-400 hover:bg-navy-50 transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}