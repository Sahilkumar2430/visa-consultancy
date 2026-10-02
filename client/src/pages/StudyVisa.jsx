import { Helmet } from 'react-helmet-async';
import { GraduationCap, Globe2, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import InfoCard from '../components/shared/InfoCard.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import Button from '../components/ui/Button.jsx';
import { APP_NAME } from '../utils/constants.js';

const countries = [
  { name: 'Canada', flag: '🇨🇦', slug: 'canada' },
  { name: 'United Kingdom', flag: '🇬🇧', slug: 'uk' },
  { name: 'Australia', flag: '🇦🇺', slug: 'australia' },
  { name: 'USA', flag: '🇺🇸', slug: 'usa' },
  { name: 'Germany', flag: '🇩🇪', slug: 'germany' },
  { name: 'New Zealand', flag: '🇳🇿', slug: 'new-zealand' },
];

const steps = [
  { title: 'Profile Assessment', desc: 'We review your academic background, goals and budget.' },
  { title: 'Country & Course Selection', desc: 'Shortlist suitable countries and programs.' },
  { title: 'Admission Application', desc: 'Apply to universities and track offers.' },
  { title: 'Document Preparation', desc: 'Prepare financial, academic and identity documents.' },
  { title: 'Visa Application', desc: 'Complete and submit the study visa application.' },
  { title: 'Interview & Decision', desc: 'Attend interview if required, then await the decision.' },
];

const documents = [
  'Valid passport',
  'Academic transcripts and certificates',
  'English proficiency test scores (IELTS/TOEFL/PTE)',
  'Statement of Purpose (SOP)',
  'Letters of recommendation',
  'Proof of funds / financial documents',
  'University offer letter',
  'Passport-size photographs',
];

const benefits = [
  { icon: GraduationCap, title: 'World-Class Education', desc: 'Access internationally recognised programs and institutions.' },
  { icon: Globe2, title: 'Global Exposure', desc: 'Experience new cultures and build an international network.' },
  { icon: CheckCircle2, title: 'Post-Study Pathways', desc: 'Many countries offer work options after graduation.' },
  { icon: FileText, title: 'Structured Support', desc: 'Guidance for every document and application step.' },
];

export default function StudyVisa() {
  return (
    <>
      <Helmet>
        <title>Study Visa Guidance — {APP_NAME}</title>
        <meta
          name="description"
          content="Complete guidance for studying abroad — university selection, admission, documentation and study visa application support."
        />
      </Helmet>

      <PageHero
        eyebrow="Study Visa"
        title="Study Abroad With Confidence"
        description="From university selection to visa application — we guide students through every step of the study abroad journey."
        breadcrumbs={[{ label: 'Study Visa' }]}
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
      >
        <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
          Book Free Consultation
        </Button>
      </PageHero>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Why Study Abroad
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Opportunities Beyond Borders
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <InfoCard key={b.title} icon={b.icon} title={b.title} index={i}>
                {b.desc}
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Popular Destinations
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Where Students Choose to Study
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {countries.map((c) => (
              <a
                key={c.slug}
                href={`/countries/${c.slug}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-navy-100 hover:border-royal-200 hover:shadow-card transition-all duration-300 text-center"
              >
                <span className="text-3xl" aria-hidden="true">
                  {c.flag}
                </span>
                <span className="text-sm font-semibold text-navy-900 group-hover:text-royal-700">
                  {c.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Our Process
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Your Study Abroad Journey
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="p-6 rounded-2xl bg-cream-50 border border-navy-100 hover:border-royal-200 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding bg-cream-50">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Documents
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              What You’ll Typically Need
            </h2>
            <p className="mt-5 text-navy-500 leading-relaxed">
              Requirements vary by country and program. After assessing your profile, we share
              a personalised document checklist.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documents.map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-navy-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-navy-600">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to start your study abroad journey?"
        description="Talk to a consultant and get personalised guidance on countries, universities and visa options."
        buttonLabel="Get Study Visa Guidance"
      />
    </>
  );
}