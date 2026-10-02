import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Target,
  BarChart3,
} from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import CountryCard from '../components/shared/CountryCard.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { GridSkeleton } from '../components/ui/LoadingSkeleton.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { fetchCountries } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

function scoreCountry(country, answers = {}) {
  let score = 40;
  if (answers.education >= 2) score += 12;
  if (answers.funds === 3) score += 10;
  if (answers.language === 3) score += 10;
  if (answers.experience === 3) score += 8;
  if (answers.age === 3) score += 6;

  const name = country.name;
  if (['Canada', 'Australia', 'New Zealand'].includes(name) && answers.experience >= 2)
    score += 8;
  if (
    ['Germany', 'Netherlands', 'Sweden', 'Norway', 'Finland'].includes(name) &&
    answers.education >= 2
  )
    score += 6;
  if (['USA', 'United Kingdom'].includes(name) && answers.funds === 3) score += 6;
  if (['Japan', 'South Korea', 'Singapore'].includes(name) && answers.language >= 2)
    score += 5;
  if (country.isFeatured) score += 5;

  return Math.min(98, score);
}

export default function VisaMatch() {
  const { profile, resetProfile } = useProfile();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const hasAnswers = Object.values(profile.answers || {}).some(
    (v) => v !== undefined && v !== null
  );

  const ranked = useMemo(() => {
    if (!countries.length) return [];
    return countries
      .map((c) => ({ ...c, _matchScore: scoreCountry(c, profile.answers || {}) }))
      .sort((a, b) => b._matchScore - a._matchScore)
      .slice(0, 12);
  }, [countries, profile.answers]);

  const favourites = useMemo(
    () =>
      countries.filter((c) =>
        (profile.favouriteCountries || []).includes(c.slug)
      ),
    [countries, profile.favouriteCountries]
  );

  if (!hasAnswers && !loading) {
    return (
      <>
        <Helmet>
          <title>Your Visa Match — {APP_NAME}</title>
        </Helmet>
        <PageHero
          eyebrow="Personalised"
          title="Your Visa Match"
          description="Take the free eligibility check to see countries matched to your profile."
          breadcrumbs={[{ label: 'Visa Match' }]}
        />
        <section className="section-padding bg-cream-50">
          <div className="container-page max-w-xl">
            <EmptyState
              icon={Target}
              title="No profile yet"
              description="Answer 5 quick questions and we’ll match you with countries that fit your profile."
              actionLabel="Take the Eligibility Check"
              actionTo="/#eligibility"
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Visa Match — {APP_NAME}</title>
        <meta
          name="description"
          content="Personalised country matches based on your profile. Indicative guidance only."
        />
      </Helmet>

      <PageHero
        eyebrow="Personalised"
        title="Your Visa Match"
        description="Based on your profile, here are the destinations that align best with your goals. This is indicative only."
        breadcrumbs={[{ label: 'Visa Match' }]}
        image="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&q=80"
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
            Get Expert Review
          </Button>
          <button
            onClick={resetProfile}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Profile
          </button>
        </div>
      </PageHero>

      {favourites.length > 0 && (
        <section className="bg-white border-b border-navy-100">
          <div className="container-page py-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                Your Saved Countries ({favourites.length})
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {favourites.map((c) => (
                <Link
                  key={c.slug}
                  to={`/countries/${c.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 border border-navy-100 whitespace-nowrap transition-colors"
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-sm font-semibold text-navy-800">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-royal-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-royal-600">
                  Top Matches
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                Countries Aligned With Your Profile
              </h2>
            </div>
            <Link
              to="/#eligibility"
              className="text-sm font-semibold text-royal-600 hover:text-royal-700 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Update your profile
            </Link>
          </div>

          {loading ? (
            <GridSkeleton count={9} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ranked.map((c, i) => (
                <div key={c.slug} className="relative">
                  <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-royal-500 to-teal-500 text-white text-xs font-bold shadow-card">
                    <TrendingUp className="w-3 h-3" />
                    {c._matchScore}%
                  </div>
                  <CountryCard country={c} index={i} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-white border border-navy-100 p-6 max-w-3xl mx-auto text-center">
            <p className="text-sm text-navy-500 leading-relaxed">
              <strong className="text-navy-800">How this works:</strong> Match scores are
              computed from the answers you provided. This is an indicative tool — not an
              official assessment.
            </p>
            <Button to="/contact" variant="accent" className="mt-5">
              Get an Expert Review
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}