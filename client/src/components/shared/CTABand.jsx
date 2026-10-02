import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';

export default function CTABand({ title, description, buttonLabel, buttonTo = '/contact' }) {
  return (
    <section className="pb-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 to-navy-800 px-7 py-14 sm:px-12 lg:px-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.22),transparent_55%)]" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight text-balance">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-navy-100/80 leading-relaxed">{description}</p>
            )}
            <Button
              to={buttonTo}
              variant="white"
              size="lg"
              className="mt-8"
              iconRight={ArrowRight}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}