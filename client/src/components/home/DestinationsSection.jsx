import { useEffect, useState } from 'react';
import SectionHeading from '../ui/SectionHeading.jsx';
import CountryCard from '../shared/CountryCard.jsx';
import { GridSkeleton } from '../ui/LoadingSkeleton.jsx';
import Button from '../ui/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { fetchCountries } from '../../services/contentService.js';

export default function DestinationsSection() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Destinations"
          title="Explore Your Destination"
          description="Discover popular countries for study, work and immigration — each with tailored guidance."
        />

        <div className="mt-14">
          {loading ? (
            <GridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((c, i) => (
                <CountryCard key={c._id || c.slug} country={c} index={i} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button to="/countries" variant="accent" size="lg" iconRight={ArrowRight}>
            View All Countries
          </Button>
        </div>
      </div>
    </section>
  );
}