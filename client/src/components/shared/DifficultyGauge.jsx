/**
 * A simple, opinionated "difficulty" score for a country's visa process.
 * This is illustrative — replace with your own scoring logic if desired.
 */
const SCORES = {
  canada: { score: 6, label: 'Moderate' },
  australia: { score: 7, label: 'Moderate' },
  'new-zealand': { score: 6, label: 'Moderate' },
  uk: { score: 6, label: 'Moderate' },
  usa: { score: 8, label: 'Challenging' },
  germany: { score: 6, label: 'Moderate' },
  ireland: { score: 5, label: 'Balanced' },
  france: { score: 5, label: 'Balanced' },
  'dubai-uae': { score: 4, label: 'Accessible' },
  netherlands: { score: 5, label: 'Balanced' },
  sweden: { score: 5, label: 'Balanced' },
  norway: { score: 5, label: 'Balanced' },
  denmark: { score: 5, label: 'Balanced' },
  japan: { score: 7, label: 'Moderate' },
  singapore: { score: 6, label: 'Moderate' },
};

const DEFAULT = { score: 5, label: 'Balanced' };

export default function DifficultyGauge({ slug }) {
  const { score, label } = SCORES[slug] || DEFAULT;
  const pct = (score / 10) * 100;
  const tone =
    score >= 8
      ? 'text-red-500'
      : score >= 6
        ? 'text-amber-500'
        : score >= 4
          ? 'text-royal-500'
          : 'text-teal-500';
  const bar =
    score >= 8
      ? 'bg-red-500'
      : score >= 6
        ? 'bg-amber-500'
        : score >= 4
          ? 'bg-royal-500'
          : 'bg-teal-500';

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-navy-400">
          Visa Difficulty (indicative)
        </span>
        <span className={`text-sm font-bold ${tone}`}>{label}</span>
      </div>
      <div className="h-2 rounded-full bg-navy-100 overflow-hidden">
        <div
          className={`h-full ${bar} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-[0.7rem] text-navy-400 leading-relaxed">
        This is a generalised indicator to help with research. Actual difficulty depends on
        your profile and current policy.
      </p>
    </div>
  );
}