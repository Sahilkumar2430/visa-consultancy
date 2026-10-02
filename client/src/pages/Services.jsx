import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero.jsx';
import ServiceCard from '../components/shared/ServiceCard.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import { GridSkeleton } from '../components/ui/LoadingSkeleton.jsx';
import { fetchServices } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

const includedBenefits = [
  'Personalised profile assessment',
  'Country and visa recommendation',
  'Document preparation guidance',
  'Application review before submission',
  'Ongoing support and updates',
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services — {APP_NAME}</title>
        <meta
          name="description"
          content="Explore our services: study visas, work permits, tourist visas, immigration and PR, university admission and documentation assistance."
        />
      </Helmet>

      <PageHero
        eyebrow="Our Services"
        title="Guidance for Every Stage of Your Journey"
        description="From choosing a destination to submitting your application — we provide structured support tailored to your goals."
        breadcrumbs={[{ label: 'Services' }]}
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
      />

      {/* Services grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-page">
          {loading ? (
            <GridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <ServiceCard key={s._id || s.slug} service={s} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What's included */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              What You Get
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Support That Goes Beyond Paperwork
            </h2>
            <p className="mt-5 text-navy-500 leading-relaxed">
              Every service includes a personal consultation, clear expectations and honest
              guidance about your options.
            </p>
            <div className="mt-8 space-y-3">
              {includedBenefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                  <span className="text-navy-700">{b}</span>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-royal-600 hover:text-royal-700"
            >
              Book your free consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
                alt="Consultant working with clients"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which service fits your goals?"
        description="Speak with a consultant — we'll recommend the right path based on your profile."
        buttonLabel="Book Free Consultation"
      />
    </>
  );
}