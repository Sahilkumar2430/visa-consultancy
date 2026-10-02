import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, FileText, Users, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import FAQAccordion from '../components/shared/FAQAccordion.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import Button from '../components/ui/Button.jsx';
import { fetchServices, fetchFAQs } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

/* ============================================================
 * Optional rich detail data per service slug.
 * If a slug isn't here, the page still renders using sensible defaults.
 * ============================================================ */
const serviceDetails = {
  'study-visa': {
    hero: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80',
    who: [
      'High school graduates planning undergraduate studies',
      'Graduates seeking master’s or doctoral programs',
      'Professionals pursuing further education abroad',
      'Students exploring exchange or diploma programs',
    ],
    process: [
      'Free consultation and profile assessment',
      'Shortlist countries and universities',
      'Prepare admission applications',
      'Receive offer letter and pay tuition deposit',
      'Prepare financial and academic documents',
      'Submit study visa application',
      'Attend interview if required',
      'Await decision and prepare for travel',
    ],
    docs: [
      'Valid passport (minimum 6 months validity)',
      'Academic transcripts and certificates',
      'English proficiency test scores (IELTS/TOEFL/PTE)',
      'Statement of Purpose (SOP)',
      'Letters of recommendation',
      'Proof of funds / financial documents',
      'Offer letter from the institution',
      'Passport-size photographs',
    ],
    benefits: [
      'Access to quality education and global exposure',
      'Post-study work opportunities in many countries',
      'Pathway to long-term residency in some destinations',
      'International networking and career growth',
    ],
  },

  'work-permit': {
    hero: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1920&q=80',
    who: [
      'Skilled professionals seeking overseas employment',
      'Workers with a job offer abroad',
      'Individuals exploring job-seeker visa options',
      'Those considering intra-company transfers',
    ],
    process: [
      'Consultation and eligibility review',
      'Identify suitable countries and visa categories',
      'Prepare professional profile (CV, references)',
      'Secure job offer (where required)',
      'Employer files labour market paperwork if required',
      'Submit work permit application',
      'Attend medical / biometrics if required',
      'Await decision and plan relocation',
    ],
    docs: [
      'Valid passport',
      'Updated CV / résumé',
      'Educational and professional certificates',
      'Employment references',
      'Job offer letter (if applicable)',
      'Police clearance certificate',
      'Medical examination report',
      'Passport-size photographs',
    ],
    benefits: [
      'International work experience',
      'Competitive salary and benefits in many countries',
      'Family accompaniment options',
      'Pathway to permanent residency in some destinations',
    ],
  },

  'tourist-visa': {
    hero: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
    who: [
      'Travelers visiting family or friends abroad',
      'Tourists planning short-term holidays',
      'Individuals attending events or conferences',
      'Business visitors on short trips',
    ],
    process: [
      'Discuss travel purpose and destination',
      'Determine correct visa category',
      'Prepare itinerary and supporting documents',
      'Complete application form accurately',
      'Submit application and biometrics if required',
      'Attend interview if requested',
      'Receive decision and prepare for travel',
    ],
    docs: [
      'Valid passport',
      'Completed visa application form',
      'Recent photographs as per specification',
      'Travel itinerary and flight bookings',
      'Hotel reservations or host invitation',
      'Proof of funds (bank statements)',
      'Employment / business proof',
      'Travel insurance (where required)',
    ],
    benefits: [
      'Explore new destinations with confidence',
      'Reunite with family and friends',
      'Attend business or academic events',
      'Build international travel history',
    ],
  },

  'pr-immigration': {
    hero: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&q=80',
    who: [
      'Professionals seeking long-term settlement',
      'Families planning to relocate abroad',
      'Individuals eligible for skilled migration',
      'Those exploring investment or business routes',
    ],
    process: [
      'Detailed consultation and eligibility check',
      'Determine suitable immigration pathway',
      'Prepare for language and skills assessments',
      'Submit Expression of Interest (where applicable)',
      'Receive invitation to apply',
      'Compile and submit full application',
      'Medical, police and biometrics',
      'Receive decision and prepare for relocation',
    ],
    docs: [
      'Valid passport',
      'Educational credential assessments',
      'Language test results',
      'Work experience evidence',
      'Proof of funds',
      'Police clearance certificates',
      'Medical examination reports',
      'Birth / marriage certificates (as applicable)',
    ],
    benefits: [
      'Permanent residency status in some destinations',
      'Access to public services and healthcare',
      'Pathway to citizenship in some cases',
      'Long-term stability for you and your family',
    ],
  },

  'university-admission': {
    hero: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80',
    who: [
      'Students applying to international universities',
      'Applicants unsure about program selection',
      'Those needing help with application materials',
      'Scholarship-seeking students',
    ],
    process: [
      'Understand academic background and goals',
      'Shortlist universities and programs',
      'Prepare application documents',
      'Draft SOP and gather recommendations',
      'Submit applications before deadlines',
      'Track offers and compare options',
      'Accept offer and prepare for visa application',
    ],
    docs: [
      'Academic transcripts and certificates',
      'English proficiency test scores',
      'Statement of Purpose',
      'Letters of recommendation',
      'CV / résumé (for postgraduate)',
      'Portfolio (for specific programs)',
      'Passport copy',
      'Financial documents (for visa stage)',
    ],
    benefits: [
      'Access to a wide range of international programs',
      'Guidance on scholarship opportunities',
      'Better program-profile match',
      'Smooth transition to visa application',
    ],
  },

  'documentation-assistance': {
    hero: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80',
    who: [
      'Applicants unsure which documents are needed',
      'Those needing help organising paperwork',
      'Applicants with complex document histories',
      'Anyone wanting a professional review before submission',
    ],
    process: [
      'Review your destination and visa type',
      'Provide a personalised document checklist',
      'Assist with formatting and translation guidance',
      'Review documents for completeness',
      'Advise on attestation / apostille where needed',
      'Organise documents for submission',
    ],
    docs: [
      'Personal identification documents',
      'Academic and professional certificates',
      'Financial statements',
      'Employment / business records',
      'Family / civil documents (as applicable)',
    ],
    benefits: [
      'Avoid common mistakes that delay applications',
      'Clear, organised submission-ready file',
      'Guidance on attestation and translation',
      'Peace of mind during the process',
    ],
  },
};

