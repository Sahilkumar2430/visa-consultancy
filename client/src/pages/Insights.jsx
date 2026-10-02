import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { demoInsights, INSIGHT_CATEGORIES } from '../services/insightsData.js';
import { APP_NAME } from '../utils/constants.js';
import { formatDate } from '../utils/helpers.js';

export default function Insights() {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(
    () =>
      category === 'All'
        ? demoInsights
        : demoInsights.filter((i) => i.category === category),
    [category]
  );

  return (
    <>
      <Helmet>
        <title>Insights — {APP_NAME}</title>
        <meta
          name="description"
          content="Guides, tips and updates on studying, working and immigrating abroad."
        />
      </Helmet>

      <PageHero
        eyebrow="Insights"
        title="Guides & Updates"
        description="Practical articles on study, work, immigration and travel — written to help you make informed decisions."
        breadcrumbs={[{ label: 'Insights' }]}
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-10">
            {INSIGHT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  category === c
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-navy-600 border border-navy-200 hover:border-navy-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No articles yet" description="Check back soon." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  to={`/insights/${post.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-navy-100 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-navy-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-royal-50 text-royal-700">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-navy-900 leading-snug group-hover:text-royal-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-navy-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        title="Have a question we haven’t covered?"
        description="Talk to a consultant — we’ll give you a personalised answer."
        buttonLabel="Book Free Consultation"
      />
    </>
  );
}