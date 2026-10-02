/**
 * Seed script — populates MongoDB with demo/sample data.
 * Usage: npm run seed
 */
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { env } from '../config/env.js';
import User from '../models/User.js';
import Country from '../models/Country.js';
import Service from '../models/Service.js';
import FAQ from '../models/FAQ.js';
import Testimonial from '../models/Testimonial.js';
import TeamMember from '../models/TeamMember.js';
import Statistic from '../models/Statistic.js';
import ContactInfo from '../models/ContactInfo.js';

const ADMIN_EMAIL = 'admin@globalpath.demo';
const ADMIN_PASSWORD = 'AdminPass123!';

async function clearAll() {
  await Promise.all([
    User.deleteMany({}),
    Country.deleteMany({}),
    Service.deleteMany({}),
    FAQ.deleteMany({}),
    Testimonial.deleteMany({}),
    TeamMember.deleteMany({}),
    Statistic.deleteMany({}),
    ContactInfo.deleteMany({}),
  ]);
  console.log('🧹 Cleared existing data');
}

async function seedUsers() {
  const admin = await User.create({
    name: 'Admin User',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
  });
  console.log(`👤 Admin created: ${admin.email} / ${ADMIN_PASSWORD}`);
}

async function seedCountries() {
  const countries = [
    {
      name: 'Canada',
      slug: 'canada',
      flag: '🇨🇦',
      heroImage:
        'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1600&q=80',
      description: 'A leading destination for study, work and permanent residency.',
      visaTypes: ['Study Visa', 'Work Permit', 'PR Guidance'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Australia',
      slug: 'australia',
      flag: '🇦🇺',
      heroImage:
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&q=80',
      description: 'World-class education and strong post-study work opportunities.',
      visaTypes: ['Study Visa', 'Work Permit', 'PR Guidance'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'United Kingdom',
      slug: 'uk',
      flag: '🇬🇧',
      heroImage:
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80',
      description: 'Globally recognised universities and a rich cultural experience.',
      visaTypes: ['Study Visa', 'Work Visa', 'Visitor Visa'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'USA',
      slug: 'usa',
      flag: '🇺🇸',
      heroImage:
        'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&q=80',
      description: 'A top choice for higher education and career growth.',
      visaTypes: ['Study Visa', 'Work Visa', 'Visitor Visa'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Germany',
      slug: 'germany',
      flag: '🇩🇪',
      heroImage:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80',
      description: 'Affordable education and a thriving job market in Europe.',
      visaTypes: ['Study Visa', 'Job Seeker Visa', 'Work Permit'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'New Zealand',
      slug: 'new-zealand',
      flag: '🇳🇿',
      heroImage:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
      description: 'Quality of life, education and immigration pathways.',
      visaTypes: ['Study Visa', 'Work Permit', 'PR Guidance'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Ireland',
      slug: 'ireland',
      flag: '🇮🇪',
      heroImage:
        'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1600&q=80',
      description: 'A fast-growing tech hub with excellent education.',
      visaTypes: ['Study Visa', 'Work Permit'],
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'France',
      slug: 'france',
      flag: '🇫🇷',
      heroImage:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
      description: 'Prestigious institutions and a vibrant student life.',
      visaTypes: ['Study Visa', 'Visitor Visa'],
      isFeatured: false,
      isActive: true,
    },
    {
      name: 'Dubai / UAE',
      slug: 'dubai-uae',
      flag: '🇦🇪',
      heroImage:
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
      description: 'A global business hub with growing career opportunities.',
      visaTypes: ['Work Visa', 'Business Visa', 'Visitor Visa'],
      isFeatured: false,
      isActive: true,
    },
  ];
  await Country.insertMany(countries);
  console.log(`🌍 ${countries.length} countries seeded`);
}

async function seedServices() {
  const services = [
    {
      title: 'Study Visa',
      slug: 'study-visa',
      icon: 'GraduationCap',
      shortDescription:
        'Complete guidance for studying abroad, from university selection to visa application.',
      order: 1,
      isActive: true,
    },
    {
      title: 'Work Permit',
      slug: 'work-permit',
      icon: 'Briefcase',
      shortDescription:
        'Professional assistance for international employment and work permit applications.',
      order: 2,
      isActive: true,
    },
    {
      title: 'Tourist Visa',
      slug: 'tourist-visa',
      icon: 'Plane',
      shortDescription:
        'Guidance for visiting family, exploring destinations and short-term travel.',
      order: 3,
      isActive: true,
    },
    {
      title: 'PR & Immigration',
      slug: 'pr-immigration',
      icon: 'Home',
      shortDescription:
        'Understand immigration pathways and long-term settlement options.',
      order: 4,
      isActive: true,
    },
    {
      title: 'University Admission',
      slug: 'university-admission',
      icon: 'School',
      shortDescription: 'Find suitable universities and programs based on your goals.',
      order: 5,
      isActive: true,
    },
    {
      title: 'Documentation Assistance',
      slug: 'documentation-assistance',
      icon: 'FileText',
      shortDescription:
        'Get organized with professional document and application guidance.',
      order: 6,
      isActive: true,
    },
  ];
  await Service.insertMany(services);
  console.log(`🛠️  ${services.length} services seeded`);
}

async function seedFAQs() {
  const faqs = [
    {
      question: 'How long does a visa application take?',
      answer:
        'Processing times vary by country and visa type — typically a few weeks to several months. We share current estimated timelines during your consultation.',
      category: 'process',
      order: 1,
    },
    {
      question: 'What documents are required?',
      answer:
        'Requirements differ by country and visa type. Common items include a valid passport, financial documents and proof of purpose. We provide a personalised checklist.',
      category: 'documents',
      order: 2,
    },
    {
      question: 'Which country is suitable for my profile?',
      answer:
        'This depends on your education, work experience, budget and goals. Our consultants assess your profile and recommend destinations.',
      category: 'country',
      order: 3,
    },
    {
      question: 'Can I apply for a work permit without a job offer?',
      answer:
        'Some countries offer job-seeker or open work permits, while others require a job offer. We explain the options for your target country.',
      category: 'general',
      order: 4,
    },
    {
      question: 'How does the consultation process work?',
      answer:
        'You book a free consultation, we review your profile, then provide guidance on suitable countries and visa pathways. No obligation to proceed.',
      category: 'process',
      order: 5,
    },
    {
      question: 'How much does consultation cost?',
      answer:
        'Your initial consultation is free. Any service fees are explained transparently before you decide to proceed.',
      category: 'fees',
      order: 6,
    },
  ];
  await FAQ.insertMany(faqs);
  console.log(`❓ ${faqs.length} FAQs seeded`);
}

async function seedTestimonials() {
  const items = [
    {
      name: 'Sample Client A',
      country: 'Australia',
      visaType: 'Study Visa',
      rating: 5,
      content:
        'The team guided me through every step of my study visa application. Clear communication and helpful document support throughout.',
      avatar: 'https://i.pravatar.cc/120?img=12',
      isSample: true,
      isApproved: true,
      order: 1,
    },
    {
      name: 'Sample Client B',
      country: 'Canada',
      visaType: 'Work Permit',
      rating: 5,
      content:
        'Professional and transparent. They explained my options honestly and helped me prepare a strong application.',
      avatar: 'https://i.pravatar.cc/120?img=32',
      isSample: true,
      isApproved: true,
      order: 2,
    },
    {
      name: 'Sample Client C',
      country: 'United Kingdom',
      visaType: 'University Admission',
      rating: 5,
      content:
        'They helped me shortlist universities that matched my profile and budget. The entire experience felt personal.',
      avatar: 'https://i.pravatar.cc/120?img=45',
      isSample: true,
      isApproved: true,
      order: 3,
    },
  ];
  await Testimonial.insertMany(items);
  console.log(`⭐ ${items.length} testimonials seeded (marked as sample)`);
}

async function seedTeam() {
  const items = [
    {
      name: 'Sample Consultant 1',
      role: 'Senior Immigration Advisor',
      bio: 'Over a decade of experience guiding clients through study, work and immigration pathways.',
      avatar: 'https://i.pravatar.cc/200?img=12',
      isSample: true,
      order: 1,
    },
    {
      name: 'Sample Consultant 2',
      role: 'Education & Admissions Specialist',
      bio: 'Helps students identify universities and programs that match their goals.',
      avatar: 'https://i.pravatar.cc/200?img=33',
      isSample: true,
      order: 2,
    },
    {
      name: 'Sample Consultant 3',
      role: 'Work Visa Consultant',
      bio: 'Supports professionals exploring international employment and work permits.',
      avatar: 'https://i.pravatar.cc/200?img=68',
      isSample: true,
      order: 3,
    },
  ];
  await TeamMember.insertMany(items);
  console.log(`👥 ${items.length} team members seeded (marked as sample)`);
}

async function seedStatistics() {
  const items = [
    { key: 'clients', label: 'Clients Assisted', value: 5000, suffix: '+', icon: 'Users', order: 1 },
    { key: 'countries', label: 'Countries Covered', value: 15, suffix: '+', icon: 'Globe', order: 2 },
    { key: 'years', label: 'Years Experience', value: 10, suffix: '+', icon: 'Award', order: 3 },
    { key: 'applications', label: 'Applications Supported', value: 12000, suffix: '+', icon: 'FileCheck', order: 4 },
  ];
  await Statistic.insertMany(items);
  console.log(`📊 ${items.length} statistics seeded`);
}

async function seedContactInfo() {
  await ContactInfo.create({
    key: 'main',
    phone: '+1 (000) 000-0000',
    whatsapp: '10000000000',
    email: 'hello@globalpath.demo',
    officeAddress: '123 Consultancy Avenue, Suite 400, Demo City, 00000',
    businessHours: 'Mon–Fri: 9:00 AM – 6:00 PM | Sat: 10:00 AM – 2:00 PM',
    socials: {
      instagram: 'https://instagram.com/globalpath',
      facebook: 'https://facebook.com/globalpath',
      linkedin: 'https://linkedin.com/company/globalpath',
      youtube: 'https://youtube.com/@globalpath',
    },
  });
  console.log('📞 Contact info seeded');
}

async function run() {
  console.log('🌱 Starting seed...\n');
  console.log(`📡 Connecting to ${env.mongoUri}\n`);
  await connectDB();
  console.log('');
  await clearAll();
  console.log('');
  await seedUsers();
  await seedCountries();
  await seedServices();
  await seedFAQs();
  await seedTestimonials();
  await seedTeam();
  await seedStatistics();
  await seedContactInfo();
  console.log('\n✅ Seed complete\n');
  console.log('🔑 Admin login:');
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}\n`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});