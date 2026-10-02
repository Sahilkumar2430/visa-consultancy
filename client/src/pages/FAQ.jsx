import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import FAQAccordion from '../components/shared/FAQAccordion.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { fetchFAQs } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'process', label: 'Process & Timelines' },
  { id: 'documents', label: 'Documents' },
  { id: 'country', label: 'Countries' },
  { id: 'fees', label: 'Fees & Cost' },
];

/** Classify an FAQ by keyword heuristics. */
function categorize(faq) {
  const text = `${faq.question} ${faq.answer}`.toLowerCase();
  if (/(cost|fee|price|payment|charge)/.test(text)) return 'fees';
  if (/(document|paperwork|required|certificate|passport)/.test(text)) return 'documents';
  if (/(country|destination|suitable for|which nation)/.test(text)) return 'country';
  if (/(time|how long|process|steps|after|timeline)/.test(text)) return 'process';
  return 'general';
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchFAQs().then((data) => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return faqs.filter((f) => {
      const matchesQuery =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      const matchesCategory =
        category === 'all' || categorize(f) === category;
      return matchesQuery && matchesCategory;
    });
  }, [faqs, query, category]);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions — {APP_NAME}</title>
        <meta
          name="description"
          content="Find answers to common questions about visa applications, documentation, timelines and consultation process."
        />
      </Helmet>

      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Find answers to common questions about visas, documentation, timelines and our process."
        breadcrumbs={[{ label: 'FAQ' }]}
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page max-w-3xl">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-200 bg-white text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-100 transition-all"
              aria-label="Search FAQs"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  category === c.id
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-navy-600 border border-navy-200 hover:border-navy-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-16 rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No matching questions"
              description="Try a different keyword or category, or contact us directly for help."
            />
          ) : (
            <>
              <p className="text-sm text-navy-400 mb-4">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </p>
              <FAQAccordion items={filtered} defaultOpen={-1} />
            </>
          )}
        </div>
      </section>

      <CTABand
        title="Still have questions?"
        description="Our consultants are happy to help. Book a free consultation."
        buttonLabel="Contact Us"
      />
    </>
  );
}