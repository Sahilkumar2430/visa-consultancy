import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Plus, X, ArrowRight, Check, Minus } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { fetchCountries } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

const MAX = 3;
const VISA_ROWS = [
  'Study Visa',
  'Work Permit',
  'Work Visa',
  'PR Guidance',
  'Visitor Visa',
  'Tourist Visa',
];

export default function Compare() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const pickedCountries = useMemo(
    () =>
      picked
        .map((slug) => countries.find((c) => c.slug === slug))
        .filter(Boolean),
    [picked, countries]
  );

  const filteredPicker = useMemo(() => {
    const q = search.trim().toLowerCase();
    return countries
      .filter((c) => !picked.includes(c.slug))
      .filter((c) => !q || c.name.toLowerCase().includes(q))
      .slice(0, 60);
  }, [countries, picked, search]);

  const add = (slug) => {
    if (picked.length >= MAX) return;
    setPicked((p) => [...p, slug]);
    setPickerOpen(false);
    setSearch('');
  };

  const remove = (slug) => setPicked((p) => p.filter((s) => s !== slug));

  const hasVisa = (country, row) =>
    country.visaTypes?.some(
      (vt) =>
        vt.toLowerCase() === row.toLowerCase() ||
        vt.toLowerCase().includes(row.toLowerCase().split(' ')[0])
    );

  const gridCols = `200px repeat(${pickedCountries.length}, minmax(200px, 1fr)) ${
    pickedCountries.length < MAX ? '180px' : ''
  }`;

  return (
    <>
      <Helmet>
        <title>Compare Countries — {APP_NAME}</title>
        <meta
          name="description"
          content="Compare destinations side-by-side to make an informed decision about your visa goals."
        />
      </Helmet>

      <PageHero
        eyebrow="Compare"
        title="Compare Destinations"
        description="Add up to 3 countries and compare visa options, region and key facts side-by-side."
        breadcrumbs={[{ label: 'Compare' }]}
        image="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page">
          {pickedCountries.length === 0 ? (
            <EmptyState
              icon={Plus}
              title="Pick countries to compare"
              description="Add up to 3 countries and see how they compare at a glance."
              action={() => setPickerOpen(true)}
              actionLabel="Add a Country"
            />
          ) : (
            <>
              <div className="overflow-x-auto hide-scrollbar rounded-3xl bg-white border border-navy-100 shadow-soft">
                <div className="min-w-[640px]">
                  {/* Header row */}
                  <div
                    className="grid gap-0"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    <div className="p-5 border-b border-navy-100 bg-cream-50/60" />
                    {pickedCountries.map((c) => (
                      <div
                        key={c.slug}
                        className="p-5 border-b border-l border-navy-100 relative"
                      >
                        <button
                          onClick={() => remove(c.slug)}
                          className="absolute top-3 right-3 p-1 rounded-lg text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
                          aria-label={`Remove ${c.name}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{c.flag}</span>
                          <Link
                            to={`/countries/${c.slug}`}
                            className="font-display font-bold text-navy-900 hover:text-royal-600 transition-colors"
                          >
                            {c.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                    {pickedCountries.length < MAX && (
                      <div className="p-5 border-b border-l border-navy-100 bg-cream-50/30 flex items-center justify-center">
                        <button
                          onClick={() => setPickerOpen(true)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:text-royal-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Rows */}
                  <Row
                    label="Region"
                    values={pickedCountries.map((c) => c.region || '—')}
                    gridCols={gridCols}
                    showExtra={pickedCountries.length < MAX}
                  />
                  <Row
                    label="Capital"
                    values={pickedCountries.map((c) => c.capital || '—')}
                    gridCols={gridCols}
                    showExtra={pickedCountries.length < MAX}
                  />
                  <Row
                    label="Visa Types"
                    values={pickedCountries.map(
                      (c) => c.visaTypes?.join(', ') || '—'
                    )}
                    gridCols={gridCols}
                    showExtra={pickedCountries.length < MAX}
                    multiline
                  />

                  {/* Visa availability sub-header */}
                  <div
                    className="grid gap-0"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    <div className="p-4 bg-cream-50/60 text-xs font-bold uppercase tracking-wider text-navy-500 border-b border-navy-100">
                      Visa Availability
                    </div>
                    {pickedCountries.map((c) => (
                      <div
                        key={c.slug}
                        className="p-4 border-b border-l border-navy-100 text-xs font-semibold text-navy-500"
                      >
                        {c.name}
                      </div>
                    ))}
                    {pickedCountries.length < MAX && (
                      <div className="p-4 border-b border-l border-navy-100 bg-cream-50/30" />
                    )}
                  </div>

                  {VISA_ROWS.map((row) => (
                    <div
                      key={row}
                      className="grid gap-0"
                      style={{ gridTemplateColumns: gridCols }}
                    >
                      <div className="p-4 text-sm font-medium text-navy-600 border-b border-navy-100">
                        {row}
                      </div>
                      {pickedCountries.map((c) => (
                        <div
                          key={c.slug}
                          className="p-4 border-b border-l border-navy-100 flex items-center justify-center"
                        >
                          {hasVisa(c, row) ? (
                            <Check className="w-5 h-5 text-teal-500" />
                          ) : (
                            <Minus className="w-4 h-4 text-navy-200" />
                          )}
                        </div>
                      ))}
                      {pickedCountries.length < MAX && (
                        <div className="p-4 border-b border-l border-navy-100 bg-cream-50/30" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  to="/contact"
                  variant="accent"
                  size="lg"
                  iconRight={ArrowRight}
                >
                  Discuss Your Options With a Consultant
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Picker modal */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-20 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white shadow-card-hover overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-navy-100">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries…"
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm"
              />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <p className="p-6 text-center text-sm text-navy-400">Loading…</p>
              ) : filteredPicker.length === 0 ? (
                <p className="p-6 text-center text-sm text-navy-400">
                  No countries found.
                </p>
              ) : (
                filteredPicker.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => add(c.slug)}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-cream-100 transition-colors text-left border-b border-navy-50 last:border-b-0"
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-sm font-medium text-navy-800">
                      {c.name}
                    </span>
                    <span className="ml-auto text-xs text-navy-400">
                      {c.region}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, values, gridCols, showExtra, multiline = false }) {
  return (
    <div className="grid gap-0" style={{ gridTemplateColumns: gridCols }}>
      <div className="p-4 text-sm font-medium text-navy-600 border-b border-navy-100">
        {label}
      </div>
      {values.map((v, i) => (
        <div
          key={i}
          className={`p-4 border-b border-l border-navy-100 text-sm text-navy-800 ${
            multiline ? '' : 'font-medium'
          }`}
        >
          {v}
        </div>
      ))}
      {showExtra && (
        <div className="p-4 border-b border-l border-navy-100 bg-cream-50/30" />
      )}
    </div>
  );
}