import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, AlertCircle } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login — GlobalPath</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-500 to-teal-500" />
              <span className="font-display font-extrabold text-white text-lg tracking-tight">
                GlobalPath
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-1.5 text-sm text-navy-300">
              Sign in to manage leads and content
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-3xl bg-white p-7 shadow-card-hover space-y-5"
          >
            <Input
              label="Email"
              type="email"
              placeholder="admin@globalpath.demo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700 font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full"
              iconRight={ArrowRight}
              loading={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>

            <div className="pt-2 border-t border-navy-100 text-center">
              <p className="text-[0.7rem] text-navy-400 leading-relaxed">
                <strong className="text-navy-700">Demo credentials:</strong>
                <br />
                admin@globalpath.demo / AdminPass123!
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-navy-400 hover:text-white transition-colors"
            >
              ← Back to Portal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}