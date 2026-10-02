import { useEffect, useState } from 'react';
import SectionHeading from '../ui/SectionHeading.jsx';
import ServiceCard from '../shared/ServiceCard.jsx';
import { GridSkeleton } from '../ui/LoadingSkeleton.jsx';
import Button from '../ui/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { fetchServices } from '../../services/contentService.js';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Services"
          title="How We Can Help"
          description="End-to-end support for every stage of your international journey."
        />

        <div className="mt-14">
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

        <div className="mt-12 text-center">
          <Button to="/services" variant="secondary" size="lg" iconRight={ArrowRight}>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}