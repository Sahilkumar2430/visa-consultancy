import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import CountryCard from '../components/shared/CountryCard.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { GridSkeleton } from '../components/ui/LoadingSkeleton.jsx';
import { fetchCountries } from '../services/contentService.js';
import { APP_NAME, VISA_TYPES } from '../utils/constants.js';

const filterOptions = ['All', ...VISA_TYPES.slice(0, 4)];

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return countries.filter((c) => {
      // Search match — name, capital, region, calling code
      const matchesQuery =
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.capital?.toLowerCase().includes(q) ||
        c.region?.toLowerCase().includes(q) ||
        c.subregion?.toLowerCase().includes(q) ||
        c.callingCode?.toLowerCase().includes(q);

      // Visa-type filter
      const matchesFilter =
        filter === 'All' ||
        c.visaTypes?.some((v) =>
          v.toLowerCase().includes(filter.toLowerCase().split(' ')[0])
        );

      return matchesQuery && matchesFilter;
    });
  }, [countries, query, filter]);

  return (
    <>
      <Helmet>
        <title>Explore Countries — {APP_NAME}</title>
        <meta
          name="description"
          content="Explore popular destinations for study, work and immigration. Get tailored guidance for each country."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_55%)]" />
        <div className="relative container-page py-14 lg:py-20">
          <div className="mb-6">
            <div className="text-navy-300">
              <Breadcrumbs items={[{ label: 'Countries' }]} />
            </div>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
            Explore Your Destination
          </h1>
          <p className="mt-5 text-navy-100/80 text-base sm:text-lg max-w-2xl leading-relaxed">
            Browse destinations for study, work, tourism and immigration. Every country is
            searchable — try a name, capital city, region or dialing code.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-cream-50/95 backdrop-blur-md border-b border-navy-100">
        <div className="container-page py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search countries, capitals, regions…"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-navy-200 bg-white text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-100 transition-all"
                aria-label="Search countries"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <SlidersHorizontal className="w-4 h-4 text-navy-400 shrink-0 hidden sm:block" />
              {filterOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    filter === f
                      ? 'bg-navy-900 text-white'
                      : 'bg-white text-navy-600 border border-navy-200 hover:border-navy-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 lg:py-16 bg-cream-50">
        <div className="container-page">
          {loading ? (
            <GridSkeleton count={9} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No countries found"
              description={`No results for "${query}". Try a different name, capital or region.`}
            />
          ) : (
            <>
              <p className="text-sm text-navy-400 mb-6">
                Showing <span className="font-semibold text-navy-700">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'destination' : 'destinations'}
                {query && (
                  <>
                    {' '}for <span className="font-semibold text-navy-700">"{query}"</span>
                  </>
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((c, i) => (
                  <CountryCard key={c._id || c.slug} country={c} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}