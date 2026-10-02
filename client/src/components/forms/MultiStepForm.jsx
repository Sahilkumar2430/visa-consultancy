import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Target,
  Globe2,
  GraduationCap,
  Phone,
  Send,
} from 'lucide-react';
import Input, { Select, Textarea } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { VISA_TYPES, CONTACT_METHODS } from '../../utils/constants.js';
import { submitLead } from '../../services/contentService.js';

const stepsMeta = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Goal', icon: Target },
  { id: 3, label: 'Destination', icon: Globe2 },
  { id: 4, label: 'Profile', icon: GraduationCap },
  { id: 5, label: 'Contact', icon: Phone },
  { id: 6, label: 'Review', icon: CheckCircle2 },
];

const destinations = [
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

const goals = [
  { value: 'Study', label: 'Study Abroad', emoji: '🎓' },
  { value: 'Work', label: 'Work Abroad', emoji: '💼' },
  { value: 'Visit', label: 'Visit Abroad', emoji: '✈️' },
  { value: 'Immigration', label: 'Immigration / PR', emoji: '🏠' },
];

const educationLevels = [
  'High School',
  'Bachelor’s Degree',
  'Master’s Degree',
  'Doctorate',
  'Diploma / Certificate',
  'Other',
];

const workExperienceOptions = [
  'No experience',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5–10 years',
  '10+ years',
];

const intakeOptions = [
  'As soon as possible',
  'Within 3 months',
  'Within 6 months',
  'Within 1 year',
  'Just exploring',
];

export default function MultiStepForm() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm({
    defaultValues: {
      preferredContactMethod: 'Email',
      goal: '',
      preferredDestination: '',
    },
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const nextStep = async () => {
    const fieldsByStep = {
      1: ['name', 'email', 'phone'],
      2: ['goal'],
      3: ['preferredDestination'],
      4: ['education', 'workExperience', 'preferredIntake'],
      5: ['preferredContactMethod'],
    };
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, 6));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    try {
      await submitLead({ ...data, source: 'multi-step-form' });
      setSubmitted(true);
      toast.success('Thank you! Our consultant will contact you shortly.');
    } catch (err) {
      toast.error(
        err?.message ||
          'We could not submit your request. Please try again or contact us directly.'
      );
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white border border-navy-100 shadow-card p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">
          Thank you!
        </h3>
        <p className="text-navy-500 leading-relaxed max-w-md mx-auto">
          Our consultant will contact you shortly using your preferred method. If you have any
          urgent questions, feel free to call us directly.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="rounded-3xl bg-white border border-navy-100 shadow-card overflow-hidden">
        {/* Progress bar */}
        <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-navy-100 bg-cream-50/60">
          <div className="flex items-center justify-between gap-1 mb-3">
            {stepsMeta.map((s) => {
              const Icon = s.icon;
              const isDone = step > s.id;
              const isActive = step === s.id;
              return (
                <div key={s.id} className="flex-1 flex items-center">
                  <div
                    className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-teal-500 text-white'
                        : isActive
                          ? 'bg-royal-600 text-white ring-4 ring-royal-100'
                          : 'bg-navy-100 text-navy-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>
                  {s.id !== 6 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 rounded-full transition-colors ${
                        step > s.id ? 'bg-teal-400' : 'bg-navy-100'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[0.65rem] font-semibold text-navy-400 px-1">
            <span>Step {step} of 6</span>
            <span>{stepsMeta[step - 1].label}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Step 1: Personal */}
              {step === 1 && (
                <div className="space-y-5">
                  <StepTitle title="Personal Information" subtitle="Let’s start with your basic details." />
                  <Input
                    label="Full Name"
                    placeholder="e.g. Alex Johnson"
                    required
                    error={errors.name?.message}
                    {...register('name', { required: 'Please enter your name' })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <Input
                    label="Current Country"
                    placeholder="e.g. India"
                    error={errors.currentCountry?.message}
                    {...register('currentCountry')}
                  />
                </div>
              )}

              {/* Step 2: Goal */}
              {step === 2 && (
                <div>
                  <StepTitle title="What is your goal?" subtitle="Choose the option that best fits your objective." />
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map((g) => {
                      const selected = values.goal === g.value;
                      return (
                        <label
                          key={g.value}
                          className={`cursor-pointer flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                            selected
                              ? 'border-royal-500 bg-royal-50'
                              : 'border-navy-100 hover:border-navy-200 bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            value={g.value}
                            className="sr-only"
                            {...register('goal', { required: 'Please select a goal' })}
                          />
                          <span className="text-2xl">{g.emoji}</span>
                          <span
                            className={`text-sm font-semibold text-center ${
                              selected ? 'text-royal-700' : 'text-navy-700'
                            }`}
                          >
                            {g.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.goal && (
                    <p className="mt-3 text-xs text-red-500 font-medium">
                      {errors.goal.message}
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Destination */}
              {step === 3 && (
                <div className="space-y-5">
                  <StepTitle title="Preferred Destination" subtitle="Where would you like to go?" />
                  <Select
                    label="Country"
                    required
                    error={errors.preferredDestination?.message}
                    {...register('preferredDestination', {
                      required: 'Please select a destination',
                    })}
                  >
                    <option value="">Select a country</option>
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                  <Select label="Visa Type" {...register('visaType')}>
                    <option value="">Select visa type (optional)</option>
                    {VISA_TYPES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {/* Step 4: Profile */}
              {step === 4 && (
                <div className="space-y-5">
                  <StepTitle title="Your Profile" subtitle="Tell us about your background." />
                  <Select label="Education Level" {...register('education')}>
                    <option value="">Select education level</option>
                    {educationLevels.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </Select>
                  <Select label="Work Experience" {...register('workExperience')}>
                    <option value="">Select work experience</option>
                    {workExperienceOptions.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </Select>
                  <Input
                    label="Budget (optional)"
                    placeholder="e.g. 20,000 – 30,000 USD"
                    {...register('budget')}
                  />
                  <Select label="Preferred Intake / Date" {...register('preferredIntake')}>
                    <option value="">Select preferred timing</option>
                    {intakeOptions.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {/* Step 5: Contact preference */}
              {step === 5 && (
                <div className="space-y-5">
                  <StepTitle title="Contact Preference" subtitle="How would you like us to reach you?" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CONTACT_METHODS.map((m) => {
                      const selected = values.preferredContactMethod === m;
                      return (
                        <label
                          key={m}
                          className={`cursor-pointer flex items-center justify-center gap-2 p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                            selected
                              ? 'border-royal-500 bg-royal-50 text-royal-700'
                              : 'border-navy-100 hover:border-navy-200 text-navy-700 bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            value={m}
                            className="sr-only"
                            {...register('preferredContactMethod')}
                          />
                          {m}
                        </label>
                      );
                    })}
                  </div>
                  <Textarea
                    label="Message (optional)"
                    placeholder="Share anything else we should know…"
                    {...register('message')}
                  />
                </div>
              )}

              {/* Step 6: Review */}
              {step === 6 && (
                <div className="space-y-5">
                  <StepTitle title="Review & Submit" subtitle="Please confirm your details before submitting." />
                  <div className="rounded-2xl border border-navy-100 divide-y divide-navy-100 overflow-hidden">
                    <ReviewRow label="Name" value={values.name} />
                    <ReviewRow label="Email" value={values.email} />
                    <ReviewRow label="Phone" value={values.phone} />
                    {values.currentCountry && (
                      <ReviewRow label="Current Country" value={values.currentCountry} />
                    )}
                    <ReviewRow label="Goal" value={values.goal} />
                    <ReviewRow label="Destination" value={values.preferredDestination} />
                    {values.visaType && <ReviewRow label="Visa Type" value={values.visaType} />}
                    {values.education && <ReviewRow label="Education" value={values.education} />}
                    {values.workExperience && (
                      <ReviewRow label="Experience" value={values.workExperience} />
                    )}
                    {values.budget && <ReviewRow label="Budget" value={values.budget} />}
                    {values.preferredIntake && (
                      <ReviewRow label="Intake" value={values.preferredIntake} />
                    )}
                    <ReviewRow label="Contact via" value={values.preferredContactMethod} />
                  </div>
                  <p className="text-[0.7rem] text-navy-400 leading-relaxed">
                    By submitting, you agree to our{' '}
                    <a href="/privacy-policy" className="underline hover:text-royal-600">
                      Privacy Policy
                    </a>
                    . Visa approval is decided by government authorities; we do not guarantee
                    approval.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1}
              icon={ArrowLeft}
            >
              Back
            </Button>
            {step < 6 ? (
              <Button
                type="button"
                variant="accent"
                onClick={nextStep}
                iconRight={ArrowRight}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                loading={isSubmitting}
                icon={Send}
              >
                {isSubmitting ? 'Submitting…' : 'Request Consultation'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function StepTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-900">{title}</h3>
      {subtitle && <p className="mt-1.5 text-sm text-navy-400">{subtitle}</p>}
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white">
      <span className="text-sm text-navy-400 font-medium shrink-0">{label}</span>
      <span className="text-sm text-navy-900 font-semibold text-right break-words">
        {value || '—'}
      </span>
    </div>
  );
}