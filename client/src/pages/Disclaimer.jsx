import { Helmet } from 'react-helmet-async';
import PageHero from '../components/shared/PageHero.jsx';
import { APP_NAME, DISCLAIMER_TEXT } from '../utils/constants.js';

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer — {APP_NAME}</title>
      </Helmet>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="Important information about the limits of our services and website content."
        breadcrumbs={[{ label: 'Disclaimer' }]}
      />
      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl prose-custom space-y-6">
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-900 font-medium leading-relaxed">
              {DISCLAIMER_TEXT}
            </p>
          </div>
          <h2 className="font-display text-xl font-bold text-navy-900">No Guarantee</h2>
          <p>
            We do not guarantee visa approval or any specific outcome. All visa decisions are
            made by the relevant government and immigration authorities.
          </p>
          <h2 className="font-display text-xl font-bold text-navy-900">
            Information Accuracy
          </h2>
          <p>
            Visa rules, requirements and processing times change frequently. Content on this
            website is for general information only and should not be considered legal advice.
          </p>
          <h2 className="font-display text-xl font-bold text-navy-900">Not Legal Advice</h2>
          <p>
            Our guidance is not a substitute for advice from a licensed immigration lawyer or
            official sources. Always verify information with the relevant authorities.
          </p>
        </div>
      </section>
    </>
  );
}