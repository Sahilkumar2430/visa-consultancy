import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/shared/PageHero.jsx';
import TestimonialCard from '../components/shared/TestimonialCard.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { GridSkeleton } from '../components/ui/LoadingSkeleton.jsx';
import { fetchTestimonials } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

export default function SuccessStories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Success Stories — {APP_NAME}</title>
        <meta
          name="description"
          content="Read sample client testimonials and stories from our visa and immigration guidance journey."
        />
      </Helmet>

      <PageHero
        eyebrow="Success Stories"
        title="Client Stories & Experiences"
        description="Sample testimonials are displayed during development. Real, verified client stories will be managed via the admin dashboard."
        breadcrumbs={[{ label: 'Success Stories' }]}
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page">
          {loading ? (
            <GridSkeleton count={6} />
          ) : items.length === 0 ? (
            <EmptyState
              title="No stories yet"
              description="Success stories will appear here once they are added through the admin dashboard."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t, i) => (
                <TestimonialCard key={t._id} testimonial={t} index={i} />
              ))}
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-amber-50 border border-amber-200 p-5 text-center max-w-2xl mx-auto">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Note:</strong> Testimonials marked “Sample” are demo content shown
              during development. They should be replaced with verified client stories before
              going live.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-20 bg-white">
        <CTABand
          title="Ready to write your own success story?"
          description="Start with a free consultation — we’ll help you understand your options."
          buttonLabel="Book Free Consultation"
        />
      </div>
    </>
  );
}