import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import MultiStepForm from '../components/forms/MultiStepForm.jsx';
import { APP_NAME } from '../utils/constants.js';

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (000) 000-0000',
    href: 'tel:+10000000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@globalpath.demo',
    href: 'mailto:hello@globalpath.demo',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (000) 000-0000',
    href: 'https://wa.me/10000000000',
  },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us — {APP_NAME}</title>
        <meta
          name="description"
          content="Get in touch with our visa consultants. Book a free consultation for study, work, tourist visas and immigration guidance."
        />
      </Helmet>

      <PageHero
        eyebrow="Contact"
        title="Let’s Start Your Journey"
        description="Share a few details and our consultant will get back to you — usually within one business day."
        breadcrumbs={[{ label: 'Contact' }]}
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-navy-100 shadow-soft">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-5">
                Contact Information
              </h2>
              <div className="space-y-5">
                {contactItems.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-royal-50 group-hover:bg-royal-500 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-royal-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                          {c.label}
                        </p>
                        <p className="text-sm font-semibold text-navy-900 mt-1">{c.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-navy-100 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Office
                  </p>
                  <p className="text-sm text-navy-700 mt-1 leading-relaxed">
                    123 Consultancy Avenue, Suite 400
                    <br />
                    Demo City, 00000
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Business Hours
                  </p>
                  <p className="text-sm text-navy-700 mt-1 leading-relaxed">
                    Mon–Fri: 9:00 AM – 6:00 PM
                    <br />
                    Sat: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden border border-navy-100 shadow-soft">
              <iframe
                title="Office location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.50%2C-0.10%2C51.52&layer=mapnik"
                className="w-full h-56 grayscale-[35%]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                Consultation Request
              </h2>
              <p className="mt-2 text-navy-500 text-sm">
                Complete the form below. It takes about a minute.
              </p>
            </div>
            <MultiStepForm />
          </div>
        </div>
      </section>
    </>
  );
}