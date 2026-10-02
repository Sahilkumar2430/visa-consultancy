import { Helmet } from 'react-helmet-async';
import { Home, Search } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { APP_NAME } from '../utils/constants.js';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — {APP_NAME}</title>
      </Helmet>
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container-page text-center max-w-lg">
          <div className="font-display text-[6rem] sm:text-[8rem] font-extrabold leading-none gradient-text">
            404
          </div>
          <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-navy-900">
            Page Not Found
          </h1>
          <p className="mt-4 text-navy-500">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="accent" icon={Home}>
              Back to Home
            </Button>
            <Button to="/countries" variant="secondary" icon={Search}>
              Explore Countries
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}