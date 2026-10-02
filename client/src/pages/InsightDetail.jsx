import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import Button from '../components/ui/Button.jsx';
import { demoInsights } from '../services/insightsData.js';
import { APP_NAME } from '../utils/constants.js';
import { formatDate } from '../utils/helpers.js';

export default function InsightDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = demoInsights.find((i) => i.slug === slug);
    setPost(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-20">
        <div className="skeleton h-64 rounded-3xl" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-page py-20">
        <ErrorState
          title="Article not found"
          description="This article may have been moved or removed."
        />
        <div className="mt-8 text-center">
          <Button to="/insights" variant="accent">
            Back to Insights
          </Button>
        </div>
      </div>
    );
  }

  const related = demoInsights
    .filter((i) => i.category === post.category && i.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>
          {post.title} — {APP_NAME} Insights
        </title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article>
        <div className="relative bg-navy-950 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/70" />
          </div>
          <div className="relative container-page py-14 lg:py-20">
            <div className="mb-6 text-navy-200">
              <Breadcrumbs
                items={[
                  { label: 'Insights', path: '/insights' },
                  { label: post.title },
                ]}
              />
            </div>
            <span className="inline-block text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-royal-500/20 border border-royal-400/30 text-royal-200">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl text-balance">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy-200">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>

        <section className="section-padding bg-white">
          <div className="container-page max-w-3xl">
            <p className="text-lg text-navy-700 leading-relaxed font-medium mb-8">
              {post.excerpt}
            </p>
            <div className="prose-custom whitespace-pre-line text-navy-600 leading-relaxed">
              {post.content}
            </div>

            <div className="mt-12 pt-8 border-t border-navy-100">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-royal-600 hover:text-royal-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all insights
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-padding bg-cream-50">
            <div className="container-page">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-8">
                Related Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/insights/${r.slug}`}
                    className="group rounded-3xl overflow-hidden bg-white border border-navy-100 shadow-soft hover:shadow-card-hover transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-navy-100">
                      <img
                        src={r.coverImage}
                        alt={r.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-navy-900 group-hover:text-royal-700 transition-colors leading-snug">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTABand
        title="Need guidance on your next step?"
        description="Book a free consultation with one of our advisors."
        buttonLabel="Book Free Consultation"
      />
    </>
  );
}