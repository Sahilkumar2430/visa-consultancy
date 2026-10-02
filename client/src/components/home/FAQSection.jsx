import { useEffect, useState } from 'react';
import SectionHeading from '../ui/SectionHeading.jsx';
import FAQAccordion from '../shared/FAQAccordion.jsx';
import Button from '../ui/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { fetchFAQs } from '../../services/contentService.js';

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQs().then((data) => setFaqs(data.slice(0, 6)));
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions, Answered"
              description="Everything you need to know before starting your visa journey."
            />
            <div className="mt-8">
              <Button to="/faq" variant="secondary" iconRight={ArrowRight}>
                See All FAQs
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            {faqs.length ? (
              <FAQAccordion items={faqs} />
            ) : (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="skeleton h-16 rounded-2xl" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}