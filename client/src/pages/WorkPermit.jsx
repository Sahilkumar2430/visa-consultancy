import { Helmet } from 'react-helmet-async';
import { Briefcase, Globe2, TrendingUp, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import InfoCard from '../components/shared/InfoCard.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import Button from '../components/ui/Button.jsx';
import { APP_NAME } from '../utils/constants.js';

const benefits = [
  { icon: TrendingUp, title: 'Career Growth', desc: 'Gain international experience and expand your professional network.' },
  { icon: Globe2, title: 'Global Opportunities', desc: 'Access job markets across multiple countries and industries.' },
  { icon: Briefcase, title: 'Family Options', desc: 'Some permits allow dependents to accompany you.' },
  { icon: FileText, title: 'Pathway to PR', desc: 'Certain work permits lead to permanent residency.' },
];

const steps = [
  { title: 'Consultation', desc: 'Discuss your goals and evaluate work visa options.' },
  { title: 'Country Selection', desc: 'Identify destinations that match your skills.' },
  { title: 'Job Offer (if needed)', desc: 'Some countries require a job offer before applying.' },
  { title: 'Document Preparation', desc: 'Prepare professional and personal documents.' },
  { title: 'Application Submission', desc: 'Submit the work permit application accurately.' },
  { title: 'Decision & Relocation', desc: 'Await decision and plan your move abroad.' },
];

const documents = [
  'Valid passport',
  'Updated CV / résumé',
  'Educational and professional certificates',
  'Employment references',
  'Job offer letter (where applicable)',
  'Police clearance certificate',
  'Medical examination report',
  'Passport-size photographs',
];

export default function WorkPermit() {
  return (
    <>
      <Helmet>
        <title>Work Permit Guidance — {APP_NAME}</title>
        <meta
          name="description"
          content="Professional assistance for international employment and work permit applications. Explore work visa pathways and documentation support."
        />
      </Helmet>

      <PageHero
        eyebrow="Work Permit"
        title="Work Abroad With Clear Guidance"
        description="Whether you have a job offer or are exploring options, we help you understand work visa pathways and prepare a strong application."
        breadcrumbs={[{ label: 'Work Permit' }]}
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
      >
        <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
          Get Work Visa Guidance
        </Button>
      </PageHero>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Why Work Abroad
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Build Your Career Internationally
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

      {/* Process */}
      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Our Process
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900">
              How We Help You Work Abroad
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="p-6 rounded-2xl bg-white border border-navy-100 hover:border-royal-200 hover:shadow-card transition-all"
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
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Documents
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Commonly Required Documents
            </h2>
            <p className="mt-5 text-navy-500 leading-relaxed">
              Requirements vary by country and visa category. We help you build a complete,
              well-organised application file.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documents.map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-navy-100"
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
        title="Looking for work opportunities abroad?"
        description="Speak with a consultant to understand work visa options based on your profile."
        buttonLabel="Get Work Visa Guidance"
      />
    </>
  );
}