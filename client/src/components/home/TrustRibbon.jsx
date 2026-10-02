import { Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';

const items = [
  { icon: ShieldCheck, text: 'Transparent guidance — no false guarantees' },
  { icon: Clock, text: 'Replies within 1 business day' },
  { icon: Award, text: 'Country-specific expertise' },
  { icon: Sparkles, text: 'Personalised recommendations' },
];

export default function TrustRibbon() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-page py-3.5">
        <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.text}
                className="flex items-center gap-2 text-xs font-medium whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-navy-100">{it.text}</span>
                <span className="text-navy-600 ml-4 hidden lg:inline">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}