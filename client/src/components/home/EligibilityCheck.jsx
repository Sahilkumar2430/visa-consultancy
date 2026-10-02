import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';

const QUESTIONS = [
  {
    id: 'age',
    q: 'What is your age range?',
    options: [
      { label: '18 – 24', score: 3 },
      { label: '25 – 32', score: 3 },
      { label: '33 – 40', score: 2 },
      { label: '41 – 50', score: 1 },
      { label: '50+', score: 0 },
    ],
  },
  {
    id: 'education',
    q: 'What is your highest education level?',
    options: [
      { label: 'High School', score: 1 },
      { label: 'Bachelor’s Degree', score: 3 },
      { label: 'Master’s Degree', score: 3 },
      { label: 'Doctorate / PhD', score: 3 },
      { label: 'Diploma / Certificate', score: 2 },
    ],
  },
  {
    id: 'experience',
    q: 'How many years of work experience do you have?',
    options: [
      { label: 'None', score: 0 },
      { label: 'Less than 1 year', score: 1 },
      { label: '1 – 3 years', score: 2 },
      { label: '3 – 5 years', score: 3 },
      { label: '5+ years', score: 3 },
    ],
  },
  {
    id: 'language',
    q: 'Have you taken an English / language proficiency test?',
    options: [
      { label: 'Yes, with a good score', score: 3 },
      { label: 'Yes, but score was low', score: 1 },
      { label: 'No, but willing to take one', score: 2 },
      { label: 'Not sure', score: 1 },
    ],
  },
  {
    id: 'funds',
    q: 'Do you have proof of funds for your goal?',
    options: [
      { label: 'Yes, fully ready', score: 3 },
      { label: 'Partially arranged', score: 2 },
      { label: 'Not yet, but planning', score: 1 },
      { label: 'Not applicable', score: 2 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 3;

export default function EligibilityCheck() {
  const { profile, setAnswer } = useProfile();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Restore saved answers when the user comes back
  useEffect(() => {
    const hasAll = QUESTIONS.every((q) => profile.answers[q.id] !== undefined);
    if (hasAll) {
      setDone(true);
      setStep(QUESTIONS.length - 1);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const total = Object.values(profile.answers).reduce((s, v) => s + v, 0);
  const percentage = Math.round((total / MAX_SCORE) * 100);

  const pick = (qid, score) => {
    setAnswer(qid, score);
    setTimeout(() => {
      if (step === QUESTIONS.length - 1) setDone(true);
      else setStep((s) => s + 1);
    }, 200);
  };

  const reset = () => {
    QUESTIONS.forEach((q) => setAnswer(q.id, undefined));
    setStep(0);
    setDone(false);
  };

  const result =
    percentage >= 75
      ? {
          title: 'Strong Profile!',
          desc: 'You appear well-positioned for multiple destinations. A consultant can help you choose the best fit.',
        }
      : percentage >= 50
        ? {
            title: 'Promising Profile',
            desc: 'You have several paths open. A short consultation can help clarify the strongest option for your goals.',
          }
        : {
            title: 'Let’s Explore Your Options',
            desc: 'Every profile is unique. Speak with a consultant to identify which destinations and visa types fit you best.',
          };

  const progressPct = ((step + (done ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <section id="eligibility" className="section-padding bg-white">
      <div className="container-page max-w-3xl">
        <SectionHeading
          eyebrow="Free Tool"
          title="Check Your Eligibility"
          description="Answer 5 quick questions to get an indicative snapshot. This is a guide — not an official assessment."
        />

        <div className="mt-12 rounded-3xl border border-navy-100 bg-cream-50 overflow-hidden">
          <div className="px-6 sm:px-8 pt-6">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-navy-400">
              <span>{done ? 'Result' : `Question ${step + 1} of ${QUESTIONS.length}`}</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-royal-500 to-teal-500"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-900 mb-5">
                    {QUESTIONS[step].q}
                  </h3>
                  <div className="space-y-2.5">
                    {QUESTIONS[step].options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => pick(QUESTIONS[step].id, opt.score)}
                        className="w-full text-left px-5 py-3.5 rounded-xl bg-white border border-navy-100 hover:border-royal-400 hover:bg-royal-50 text-sm font-medium text-navy-700 hover:text-royal-700 transition-all duration-150"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-400 hover:text-navy-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-royal-500 to-teal-500 flex items-center justify-center mx-auto mb-5">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-display text-4xl font-extrabold gradient-text">
                    {percentage}%
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-navy-900">
                    {result.title}
                  </h3>
                  <p className="mt-3 text-navy-500 leading-relaxed max-w-md mx-auto">
                    {result.desc}
                  </p>

                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Button to="/match" variant="accent" size="lg" iconRight={ArrowRight}>
                      See Matched Countries
                    </Button>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake
                    </button>
                  </div>

                  <p className="mt-6 text-[0.7rem] text-navy-400 leading-relaxed max-w-md mx-auto">
                    This is an indicative tool only. Actual eligibility depends on many
                    factors and is ultimately decided by the relevant immigration
                    authorities.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}