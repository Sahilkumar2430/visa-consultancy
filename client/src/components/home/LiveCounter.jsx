import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp.js';

/**
 * Demo counter — a stable, pseudo-random number based on the date,
 * so it changes daily but doesn't randomly jump on refresh.
 */
function todayCount() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  // Deterministic 12–38 range
  return 12 + (seed % 27);
}

export default function LiveCounter() {
  const [base] = useState(todayCount);
  const [visible, setVisible] = useState(true);
  const count = useCountUp(base, 1800, 0, visible);

  // Optional: bump every 45s
  const [extra, setExtra] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setExtra((e) => e + 1), 45000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
      <span className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
        <Activity className="w-3.5 h-3.5 text-emerald-600 relative" />
      </span>
      <span className="text-xs font-semibold text-emerald-800">
        {count + extra} consultations booked today
      </span>
    </div>
  );
}