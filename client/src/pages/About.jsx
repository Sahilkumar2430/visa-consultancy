import { Helmet } from 'react-helmet-async';
import { Target, Eye, Heart, Users, Award, ShieldCheck } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import InfoCard from '../components/shared/InfoCard.jsx';
import StatsCounter from '../components/shared/StatsCounter.jsx';
import CTABand from '../components/shared/CTABand.jsx';
import { APP_NAME } from '../utils/constants.js';
import { demoStats as stats } from '../services/contentService.js';

const values = [
  { icon: ShieldCheck, title: 'Integrity', desc: 'We give honest guidance and set clear expectations.' },
  { icon: Heart, title: 'Client First', desc: 'Your goals shape every recommendation we make.' },
  { icon: Users, title: 'Personalised Care', desc: 'Every client gets individual attention and support.' },
  { icon: Award, title: 'Excellence', desc: 'We hold ourselves to a high standard in every application.' },
];

const team = [
  {
    name: 'Sample Consultant 1',
    role: 'Senior Immigration Advisor',
    bio: 'Over a decade of experience guiding clients through study, work and immigration pathways.',
    avatar: 'https://i.pravatar.cc/200?img=12',
    isSample: true,
  },
  {
    name: 'Sample Consultant 2',
    role: 'Education & Admissions Specialist',
    bio: 'Helps students identify universities and programs that match their goals.',
    avatar: 'https://i.pravatar.cc/200?img=33',
    isSample: true,
  },
  {
    name: 'Sample Consultant 3',
    role: 'Work Visa Consultant',
    bio: 'Supports professionals exploring international employment and work permits.',
    avatar: 'https://i.pravatar.cc/200?img=68',
    isSample: true,
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — {APP_NAME}</title>
        <meta
          name="description"
          content="Learn about our visa consultancy — our mission, vision, values and experienced team guiding clients worldwide."
        />
      </Helmet>

      <PageHero
        eyebrow="About Us"
        title="Guidance You Can Rely On"
        description="We help individuals and families navigate the visa and immigration process with clarity, honesty and personalised support."
        breadcrumbs={[{ label: 'About' }]}
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
      />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Who We Are
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              A Consultancy Built Around People, Not Paperwork
            </h2>
            <div className="mt-6 space-y-4 text-navy-600 leading-relaxed">
              <p>
                GlobalPath Visa Consultancy was founded to make the visa and immigration
                process clearer and less stressful for individuals, students, professionals and
                families.
              </p>
              <p>
                We combine structured processes with personal attention. Every client is
                guided by a dedicated consultant who understands their goals and provides
                honest, practical advice.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80"
                alt="Consultancy team collaborating"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-cream-50">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-navy-100 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-royal-50 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-royal-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">Our Mission</h3>
            <p className="text-navy-500 leading-relaxed">
              To make global opportunities accessible by providing clear, honest and
              professional visa and immigration guidance to every client — regardless of
              destination.
            </p>
          </div>
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-navy-100 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">Our Vision</h3>
            <p className="text-navy-500 leading-relaxed">
              To be a trusted name in visa and immigration guidance — known for transparency,
              personal attention and consistent support throughout each client’s journey.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Our Values
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900">
              What Guides Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <InfoCard key={v.title} icon={v.icon} title={v.title} index={i}>
                {v.desc}
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-950 py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.12),transparent_60%)]" />
        <div className="relative container-page">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Our Track Record
            </h2>
            <p className="mt-3 text-sm text-navy-300 max-w-xl mx-auto">
              Figures are configurable from the admin panel and reflect verified data only.
            </p>
          </div>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-royal-600">
              Our Team
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Consultants Who Care
            </h2>
            <p className="mt-5 text-navy-500 leading-relaxed">
              Sample profiles shown for development. Real team members will be managed via the
              admin dashboard.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="p-7 rounded-3xl bg-white border border-navy-100 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="relative">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-cream-100"
                  />
                  {m.isSample && (
                    <span className="absolute -top-2 -left-2 text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      Sample
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">
                  {m.name}
                </h3>
                <p className="text-sm font-semibold text-royal-600 mt-1">{m.role}</p>
                <p className="mt-3 text-sm text-navy-500 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Have questions about your visa journey?"
        description="Talk to a consultant — we’re here to help you understand your options."
        buttonLabel="Book Free Consultation"
      />
    </>
  );
}