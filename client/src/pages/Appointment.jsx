import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalendarCheck, Clock, Video, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import Input, { Select, Textarea } from '../components/ui/Input.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { submitLead } from '../services/contentService.js';
import { APP_NAME } from '../utils/constants.js';

/** Next 10 weekdays from today. */
function generateDays() {
  const days = [];
  const d = new Date();
  while (days.length < 10) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(d));
  }
  return days;
}

const SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const MODES = [
  { id: 'video', label: 'Video Call', icon: Video },
  { id: 'phone', label: 'Phone Call', icon: Phone },
  { id: 'office', label: 'In-Person', icon: MapPin },
];

export default function Appointment() {
  const toast = useToast();
  const days = generateDays();

  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState('');
  const [mode, setMode] = useState('video');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const booking = () =>
    `${days[day].toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })} at ${slot}`;

  const submit = async (e) => {
    e.preventDefault();
    if (!slot) return toast.error('Please pick a time slot.');
    if (!name.trim() || !email.trim() || !phone.trim())
      return toast.error('Please fill in your name, email and phone.');

    setLoading(true);
    try {
      await submitLead({
        name,
        email,
        phone,
        preferredContactMethod: MODES.find((m) => m.id === mode).label,
        message: `Appointment request for ${booking()}. Notes: ${notes || '—'}`,
        source: 'appointment-scheduler',
      });
      setSubmitted(true);
      toast.success('Appointment requested! We’ll confirm by email shortly.');
    } catch (err) {
      toast.error(
        err?.message || 'Could not book. Please try again or contact us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Appointment Confirmed — {APP_NAME}</title>
        </Helmet>
        <PageHero
          eyebrow="Appointment"
          title="Appointment Requested"
          breadcrumbs={[{ label: 'Appointment' }]}
        />
        <section className="section-padding bg-cream-50">
          <div className="container-page max-w-xl">
            <div className="rounded-3xl bg-white border border-navy-100 shadow-card p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">
                We’ve received your request
              </h2>
              <p className="text-navy-500 leading-relaxed">
                A consultant will confirm your appointment by email shortly. In the
                meantime, feel free to explore our tools.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button to="/match" variant="secondary">Visa Match</Button>
                <Button to="/" variant="accent">Back to Home</Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book an Appointment — {APP_NAME}</title>
        <meta
          name="description"
          content="Schedule a consultation — video, phone or in-person — at a time that suits you."
        />
      </Helmet>

      <PageHero
        eyebrow="Appointment"
        title="Schedule a Consultation"
        description="Pick a date, time and format that works for you. We’ll confirm by email."
        breadcrumbs={[{ label: 'Appointment' }]}
        image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-page max-w-4xl">
          <form onSubmit={submit} className="space-y-8">
            {/* Day picker */}
            <div className="rounded-3xl bg-white border border-navy-100 shadow-soft p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-royal-600" />
                Select a date
              </h3>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {days.map((d, i) => {
                  const isActive = i === day;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setDay(i)}
                      className={`shrink-0 w-20 py-3 rounded-2xl border-2 transition-all text-center ${
                        isActive
                          ? 'border-royal-500 bg-royal-50'
                          : 'border-navy-100 hover:border-navy-200 bg-white'
                      }`}
                    >
                      <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-navy-400">
                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div
                        className={`mt-0.5 font-display text-xl font-bold ${
                          isActive ? 'text-royal-700' : 'text-navy-900'
                        }`}
                      >
                        {d.getDate()}
                      </div>
                      <div className="text-[0.65rem] font-semibold text-navy-400">
                        {d.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time + format */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-white border border-navy-100 shadow-soft p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-royal-600" />
                  Choose a time
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {SLOTS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSlot(t)}
                      className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                        slot === t
                          ? 'border-royal-500 bg-royal-50 text-royal-700'
                          : 'border-navy-100 hover:border-navy-200 text-navy-600 bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-navy-100 shadow-soft p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4">
                  Meeting format
                </h3>
                <div className="space-y-2">
                  {MODES.map((m) => {
                    const Icon = m.icon;
                    const active = mode === m.id;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-sm font-semibold transition-all text-left ${
                          active
                            ? 'border-royal-500 bg-royal-50 text-royal-700'
                            : 'border-navy-100 hover:border-navy-200 text-navy-600 bg-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="rounded-3xl bg-white border border-navy-100 shadow-soft p-6 sm:p-8 space-y-5">
              <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                Your details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Input
                label="Phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Textarea
                label="What would you like to discuss? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" variant="accent" size="lg" loading={loading}>
                {loading ? 'Booking…' : 'Request Appointment'}
              </Button>
              <p className="text-xs text-navy-400">
                {slot ? (
                  <>Booking: <strong className="text-navy-700">{booking()}</strong></>
                ) : (
                  'Select a time slot to continue'
                )}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}