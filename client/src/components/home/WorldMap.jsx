import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading.jsx';
import { Globe2 } from 'lucide-react';

/**
 * Simple visual world map with clickable markers.
 * Each marker links to /countries/:slug.
 */
const MARKERS = [
  { name: 'Canada', slug: 'canada', x: 22, y: 30, flag: '🇨🇦' },
  { name: 'USA', slug: 'usa', x: 25, y: 40, flag: '🇺🇸' },
  { name: 'United Kingdom', slug: 'uk', x: 47, y: 30, flag: '🇬🇧' },
  { name: 'Ireland', slug: 'ireland', x: 45, y: 31, flag: '🇮🇪' },
  { name: 'France', slug: 'france', x: 49, y: 35, flag: '🇫🇷' },
  { name: 'Germany', slug: 'germany', x: 52, y: 32, flag: '🇩🇪' },
  { name: 'Italy', slug: 'italy', x: 53, y: 39, flag: '🇮🇹' },
  { name: 'UAE', slug: 'dubai-uae', x: 63, y: 47, flag: '🇦🇪' },
  { name: 'India', slug: 'india', x: 70, y: 48, flag: '🇮🇳' },
  { name: 'Singapore', slug: 'singapore', x: 79, y: 57, flag: '🇸🇬' },
  { name: 'Japan', slug: 'japan', x: 85, y: 38, flag: '🇯🇵' },
  { name: 'Australia', slug: 'australia', x: 85, y: 72, flag: '🇦🇺' },
  { name: 'New Zealand', slug: 'new-zealand', x: 92, y: 78, flag: '🇳🇿' },
  { name: 'Brazil', slug: 'brazil', x: 32, y: 65, flag: '🇧🇷' },
  { name: 'South Africa', slug: 'south-africa', x: 52, y: 78, flag: '🇿🇦' },
];

export default function WorldMap() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative container-page">
        <SectionHeading
          light
          eyebrow="Explore"
          title="Where Would You Like to Go?"
          description="Click a marker to explore study, work and immigration options for that country."
        />

        <div className="mt-14 relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-8">
            {/* Simple continent silhouettes as a background */}
            <svg
              viewBox="0 0 100 60"
              className="w-full h-auto max-h-[500px]"
              aria-hidden="true"
            >
              {/* Very rough continent shapes — replace with a detailed world map SVG for production */}
              <g className="fill-white/[0.06]">
                {/* North America */}
                <path d="M10 20 Q20 12 35 14 Q42 20 40 32 Q32 42 24 45 Q12 42 10 30 Z" />
                {/* South America */}
                <path d="M26 50 Q34 48 36 56 Q34 62 30 62 Q26 60 26 50 Z" />
                {/* Europe */}
                <path d="M44 22 Q54 20 58 28 Q56 38 48 42 Q42 38 44 30 Z" />
                {/* Africa */}
                <path d="M44 46 Q58 44 60 54 Q56 66 50 68 Q44 62 44 46 Z" />
                {/* Asia */}
                <path d="M60 22 Q78 18 88 28 Q86 42 72 48 Q60 46 58 34 Z" />
                {/* Australia */}
                <path d="M78 66 Q90 64 94 72 Q88 78 78 76 Q74 72 78 66 Z" />
              </g>
            </svg>

            {/* Markers */}
            {MARKERS.map((m) => (
              <Link
                key={m.slug}
                to={`/countries/${m.slug}`}
                onMouseEnter={() => setHovered(m)}
                onMouseLeave={() => setHovered(null)}
                className="absolute group -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                <span className="block relative">
                  <span className="absolute inset-0 rounded-full bg-royal-500 animate-ping opacity-30" />
                  <span className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full bg-royal-500 ring-4 ring-royal-500/20 group-hover:ring-royal-400/40 group-hover:scale-150 transition-all duration-200" />
                </span>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1 rounded-lg bg-white text-navy-900 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-card">
                  {m.flag} {m.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-navy-300">
            <Globe2 className="w-4 h-4" />
            <span>
              {hovered ? (
                <span className="text-white font-semibold">
                  {hovered.flag} {hovered.name} — click to explore
                </span>
              ) : (
                'Hover a marker to see the country'
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}