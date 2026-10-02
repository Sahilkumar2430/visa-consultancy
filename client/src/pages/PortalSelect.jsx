import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Users, ArrowRight, Briefcase, Sparkles } from 'lucide-react';

export default function PortalSelect() {
  return (
    <>
      <Helmet>
        <title>Choose Portal — GlobalPath</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.15),transparent_55%)]" />

        <div className="relative container-page py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-royal-500 to-teal-500 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-6 h-6">
                  <path d="M18 6 L25 24 L18 20.5 L11 24 Z" fill="white" />
                  <circle cx="18" cy="28.5" r="2" fill="white" opacity="0.85" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-display font-extrabold text-white text-lg tracking-tight leading-none">
                  Global<span className="text-royal-400">Path</span>
                </p>
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-navy-300 mt-0.5">
                  Visa Consultancy
                </p>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Welcome 👋
            </h1>
            <p className="mt-4 text-navy-200 text-base sm:text-lg">
              Choose where you'd like to go.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
            {/* CLIENT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <Link
                to="/home"
                className="group block h-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>

                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Client Website
                </h2>
                <p className="text-sm text-navy-200 leading-relaxed mb-6">
                  Explore countries, compare destinations, check eligibility and book a
                  free consultation.
                </p>

                <ul className="space-y-2.5 mb-8">
                  {[
                    'Browse 250+ countries',
                    'Visa match & eligibility check',
                    'Application tracker demo',
                    'Book a consultation',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-navy-100"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                  Enter Client Site
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>

            {/* ADMIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link
                to="/admin/login"
                className="group block h-full rounded-3xl bg-gradient-to-br from-royal-600/20 to-teal-600/10 backdrop-blur-xl border border-royal-400/30 p-8 lg:p-10 hover:border-royal-400/60 hover:from-royal-600/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>

                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Admin Dashboard
                </h2>
                <p className="text-sm text-navy-200 leading-relaxed mb-6">
                  Manage leads, edit content, publish testimonials and monitor enquiries.
                </p>

                <ul className="space-y-2.5 mb-8">
                  {[
                    'Lead management & notes',
                    'Content CRUD',
                    'Charts & analytics',
                    'Secure JWT login',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-navy-100"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-royal-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                  Open Admin
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-navy-400">
              Demo credentials — Email:{' '}
              <span className="text-navy-200 font-mono">admin@globalpath.demo</span> ·
              Password: <span className="text-navy-200 font-mono">AdminPass123!</span>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}