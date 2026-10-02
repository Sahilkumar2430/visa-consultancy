import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Globe2,
  Briefcase,
  HelpCircle,
  Star,
  UserCog,
  BarChart3,
  Phone,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { cn } from '../../utils/helpers.js';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Leads', icon: Users },
  { to: '/admin/countries', label: 'Countries', icon: Globe2 },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/team', label: 'Team', icon: UserCog },
  { to: '/admin/statistics', label: 'Statistics', icon: BarChart3 },
  { to: '/admin/contact-info', label: 'Contact Info', icon: Phone },
];

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-navy-950 text-white flex flex-col transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-5 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-royal-500 to-teal-500" />
            <span className="font-display font-extrabold text-sm tracking-tight">
              GlobalPath
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 text-navy-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-royal-600 text-white'
                      : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {n.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-navy-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-navy-200 hover:bg-navy-800 hover:text-white transition-colors"
          >
            <Globe2 className="w-4 h-4" />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-navy-200 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-navy-950/60 z-30 lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-navy-100 h-16 flex items-center px-4 lg:px-8 gap-4">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-navy-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-navy-700" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-navy-400 font-medium">Admin Panel</p>
            <p className="text-sm font-bold text-navy-900 truncate">
              {user?.name || 'Admin'}
            </p>
          </div>
          <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-royal-50 text-royal-700">
            {user?.role || 'admin'}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}