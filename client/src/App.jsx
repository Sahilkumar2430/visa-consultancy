import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout.jsx';
import PageLoader from './components/ui/PageLoader.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';

/* ---------- Public pages ---------- */
const Home = lazy(() => import('./pages/Home.jsx'));
const Countries = lazy(() => import('./pages/Countries.jsx'));
const CountryDetail = lazy(() => import('./pages/CountryDetail.jsx'));
const Compare = lazy(() => import('./pages/Compare.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'));
const StudyVisa = lazy(() => import('./pages/StudyVisa.jsx'));
const WorkPermit = lazy(() => import('./pages/WorkPermit.jsx'));
const VisaMatch = lazy(() => import('./pages/VisaMatch.jsx'));
const Tracker = lazy(() => import('./pages/Tracker.jsx'));
const Checklist = lazy(() => import('./pages/Checklist.jsx'));
const Appointment = lazy(() => import('./pages/Appointment.jsx'));
const Insights = lazy(() => import('./pages/Insights.jsx'));
const InsightDetail = lazy(() => import('./pages/InsightDetail.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const SuccessStories = lazy(() => import('./pages/SuccessStories.jsx'));
const FAQPage = lazy(() => import('./pages/FAQ.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const Disclaimer = lazy(() => import('./pages/Disclaimer.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/* ---------- Admin pages ---------- */
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads.jsx'));
const AdminLeadDetail = lazy(() => import('./pages/admin/AdminLeadDetail.jsx'));
const AdminCountries = lazy(() => import('./pages/admin/AdminCountries.jsx'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices.jsx'));
const AdminFaqs = lazy(() => import('./pages/admin/AdminFaqs.jsx'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials.jsx'));
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam.jsx'));
const AdminStatistics = lazy(() => import('./pages/admin/AdminStatistics.jsx'));
const AdminContactInfo = lazy(() => import('./pages/admin/AdminContactInfo.jsx'));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* =====================================================
         *  ADMIN (separate, uses AdminAuthProvider)
         * ===================================================== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            </AdminAuthProvider>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="leads/:id" element={<AdminLeadDetail />} />
          <Route path="countries" element={<AdminCountries />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="faqs" element={<AdminFaqs />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="contact-info" element={<AdminContactInfo />} />
        </Route>

        {/* =====================================================
         *  CLIENT SITE (public — everything else)
         * ===================================================== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:slug" element={<CountryDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/study-visa" element={<StudyVisa />} />
          <Route path="/work-permit" element={<WorkPermit />} />
          <Route path="/match" element={<VisaMatch />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}