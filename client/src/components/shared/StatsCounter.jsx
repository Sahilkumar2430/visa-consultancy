import { useCountUp } from '../../hooks/useCountUp.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import * as Icons from 'lucide-react';

function StatItem({ stat, isVisible }) {
  const Icon = Icons[stat.icon] || Icons.TrendingUp;
  const count = useCountUp(stat.value, 2000, 0, isVisible);

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-royal-500/10 mb-4">
        <Icon className="w-6 h-6 text-royal-400" />
      </div>
      <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        {count.toLocaleString()}
        {stat.suffix && <span className="text-royal-400">{stat.suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-medium text-navy-200">{stat.label}</p>
    </div>
  );
}

export default function StatsCounter({ stats = [] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
      {stats.map((stat) => (
        <StatItem key={stat._id || stat.label} stat={stat} isVisible={isVisible} />
      ))}
    </div>
  );
}