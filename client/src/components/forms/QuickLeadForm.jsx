import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2 } from 'lucide-react';
import Input, { Select } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { VISA_TYPES, CONTACT_METHODS } from '../../utils/constants.js';
import { submitLead } from '../../services/contentService.js';

const countries = [
  'Canada',
  'Australia',
  'United Kingdom',
  'USA',
  'Germany',
  'New Zealand',
  'Ireland',
  'France',
  'Dubai / UAE',
  'Not sure yet',
];

export default function QuickLeadForm() {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { preferredContactMethod: 'Email' },
  });

  const onSubmit = async (values) => {
    try {
      await submitLead({ ...values, source: 'hero-quick-form' });
      setSubmitted(true);
      reset();
      toast.success('Thank you! A consultant will contact you shortly.');
    } catch (err) {
      // Even if API is unavailable during frontend-only dev, show success UX is not ideal.
      // Show honest error instead.
      toast.error(
        err?.message || 'We could not submit your request. Please try again or contact us directly.'
      );
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white shadow-card-hover p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-navy-900 mb-2">
          Thank you!
        </h3>
        <p className="text-sm text-navy-500 leading-relaxed">
          Our consultant will contact you shortly using your preferred method.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-semibold text-royal-600 hover:text-royal-700"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white shadow-card-hover p-6 sm:p-7 border border-white/80">
      <div className="mb-5">
        <h3 className="font-display text-xl font-bold text-navy-900">
          Get Free Consultation
        </h3>
        <p className="text-sm text-navy-400 mt-1">
          Fill in your details — we’ll get back within one business day.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Full Name"
          placeholder="e.g. Alex Johnson"
          required
          error={errors.name?.message}
          {...register('name', { required: 'Please enter your name' })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 000 000 0000"
            required
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone is required',
              minLength: { value: 7, message: 'Enter a valid phone number' },
            })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Interested Country"
            required
            error={errors.country?.message}
            {...register('country', { required: 'Select a country' })}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select
            label="Visa Type"
            required
            error={errors.visaType?.message}
            {...register('visaType', { required: 'Select a visa type' })}
          >
            <option value="">Select type</option>
            {VISA_TYPES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </div>
        <Select label="Preferred Contact Method" {...register('preferredContactMethod')}>
          {CONTACT_METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          icon={Send}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
        </Button>

        <p className="text-[0.7rem] text-navy-400 text-center leading-relaxed">
          By submitting, you agree to our{' '}
          <a href="/privacy-policy" className="underline hover:text-royal-600">
            Privacy Policy
          </a>
          . Visa approval is decided by government authorities; we do not guarantee approval.
        </p>
      </form>
    </div>
  );
}