import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  FileText,
  Clock,
  MapPin,
  Users,
  Globe2,
  Coins,
  Phone,
} from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Button from '../components/ui/Button.jsx';
import FAQAccordion from '../components/shared/FAQAccordion.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import { TextSkeleton } from '../components/ui/LoadingSkeleton.jsx';
import { fetchCountryBySlug, fetchFAQs } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';
import DifficultyGauge from '../components/shared/DifficultyGauge.jsx';
import BreadcrumbJsonLd from '../components/ui/BreadcrumbJsonLd.jsx';

function formatNumber(n) {
  if (!n && n !== 0) return '—';
  return new Intl.NumberFormat('en-US').format(n);
}

export default function CountryDetail() {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    Promise.all([fetchCountryBySlug(slug), fetchFAQs()])
      .then(([c, f]) => {
        if (!active) return;
        if (!c) return setError(true);
        setCountry(c);
        setFaqs(Array.isArray(f) ? f.slice(0, 5) : []);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-20 space-y-6">
        <TextSkeleton lines={2} />
        <div className="skeleton h-64 rounded-3xl" />
        <TextSkeleton lines={6} />
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="container-page py-20">
        <ErrorState
          title="Country not found"
          description="We couldn’t find this destination. It may have been moved or removed."
        />
        <div className="mt-8 text-center">
          <Button to="/countries" variant="accent">
            Back to Countries
          </Button>
        </div>
      </div>
    );
  }

  // Extract derived values
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol || ''})`.trim())
        .join(', ')
    : '';

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : '';

  const facts = [
    { icon: MapPin, label: 'Capital', value: country.capital || '—' },
    { icon: Users, label: 'Population', value: formatNumber(country.population) },
    { icon: Globe2, label: 'Region', value: country.subregion || country.region || '—' },
    { icon: Phone, label: 'Calling Code', value: country.callingCode || '—' },
    { icon: Coins, label: 'Currency', value: currencies || '—' },
    { icon: Globe2, label: 'Languages', value: languages || '—' },
  ].filter((f) => f.value && f.value !== '—' || f.label === 'Capital');

  const sections = [
    {
      icon: GraduationCap,
      title: 'Study Opportunities',
      body:
        country.studyInfo ||
        'Universities and colleges offering diverse programs for international students. Our team helps shortlist the right fit.',
    },
    {
      icon: Briefcase,
      title: 'Work Opportunities',
      body:
        country.workInfo ||
        'Growing job markets across key industries. We help you understand work permit requirements and pathways.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {country.name} — Visa, Study & Work Guidance | {APP_NAME}
        </title>
        <meta
          name="description"
          content={`Explore visa options, study and work opportunities in ${country.name}. Get personalised guidance from experienced consultants.`}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={country.heroImage}
            alt={country.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/70" />
        </div>
        <div className="relative container-page py-14 lg:py-20">
          <div className="mb-6 text-navy-200">
            <Breadcrumbs
              items={[
                { label: 'Countries', path: '/countries' },
                { label: country.name },
              ]}
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl sm:text-5xl" aria-hidden="true">
              {country.flag}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {country.name}
            </h1>
          </div>
          <p className="mt-4 text-navy-100/85 text-base sm:text-lg max-w-2xl leading-relaxed">
            {country.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {country.visaTypes?.map((vt) => (
              <span
                key={vt}
                className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white"
              >
                {vt}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
              Talk to a {country.name} Consultant
            </Button>
          </div>
        </div>
      </section>

      {/* Quick facts strip */}
      <BreadcrumbJsonLd
  items={[
    { label: 'Countries', path: '/countries' },
    { label: country.name, path: `/countries/${country.slug}` },
  ]}
/>
      {facts.length > 0 && (
        <section className="bg-white border-b border-navy-100">
          <div className="container-page py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {facts.slice(0, 6).map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-royal-50 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-royal-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] uppercase tracking-wider text-navy-400 font-semibold">
                        {f.label}
                      </p>
                      <p className="text-sm font-semibold text-navy-900 mt-0.5 truncate">
                        {f.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Overview + Opportunities */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-5">
              Country Overview
            </h2>
            <p className="text-navy-600 leading-relaxed">
              {country.description ||
                `${country.name} is a popular destination for international students and professionals.`}
            </p>

            <div className="mt-10 space-y-6">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="flex gap-4 p-6 rounded-2xl bg-cream-50 border border-navy-100"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-royal-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-royal-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-navy-900 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-navy-500 leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-white border border-navy-100 shadow-card p-7">
              <h3 className="font-display text-lg font-bold text-navy-900 mb-4">
                Ready to start?
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed mb-6">
                Want to know if {country.name} is suitable for your profile? Talk to a
                consultant for guidance.
              </p>
              <div className="space-y-3">
                {[
                  'Personalised profile assessment',
                  'Country-specific requirement list',
                  'Step-by-step application support',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-navy-600">{item}</span>
                  </div>
                ))}
              </div>
              <Button to="/contact" variant="accent" size="lg" className="w-full mt-7">
                Book Free Consultation
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Requirements & Process */}
      <section className="section-padding bg-cream-50">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-navy-100 shadow-soft">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-royal-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-royal-600" />
              </div>
              <h2 className="font-display text-xl font-bold text-navy-900">
                Typical Requirements
              </h2>
            </div>
            <ul className="space-y-3">
              {(
                country.requirements || [
                  'Valid passport with sufficient validity',
                  'Proof of financial capacity',
                  'Academic or professional records (as applicable)',
                  'Statement of purpose / cover letter',
                  'Supporting documents per visa type',
                ]
              ).map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-navy-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal-500 mt-2 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-navy-100 shadow-soft">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="font-display text-xl font-bold text-navy-900">
                Application Process
              </h2>
            </div>
            <ol className="space-y-4">
              {(
                country.process || [
                  'Free consultation and profile review',
                  'Select the most suitable visa category',
                  'Prepare and verify documents',
                  'Submit the application correctly',
                  'Track progress and respond to requests',
                ]
              ).map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-navy-600 pt-0.5">{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-page max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </div>
          <div className="mb-5">
  <DifficultyGauge slug={country.slug} />
</div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-20">
        <div className="container-page">
          <div className="rounded-[2rem] bg-gradient-to-br from-navy-900 to-navy-800 px-7 py-14 sm:px-12 lg:px-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.22),transparent_55%)]" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight text-balance">
                Want to know if {country.name} is suitable for your profile?
              </h2>
              <p className="mt-4 text-navy-100/80">
                Get guidance from a consultant who understands {country.name} requirements.
              </p>
              <Button
                to="/contact"
                variant="white"
                size="lg"
                className="mt-8"
                iconRight={ArrowRight}
              >
                Talk to a {country.name} Consultant
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}