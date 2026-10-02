import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  Send,
  Award,
  AlertCircle,
} from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import { APP_NAME } from '../utils/constants.js';

const DEMO_IDS = {
  DEMO2024001: {
    name: 'Sample Applicant',
    visaType: 'Study Visa',
    country: 'Canada',
    stages: [
      { id: 'received', label: 'Application Received', date: 'Jan 12, 2024', status: 'done' },
      { id: 'review', label: 'Under Review', date: 'Jan 15, 2024', status: 'done' },
      { id: 'docs', label: 'Documentation Verified', date: 'Jan 22, 2024', status: 'done' },
      { id: 'submitted', label: 'Submitted to Authority', date: 'Jan 28, 2024', status: 'active' },
      { id: 'decision', label: 'Awaiting Decision', date: '—', status: 'pending' },
    ],
  },
  DEMO2024002: {
    name: 'Sample Applicant 2',
    visaType: 'Work Permit',
    country: 'Germany',
    stages: [
      { id: 'received', label: 'Application Received', date: 'Feb 02, 2024', status: 'done' },
      { id: 'review', label: 'Under Review', date: 'Feb 05, 2024', status: 'done' },
      { id: 'docs', label: 'Documentation Verified', date: 'Feb 10, 2024', status: 'active' },
      { id: 'submitted', label: 'Submitted to Authority', date: '—', status: 'pending' },
      { id: 'decision', label: 'Awaiting Decision', date: '—', status: 'pending' },
    ],
  },
};

const STAGE_ICONS = {
  received: FileText,
  review: Search,
  docs: CheckCircle2,
  submitted: Send,
  decision: Award,
};

export default function Tracker() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lookup = () => {
    setError('');
    setResult(null);
    const trimmed = id.trim().toUpperCase();
    if (!trimmed) return setError('Please enter a tracking ID.');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = DEMO_IDS[trimmed];
      if (found) setResult(found);
      else
        setError(
          'Tracking ID not found. Try DEMO2024001 or DEMO2024002 to see a sample.'
        );
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>Application Tracker — {APP_NAME}</title>
        <meta
          name="description"
          content="Track your visa application status. Demo IDs: DEMO2024001, DEMO2024002."
        />
      </Helmet>

      <PageHero
        eyebrow="Application Tracker"
        title="Track Your Application"
        description="Enter your tracking ID to see where your application stands. Demo IDs: DEMO2024001, DEMO2024002"
        breadcrumbs={[{ label: 'Tracker' }]}
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page max-w-2xl">
          <div className="rounded-3xl bg-white border border-navy-100 shadow-soft p-6 sm:p-8">
            <label className="block text-sm font-semibold text-navy-700 mb-2">
              Tracking ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookup()}
                placeholder="e.g. DEMO2024001"
                className="flex-1 px-4 py-3 rounded-xl border border-navy-200 bg-white text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-100 transition-all"
              />
              <Button onClick={lookup} variant="accent" loading={loading} icon={Search}>
                Track
              </Button>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <p className="mt-3 text-xs text-navy-400">
              Demo IDs for testing:{' '}
              <code className="px-1.5 py-0.5 rounded bg-cream-100 text-navy-700">
                DEMO2024001
              </code>
              ,{' '}
              <code className="px-1.5 py-1 rounded bg-cream-100 text-navy-700">
                DEMO2024002
              </code>
            </p>
          </div>

          {result && (
            <div className="mt-8 rounded-3xl bg-white border border-navy-100 shadow-soft overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-navy-100 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-royal-300 mb-2">
                  Application Summary
                </p>
                <h2 className="font-display text-xl font-bold">{result.name}</h2>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-semibold">
                    {result.visaType}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-semibold">
                    {result.country}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-semibold">
                    ID: {id.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <ol className="relative space-y-6">
                  {result.stages.map((stage, i) => {
                    const Icon = STAGE_ICONS[stage.id] || Clock;
                    const isDone = stage.status === 'done';
                    const isActive = stage.status === 'active';
                    const isPending = stage.status === 'pending';
                    const isLast = i === result.stages.length - 1;
                    return (
                      <li key={stage.id} className="relative flex gap-4">
                        {!isLast && (
                          <div
                            className={`absolute left-[19px] top-10 bottom-[-24px] w-0.5 ${
                              isDone ? 'bg-teal-400' : 'bg-navy-100'
                            }`}
                          />
                        )}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isDone
                              ? 'bg-teal-500 text-white'
                              : isActive
                                ? 'bg-royal-600 text-white ring-4 ring-royal-100'
                                : 'bg-navy-100 text-navy-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="pt-1.5 flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h3
                              className={`font-semibold ${
                                isPending ? 'text-navy-300' : 'text-navy-900'
                              }`}
                            >
                              {stage.label}
                            </h3>
                            <span
                              className={`text-xs font-medium ${
                                isPending ? 'text-navy-300' : 'text-navy-400'
                              }`}
                            >
                              {stage.date}
                            </span>
                          </div>
                          {isActive && (
                            <p className="mt-1 text-xs text-royal-600 font-semibold">
                              Currently at this stage
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-navy-400 leading-relaxed">
              Can’t find your tracking ID? Contact your consultant or email us.
            </p>
            <Button to="/contact" variant="secondary" className="mt-4">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}