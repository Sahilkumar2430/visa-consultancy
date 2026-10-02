import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';
import Button from '../ui/Button.jsx';
import { NAV_LINKS, NAV_MORE_LINKS } from '../../utils/constants.js';
import { cn } from '../../utils/helpers.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const moreRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) {
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }
  }, [moreOpen]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden lg:block bg-navy-950 text-white">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <p className="text-navy-200">
            Trusted guidance for study, work &amp; immigration — worldwide.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/portal"
              className="text-navy-300 hover:text-white transition-colors font-medium"
            >
              ← Switch Portal
            </Link>
            <span className="text-navy-600">|</span>
            <a
              href="tel:+10000000000"
              className="flex items-center gap-1.5 text-navy-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              +1 (000) 000-0000
            </a>
            <span className="text-navy-600">|</span>
            <a
              href="mailto:hello@globalpath.demo"
              className="text-navy-200 hover:text-white transition-colors"
            >
              hello@globalpath.demo
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-navy-100'
            : 'bg-white/70 backdrop-blur-md border-b border-transparent'
        )}
      >
        <nav className="container-page flex items-center justify-between h-16 lg:h-[4.5rem] gap-3">
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-7 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => cn('nav-link', isActive && 'active')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* More dropdown */}
            <li className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={cn(
                  'flex items-center gap-1 nav-link',
                  moreOpen && 'active'
                )}
                aria-expanded={moreOpen}
              >
                More
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200',
                    moreOpen && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-white border border-navy-100 shadow-card-hover py-2 z-50"
                  >
                    {NAV_MORE_LINKS.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            'block px-4 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-royal-50 text-royal-700'
                              : 'text-navy-700 hover:bg-navy-50'
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button to="/contact" variant="accent" size="sm">
              Book Free Consultation
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 bg-navy-950/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-50 lg:hidden bg-white border-b border-navy-100 shadow-card max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <ul className="container-page py-4 space-y-1">
                {[...NAV_LINKS, ...NAV_MORE_LINKS].map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        cn(
                          'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                          isActive
                            ? 'bg-royal-50 text-royal-700'
                            : 'text-navy-700 hover:bg-navy-50'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
                <li className="pt-3 pb-2 px-1">
                  <Button to="/contact" variant="accent" className="w-full" size="lg">
                    Book Free Consultation
                  </Button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}