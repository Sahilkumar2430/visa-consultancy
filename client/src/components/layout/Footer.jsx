import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';
import Logo from './Logo.jsx';
import { DISCLAIMER_TEXT } from '../../utils/constants.js';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Countries', path: '/countries' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

const visaServices = [
  { label: 'Study Visa', path: '/services/study-visa' },
  { label: 'Work Permit', path: '/services/work-permit' },
  { label: 'Tourist Visa', path: '/services/tourist-visa' },
  { label: 'Immigration & PR', path: '/services/pr-immigration' },
];

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200 mt-auto">
      <div className="container-page pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed text-navy-300 max-w-sm">
              Professional guidance for study visas, work permits, immigration and
              international education — helping you plan your journey abroad with clarity and
              confidence.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-navy-900 hover:bg-royal-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-navy-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visa Services */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase mb-5">
              Visa Services
            </h4>
            <ul className="space-y-3">
              {visaServices.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-royal-400 mt-0.5 shrink-0" />
                <a href="tel:+10000000000" className="hover:text-white transition-colors">
                  +1 (000) 000-0000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-royal-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@globalpath.demo"
                  className="hover:text-white transition-colors"
                >
                  hello@globalpath.demo
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-royal-400 mt-0.5 shrink-0" />
                <span className="text-navy-300">
                  123 Consultancy Avenue, Suite 400
                  <br />
                  Demo City, 00000
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-royal-400 mt-0.5 shrink-0" />
                <span className="text-navy-300">
                  Mon–Fri: 9:00 AM – 6:00 PM
                  <br />
                  Sat: 10:00 AM – 2:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <p className="text-xs text-navy-400 leading-relaxed max-w-4xl">
            <strong className="text-navy-300 font-semibold">Disclaimer: </strong>
            {DISCLAIMER_TEXT}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} GlobalPath Visa Consultancy. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <Link to="/privacy-policy" className="text-navy-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-navy-400 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/disclaimer" className="text-navy-400 hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}