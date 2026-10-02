import api from './api.js';

/* ============================================================
 * DEMO DATA (final fallback only)
 * ============================================================ */

export const demoStats = [
  { _id: 's1', label: 'Clients Assisted', value: 5000, suffix: '+', icon: 'Users' },
  { _id: 's2', label: 'Countries Covered', value: 15, suffix: '+', icon: 'Globe' },
  { _id: 's3', label: 'Years Experience', value: 10, suffix: '+', icon: 'Award' },
  { _id: 's4', label: 'Applications Supported', value: 12000, suffix: '+', icon: 'FileCheck' },
];

export const demoCountries = [
  { _id: 'c1', name: 'Canada', slug: 'canada', flag: '🇨🇦', heroImage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80', description: 'A leading destination for study, work and permanent residency.', visaTypes: ['Study Visa', 'Work Permit', 'PR Guidance'], isFeatured: true },
  { _id: 'c2', name: 'Australia', slug: 'australia', flag: '🇦🇺', heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80', description: 'World-class education and strong post-study work opportunities.', visaTypes: ['Study Visa', 'Work Permit', 'PR Guidance'], isFeatured: true },
  { _id: 'c3', name: 'United Kingdom', slug: 'uk', flag: '🇬🇧', heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', description: 'Globally recognised universities and a rich cultural experience.', visaTypes: ['Study Visa', 'Work Visa', 'Visitor Visa'], isFeatured: true },
  { _id: 'c4', name: 'USA', slug: 'usa', flag: '🇺🇸', heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80', description: 'A top choice for higher education and career growth.', visaTypes: ['Study Visa', 'Work Visa', 'Visitor Visa'], isFeatured: true },
  { _id: 'c5', name: 'Germany', slug: 'germany', flag: '🇩🇪', heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80', description: 'Affordable education and a thriving job market in Europe.', visaTypes: ['Study Visa', 'Job Seeker Visa', 'Work Permit'], isFeatured: true },
  { _id: 'c6', name: 'New Zealand', slug: 'new-zealand', flag: '🇳🇿', heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', description: 'Quality of life, education and immigration pathways.', visaTypes: ['Study Visa', 'Work Permit', 'PR Guidance'], isFeatured: true },
  { _id: 'c7', name: 'Ireland', slug: 'ireland', flag: '🇮🇪', heroImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80', description: 'A fast-growing tech hub with excellent education.', visaTypes: ['Study Visa', 'Work Permit'], isFeatured: false },
  { _id: 'c8', name: 'France', slug: 'france', flag: '🇫🇷', heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', description: 'Prestigious institutions and a vibrant student life.', visaTypes: ['Study Visa', 'Visitor Visa'], isFeatured: false },
  { _id: 'c9', name: 'Dubai / UAE', slug: 'dubai-uae', flag: '🇦🇪', heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', description: 'A global business hub with growing career opportunities.', visaTypes: ['Work Visa', 'Business Visa', 'Visitor Visa'], isFeatured: false },
];

export const demoServices = [
  { _id: 'sv1', title: 'Study Visa', slug: 'study-visa', icon: 'GraduationCap', shortDescription: 'Complete guidance for studying abroad, from university selection to visa application.' },
  { _id: 'sv2', title: 'Work Permit', slug: 'work-permit', icon: 'Briefcase', shortDescription: 'Professional assistance for international employment and work permit applications.' },
  { _id: 'sv3', title: 'Tourist Visa', slug: 'tourist-visa', icon: 'Plane', shortDescription: 'Guidance for visiting family, exploring destinations and short-term travel.' },
  { _id: 'sv4', title: 'PR & Immigration', slug: 'pr-immigration', icon: 'Home', shortDescription: 'Understand immigration pathways and long-term settlement options.' },
  { _id: 'sv5', title: 'University Admission', slug: 'university-admission', icon: 'School', shortDescription: 'Find suitable universities and programs based on your goals.' },
  { _id: 'sv6', title: 'Documentation Assistance', slug: 'documentation-assistance', icon: 'FileText', shortDescription: 'Get organized with professional document and application guidance.' },
];

export const demoTestimonials = [
  { _id: 't1', name: 'Sample Client A', country: 'Australia', visaType: 'Study Visa', rating: 5, content: 'The team guided me through every step of my study visa application. Clear communication and helpful document support throughout the process.', avatar: 'https://i.pravatar.cc/120?img=12', isSample: true },
  { _id: 't2', name: 'Sample Client B', country: 'Canada', visaType: 'Work Permit', rating: 5, content: 'Professional and transparent. They explained my options honestly and helped me prepare a strong application.', avatar: 'https://i.pravatar.cc/120?img=32', isSample: true },
  { _id: 't3', name: 'Sample Client C', country: 'United Kingdom', visaType: 'University Admission', rating: 5, content: 'They helped me shortlist universities that matched my profile and budget. The entire experience felt personal and well organized.', avatar: 'https://i.pravatar.cc/120?img=45', isSample: true },
];

export const demoFAQs = [
  { _id: 'f1', question: 'How long does a visa application take?', answer: 'Processing times vary by country and visa type — typically a few weeks to several months. During your consultation, we share current estimated timelines for your destination.' },
  { _id: 'f2', question: 'What documents are required?', answer: 'Requirements differ by country and visa type, but commonly include a valid passport, financial documents, academic records, and proof of purpose. We provide a personalised checklist after assessing your profile.' },
  { _id: 'f3', question: 'Which country is suitable for my profile?', answer: 'This depends on your education, work experience, budget, and goals. Our consultants assess your profile and recommend destinations that align with your objectives.' },
  { _id: 'f4', question: 'Can I apply for a work permit without a job offer?', answer: 'Some countries offer job-seeker or open work permits, while others require a job offer. We can explain the options available for your target country.' },
  { _id: 'f5', question: 'How does the consultation process work?', answer: 'You book a free consultation, we review your profile, then provide guidance on suitable countries and visa pathways. There is no obligation to proceed.' },
  { _id: 'f6', question: 'What happens after submitting the enquiry?', answer: 'A consultant reviews your details and contacts you using your preferred method — usually within one business day — to schedule your consultation.' },
  { _id: 'f7', question: 'How much does consultation cost?', answer: 'Your initial consultation is free. Any service fees are explained transparently before you decide to proceed.' },
  { _id: 'f8', question: 'Can you help with university admission?', answer: 'Yes. We assist with shortlisting universities, reviewing applications, and preparing admission documentation based on your academic profile.' },
];

/* ============================================================
 * REST Countries API transforms
 * ============================================================ */

const FEATURED_COUNTRIES = ['Canada', 'Australia', 'United Kingdom', 'United States', 'Germany', 'New Zealand'];

const DISPLAY_NAME_OVERRIDES = {
  'United States': 'USA',
  'United Arab Emirates': 'Dubai / UAE',
  Czechia: 'Czech Republic',
  'Russian Federation': 'Russia',
  'Korea (Republic of)': 'South Korea',
  'Viet Nam': 'Vietnam',
  'Bolivia (Plurinational State of)': 'Bolivia',
  'Venezuela (Bolivarian Republic of)': 'Venezuela',
  'Iran (Islamic Republic of)': 'Iran',
  'Tanzania, United Republic of': 'Tanzania',
  'Moldova (Republic of)': 'Moldova',
  'Syrian Arab Republic': 'Syria',
  "Lao People's Democratic Republic": 'Laos',
  'Congo (the Democratic Republic of the)': 'DR Congo',
  Congo: 'Republic of the Congo',
  "Côte d'Ivoire": 'Ivory Coast',
  'Cabo Verde': 'Cape Verde',
  Türkiye: 'Turkey',
  'Brunei Darussalam': 'Brunei',
  'Timor-Leste': 'East Timor',
};

const SLUG_OVERRIDES = {
  'United States': 'usa',
  'United Kingdom': 'uk',
  'United Arab Emirates': 'dubai-uae',
  Czechia: 'czech-republic',
  'Russian Federation': 'russia',
  'Korea (Republic of)': 'south-korea',
  'Viet Nam': 'vietnam',
  "Côte d'Ivoire": 'ivory-coast',
  'Cabo Verde': 'cape-verde',
  Türkiye: 'turkey',
  'Timor-Leste': 'east-timor',
};

function visaTypesFor(apiCountry) {
  const region = apiCountry.region || '';
  const name = apiCountry.name?.common || '';
  if (['Canada', 'Australia', 'New Zealand'].includes(name))
    return ['Study Visa', 'Work Permit', 'PR Guidance'];
  if (['United States', 'United Kingdom', 'Ireland'].includes(name))
    return ['Study Visa', 'Work Visa', 'Visitor Visa'];
  if (['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].includes(name))
    return ['Work Visa', 'Business Visa', 'Visitor Visa'];
  if (region === 'Europe') return ['Study Visa', 'Work Permit', 'Visitor Visa'];
  if (region === 'Americas') return ['Study Visa', 'Visitor Visa'];
  if (region === 'Asia') return ['Study Visa', 'Work Visa', 'Visitor Visa'];
  return ['Study Visa', 'Work Permit', 'Visitor Visa'];
}

function transformApiCountry(apiCountry) {
  const rawName = apiCountry.name?.common || apiCountry.name?.official || '';
  if (!rawName) return null;

  const displayName = DISPLAY_NAME_OVERRIDES[rawName] || rawName;
  const slug =
    SLUG_OVERRIDES[rawName] ||
    rawName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  const fallbackHero = demoCountries.find((c) => c.slug === slug)?.heroImage;
  const heroImage = fallbackHero || apiCountry.flags?.png || '';

  return {
    _id: apiCountry.cca2 || apiCountry.cca3 || slug,
    name: displayName,
    slug,
    flag: apiCountry.flag || '🏳️',
    heroImage,
    description:
      demoCountries.find((c) => c.slug === slug)?.description ||
      `Explore visa options, study and work opportunities in ${displayName}.`,
    visaTypes: visaTypesFor(apiCountry),
    isFeatured: FEATURED_COUNTRIES.includes(rawName),
    region: apiCountry.region || '',
    subregion: apiCountry.subregion || '',
    capital: apiCountry.capital?.[0] || '',
    population: apiCountry.population || 0,
    currencies: apiCountry.currencies || {},
    languages: apiCountry.languages || {},
    timezones: apiCountry.timezones || [],
    callingCode: apiCountry.idd?.root
      ? `${apiCountry.idd.root}${apiCountry.idd.suffixes?.[0] || ''}`
      : '',
  };
}

function pickArray(responseData) {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  return null;
}

/* ============================================================
 * FETCHERS
 * ============================================================ */

export async function fetchCountries() {
  // 1. REST Countries API (all 250+ countries)
   // 1. Try backend proxy for REST Countries (bypasses CORS)
  try {
    const { data } = await api.get('/countries/external');
    const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : null;
    if (arr && arr.length) {
      const mapped = arr
        .map(transformApiCountry)
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));
      if (mapped.length) return mapped;
    }
  } catch (err) {
    console.warn('Backend countries proxy failed:', err.message);
  }

  // 2. Try backend's own countries collection (fallback)
  try {
    const { data } = await api.get('/countries');
    const list = pickArray(data);
    if (list && list.length) return list;
  } catch {}

  // 3. Final fallback — demo data
  return demoCountries;
}

export async function fetchCountryBySlug(slug) {
  try {
    const all = await fetchCountries();
    const found = all.find((c) => c.slug === slug);
    if (found) return found;
  } catch {}

  try {
    const { data } = await api.get(`/countries/${slug}`);
    const item = data?.data ?? data;
    if (item?.slug) return item;
  } catch {}

  return demoCountries.find((c) => c.slug === slug) || null;
}

export async function fetchServices() {
  try {
    const { data } = await api.get('/services');
    const list = pickArray(data);
    if (list && list.length) return list;
  } catch {}
  return demoServices;
}

export async function fetchTestimonials() {
  try {
    const { data } = await api.get('/testimonials');
    const list = pickArray(data);
    if (list && list.length) return list;
  } catch {}
  return demoTestimonials;
}

export async function fetchFAQs() {
  try {
    const { data } = await api.get('/faqs');
    const list = pickArray(data);
    if (list && list.length) return list;
  } catch {}
  return demoFAQs;
}

export async function fetchStats() {
  try {
    const { data } = await api.get('/statistics');
    const list = pickArray(data);
    if (list && list.length) return list;
  } catch {}
  return demoStats;
}

export async function submitLead(payload) {
  const { data } = await api.post('/leads', payload);
  return data;
}