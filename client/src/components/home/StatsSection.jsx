import { useEffect, useState } from 'react';
import StatsCounter from '../shared/StatsCounter.jsx';
import { fetchStats, demoStats } from '../../services/contentService.js';

export default function StatsSection() {
  const [stats, setStats] = useState(demoStats);

  useEffect(() => {
    fetchStats().then((data) => {
      if (Array.isArray(data) && data.length) setStats(data);
    });
  }, []);

  return (
    <section className="bg-navy-950 py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.12),transparent_60%)]" />
      <div className="relative container-page">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Our Numbers
          </h2>
          <p className="mt-3 text-sm text-navy-300 max-w-xl mx-auto">
            Figures are configurable from the admin panel and should reflect verified data only.
          </p>
        </div>
        <StatsCounter stats={stats} />
      </div>
    </section>
  );
}