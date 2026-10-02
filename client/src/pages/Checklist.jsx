import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Printer, Save, Sparkles } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import { Select } from '../components/ui/Input.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { fetchCountries } from '../services/contentService.js';
import { APP_NAME, VISA_TYPES } from '../utils/constants.js';

const BASE_CHECKLIST = {
  common: [
    'Valid passport (minimum 6 months validity)',
    'Passport-size photographs to country specification',
    'Completed visa application form',
    'Proof of financial capacity',
    'Police clearance certificate',
  ],
  'Study Visa': [
    'Academic transcripts and certificates',
    'English proficiency test scores (IELTS/TOEFL/PTE)',
    'Statement of Purpose (SOP)',
    'Letters of recommendation',
    'University offer letter',
    'Proof of tuition payment',
    'Gap year explanation (if applicable)',
  ],
  'Work Permit': [
    'Updated CV / résumé',
    'Job offer letter from employer',
    'Educational and professional certificates',
    'Employment references from previous roles',
    'Medical examination report',
  ],
  'Work Visa': [
    'Updated CV / résumé',
    'Employment contract or job offer letter',
    'Educational and professional certificates',
    'Employment references',
    'Medical examination report',
  ],
  'Tourist Visa': [
    'Travel itinerary and flight bookings',
    'Hotel reservations or host invitation letter',
    'Travel insurance',
    'Bank statements (last 3–6 months)',
    'Employment or business proof',
  ],
  'Visitor Visa': [
    'Travel itinerary',
    'Hotel reservations or host invitation',
    'Travel insurance',
    'Bank statements',
    'Employment or business proof',
  ],
  'PR Guidance': [
    'Educational credential assessment (ECA)',
    'Language test results',
    'Detailed work experience evidence',
    'Proof of funds',
    'Birth / marriage certificates (as applicable)',
  ],
  'Immigration / PR': [
    'Educational credential assessment',
    'Language test results',
    'Work experience evidence',
    'Proof of funds',
    'Birth / marriage certificates',
  ],
  'University Admission': [
    'Academic transcripts',
    'English proficiency test scores',
    'Statement of Purpose',
    'Letters of recommendation',
    'Portfolio (for specific programs)',
  ],
  'Documentation Assistance': [
    'Personal identification documents',
    'Academic certificates',
    'Financial statements',
    'Employment records',
  ],
};

export default function Checklist() {
  const toast = useToast();
  const { updateProfile, profile } = useProfile();
  const [countries, setCountries] = useState([]);
  const [countrySlug, setCountrySlug] = useState('');
  const [visaType, setVisaType] = useState('');
  const [checked, setChecked] = useState({});

  useEffect(() => {
    fetchCountries().then(setCountries);
    if (profile.savedChecklist) {
      setCountrySlug(profile.savedChecklist.countrySlug || '');
      setVisaType(profile.savedChecklist.visaType || '');
      setChecked(profile.savedChecklist.checked || {});
    }
  }, []); // eslint-disable-line

  const country = useMemo(
    () => countries.find((c) => c.slug === countrySlug),
    [countries, countrySlug]
  );

  const items = useMemo(() => {
    if (!visaType) return [];
    const common = BASE_CHECKLIST.common;
    const specific = BASE_CHECKLIST[visaType] || [];
    return [...common, ...specific];
  }, [visaType]);

  const toggleItem = (item) =>
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));

  const completed = items.filter((i) => checked[i]).length;
  const progress = items.length ? Math.round((completed / items.length) * 100) : 0;

  const save = () => {
    updateProfile({ savedChecklist: { countrySlug, visaType, checked } });
    toast.success('Checklist saved. It will be here when you return.');
  };

  return (
    <>
      <Helmet>
        <title>Document Checklist — {APP_NAME}</title>
        <meta
          name="description"
          content="Generate a personalised document checklist for your visa application."
        />
      </Helmet>

      <PageHero
        eyebrow="Free Tool"
        title="Your Document Checklist"
        description="Pick your destination and visa type — we’ll build a checklist you can print or save."
        breadcrumbs={[{ label: 'Checklist' }]}
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page max-w-3xl">
          <div className="rounded-3xl bg-white border border-navy-100 shadow-soft p-6 sm:p-8 print:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Destination Country"
                value={countrySlug}
                onChange={(e) => setCountrySlug(e.target.value)}
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </Select>
              <Select
                label="Visa Type"
                value={visaType}
                onChange={(e) => setVisaType(e.target.value)}
              >
                <option value="">Select visa type</option>
                {VISA_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>

            {items.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => window.print()} variant="accent" icon={Printer}>
                  Print Checklist
                </Button>
                <Button onClick={save} variant="secondary" icon={Save}>
                  Save Progress
                </Button>
              </div>
            )}
          </div>

          {items.length > 0 ? (
            <div className="mt-8 rounded-3xl bg-white border border-navy-100 shadow-soft overflow-hidden">
              <div className="px-6 sm:px-8 py-6 border-b border-navy-100 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
                <div className="flex items-center gap-2 mb-2 print:hidden">
                  <Sparkles className="w-4 h-4 text-teal-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-royal-200">
                    Personalised Checklist
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold">
                  {country?.flag} {country?.name} — {visaType}
                </h2>
                <p className="mt-1 text-sm text-navy-200">
                  {items.length} items · {completed} completed
                </p>
              </div>

              <div className="px-6 sm:px-8 pt-6 print:hidden">
                <div className="flex items-center justify-between mb-2 text-xs font-semibold text-navy-400">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-royal-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-cream-50 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!checked[item]}
                          onChange={() => toggleItem(item)}
                          className="sr-only"
                        />
                        <span
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            checked[item]
                              ? 'bg-teal-500 border-teal-500'
                              : 'border-navy-200'
                          }`}
                        >
                          {checked[item] && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          )}
                        </span>
                        <span
                          className={`text-sm ${
                            checked[item]
                              ? 'text-navy-400 line-through'
                              : 'text-navy-700'
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 sm:px-8 py-5 border-t border-navy-100 text-[0.7rem] text-navy-400 leading-relaxed">
                Requirements vary by personal circumstances. This checklist is a general
                guide only. Your consultant will provide a country- and profile-specific
                checklist during your consultation.
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-navy-200 bg-white p-10 text-center">
              <p className="text-sm text-navy-400">
                Select a country and visa type to generate your checklist.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}