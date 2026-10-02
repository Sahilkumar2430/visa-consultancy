import { useEffect, useState } from 'react';
import SectionHeading from '../ui/SectionHeading.jsx';
import TestimonialCarousel from '../shared/TestimonialCarousel.jsx';
import Button from '../ui/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { fetchTestimonials } from '../../services/contentService.js';

export default function SuccessStories() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTestimonials().then((data) => setItems(data));
  }, []);

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Success Stories"
          title="Stories From Our Clients"
          description="Sample testimonials shown during development. Real, verified client stories will be managed via the admin dashboard."
        />

        <div className="mt-14">
          <TestimonialCarousel items={items} />
        </div>

        <div className="mt-12 text-center">
          <Button to="/success-stories" variant="secondary" size="lg" iconRight={ArrowRight}>
            View All Stories
          </Button>
        </div>
      </div>
    </section>
  );
}