/* ============================================================
 * Slug alias mapping — handles both kinds of URLs you might use:
 *   /services/tourist-visa
 *   /services/pr-immigration
 * and any synonyms coming from the footer.
 * ============================================================ */
const SLUG_ALIASES = {
  'tourist-visa': 'tourist-visa',
  'visitor-visa': 'tourist-visa',
  'pr-immigration': 'pr-immigration',
  'pr-guidance': 'pr-immigration',
  immigration: 'pr-immigration',
  'pr-visa': 'pr-immigration',
  'study-visa': 'study-visa',
  'work-permit': 'work-permit',
  'university-admission': 'university-admission',
  admission: 'university-admission',
  'documentation-assistance': 'documentation-assistance',
  documentation: 'documentation-assistance',
};

/** Default content used if a service slug has no detail entry. */
const defaultDetail = {
  hero: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80',
  who: [
    'Individuals planning to move or travel abroad',
    'Anyone seeking guidance on their options',
    'Applicants needing document support',
  ],
  process: [
    'Free consultation and profile review',
    'Discuss suitable countries and visa categories',
    'Prepare required documents',
    'Submit application correctly',
    'Track progress until decision',
  ],
  docs: [
    'Valid passport',
    'Proof of purpose (admission, job offer, invitation, etc.)',
    'Financial documents',
    'Supporting identity documents',
  ],
  benefits: [
    'Personalised guidance based on your profile',
    'Structured document preparation',
    'Ongoing support throughout the process',
  ],
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    Promise.all([fetchServices(), fetchFAQs()])
      .then(([services, f]) => {
        if (!active) return;

        // Resolve slug through alias map
        const resolvedSlug = SLUG_ALIASES[slug] || slug;

        // Find matching service by slug (try raw, then resolved)
        const found =
          services.find((s) => s.slug === slug) ||
          services.find((s) => s.slug === resolvedSlug) ||
          null;

        if (!found) {
          setNotFound(true);
        } else {
          // Store the service along with a resolved detail key
          setService({ ...found, _detailKey: resolvedSlug });
        }
        setFaqs(Array.isArray(f) ? f.slice(0, 5) : []);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="container-page py-20 space-y-6">
        <div className="skeleton h-64 rounded-3xl" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    );
  }

  /* ---------- Not found ---------- */
  if (notFound || !service) {
    return (
      <>
        <Helmet>
          <title>Service Not Found — {APP_NAME}</title>
        </Helmet>
        <div className="container-page py-20">
          <ErrorState
            title="Service not found"
            description="The service you’re looking for doesn’t exist or has been moved."
          />
          <div className="mt-8 text-center">
            <Button to="/services" variant="accent">
              Back to Services
            </Button>
          </div>
        </div>
      </>
    );
  }

  /* ---------- Found ---------- */
  const detail = serviceDetails[service._detailKey] || defaultDetail;
  const Icon = Icons[service.icon] || Icons.Sparkles;

  return (
    <>
      <Helmet>
        <title>
          {service.title} — {APP_NAME}
        </title>
        <meta
          name="description"
          content={service.shortDescription || `Professional guidance for ${service.title}.`}
        />
      </Helmet>

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: service.title },
        ]}
        image={detail.hero}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" variant="accent" size="lg" iconRight={ArrowRight}>
            Book Free Consultation
          </Button>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-royal-50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-royal-600" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                Overview
              </h2>
            </div>
            <p className="text-navy-600 leading-relaxed">
              {service.shortDescription} Our consultants guide you through each step with a
              clear process and personalised support — from your first consultation to the
              final decision.
            </p>

            {detail.who && detail.who.length > 0 && (
              <>
                <h3 className="mt-10 font-display text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-royal-600" />
                  Who This Is For
                </h3>
                <ul className="space-y-2.5">
                  {detail.who.map((w) => (
                    <li key={w} className="flex items-start gap-3 text-navy-600">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-cream-50 border border-navy-100 p-7">
              <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                Get Personalised Guidance
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed mb-5">
                Speak with a consultant to discuss your profile and options — no obligation.
              </p>
              <Button to="/contact" variant="accent" className="w-full">
                Request Consultation
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Process */}
      {detail.process && detail.process.length > 0 && (
        <section className="section-padding bg-cream-50">
          <div className="container-page">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
                Process
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900">
                How It Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {detail.process.map((step, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-navy-100 hover:border-royal-200 hover:shadow-card transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-sm text-navy-700 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Documents + Benefits */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-8">
          {detail.docs && detail.docs.length > 0 && (
            <div className="p-7 sm:p-9 rounded-3xl bg-cream-50 border border-navy-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-royal-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-royal-600" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy-900">
                  Typical Documents Required
                </h2>
              </div>
              <ul className="space-y-3">
                {detail.docs.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-500 mt-2 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-navy-400 italic">
                Requirements vary by country and personal circumstances. We provide a
                personalised checklist after assessing your profile.
              </p>
            </div>
          )}

          {detail.benefits && detail.benefits.length > 0 && (
            <div className="p-7 sm:p-9 rounded-3xl bg-cream-50 border border-navy-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy-900">Key Benefits</h2>
              </div>
              <ul className="space-y-3">
                {detail.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding bg-cream-50">
          <div className="container-page max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
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
                Ready to get started with {service.title}?
              </h2>
              <p className="mt-4 text-navy-100/80">
                Book a free consultation and we’ll guide you through your options.
              </p>
              <Button
                to="/contact"
                variant="white"
                size="lg"
                className="mt-8"
                iconRight={ArrowRight}
              >
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}