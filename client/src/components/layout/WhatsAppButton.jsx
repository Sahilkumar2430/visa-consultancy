import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WHATSAPP_NUMBER = '10000000000'; // replace with real number, no +
const WHATSAPP_MESSAGE = 'Hi! I would like to know more about your visa services.';

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40"
        >
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  className="hidden sm:block bg-white rounded-2xl shadow-card-hover p-4 max-w-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">
                        Need help? Chat with us
                      </p>
                      <p className="text-xs text-navy-400 mt-0.5">
                        Usually replies in a few minutes
                      </p>
                    </div>
                    <button
                      onClick={() => setExpanded(false)}
                      className="p-1 rounded-lg text-navy-400 hover:bg-navy-50 transition-colors"
                      aria-label="Close chat prompt"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 py-2 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BD5A] transition-colors"
                  >
                    Start Chat
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setExpanded(true)}
              onClick={() => setExpanded((v) => !v)}
              className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] flex items-center justify-center shadow-card-hover transition-all hover:scale-105 active:scale-95"
              aria-label="Chat on WhatsApp"
            >
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-white relative z-10"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}