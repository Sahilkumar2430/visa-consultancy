import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero.jsx';
import TrustSection from '../components/home/TrustSection.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import DestinationsSection from '../components/home/DestinationsSection.jsx';
import VisaPathway from '../components/home/VisaPathway.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import ProcessTimeline from '../components/home/ProcessTimeline.jsx';
import SuccessStories from '../components/home/SuccessStories.jsx';
import StatsSection from '../components/home/StatsSection.jsx';
import FAQSection from '../components/home/FAQSection.jsx';
import FinalCTA from '../components/home/FinalCTA.jsx';
import { APP_NAME } from '../utils/constants.js';
import EligibilityCheck from '../components/home/EligibilityCheck.jsx';
import WorldMap from '../components/home/WorldMap.jsx';
import LiveCounter from '../components/home/LiveCounter.jsx';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{APP_NAME} — Study, Work & Immigration Guidance</title>
        <meta
          name="description"
          content="Expert guidance for study visas, work permits, immigration and international education. Book a free consultation with experienced visa consultants."
        />
        <meta property="og:title" content={`${APP_NAME} — Your Journey Abroad Starts Here`} />
        <meta
          property="og:description"
          content="Expert guidance for study visas, work permits, immigration and international education opportunities."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <TrustSection />
      <ServicesSection />
      <DestinationsSection />
      <VisaPathway />
      <WhyChooseUs />
      <ProcessTimeline />
      <SuccessStories />
      <StatsSection />
      <FAQSection />
      <FinalCTA />
      <VisaPathway />
<EligibilityCheck />
<WhyChooseUs />
    </>
  );
}