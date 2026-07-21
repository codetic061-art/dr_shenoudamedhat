import React, { useEffect, useState, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ targetValue, decimal = false, suffix = "" }) => {
  const [count, setCount] = useState(decimal ? 0.0 : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // ms
      const steps = 60;
      const stepTime = duration / steps;
      const increment = targetValue / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        start += increment;
        if (currentStep >= steps) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(decimal ? parseFloat(start.toFixed(1)) : Math.ceil(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue, decimal]);

  return (
    <span ref={ref} className="stat-number inline-block min-w-[50px]">
      {count}
      {suffix}
    </span>
  );
};

export const HeroSection = () => {
  const { lang, t } = useLang();

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-surface-container/30 to-transparent -z-10 rounded-l-[100px] blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-secondary-container/20 rounded-full blur-[120px] -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center w-full z-10">
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-stack-lg text-start"
        >
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--hero-badge-bg)] backdrop-blur-md border border-white/40 dark:border-white/5 rounded-full clinical-glow">
            <span className="material-symbols-outlined text-primary text-[18px]">
              stars
            </span>
            <span className="font-body-md text-xs font-semibold text-primary tracking-wide">
              {t.hero.badge}
            </span>
          </div>

          {/* Heading 1 (Strictly one H1 per page for SEO) */}
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight max-w-[620px] tracking-tight">
            {lang === 'ar' ? (
              <>
                ابتسامتك.. تستحق أفضل <span className="italic text-secondary font-serif-cormorant font-normal">دكتور أسنان</span> تجميلي
              </>
            ) : (
              <>
                Modern Dentistry with <span className="italic text-secondary font-serif-cormorant font-normal">Comfort</span> You Deserve
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[520px]">
            {t.hero.sub}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="/book"
              className="bg-primary text-on-primary font-cta text-cta uppercase px-8 py-4 rounded-full flex items-center gap-2 hover:scale-103 hover:bg-primary-container transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>{t.hero.cta1}</span>
              <span className={`material-symbols-outlined text-[18px] ${lang === 'ar' ? 'rotate-180' : ''}`}>
                arrow_forward
              </span>
            </a>
            <button
              onClick={() => handleScrollTo('services')}
              className="flex items-center gap-3 px-6 py-4 rounded-full border-[1.5px] border-outline-variant hover:border-primary text-primary font-cta text-cta uppercase transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary transition-colors">
                <span className="material-symbols-outlined text-[16px] animate-[pulse_2s_infinite]">
                  play_arrow
                </span>
              </div>
              <span>{t.hero.cta2}</span>
            </button>
          </div>

          {/* Dynamic Stats Row with Intersection Observers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-outline-variant/30 w-full">
            <div>
              <p className="font-headline-lg text-3xl font-bold text-primary">
                <StatCounter targetValue={12} suffix="+" />
              </p>
              <p className="font-body-md text-xs text-on-surface-variant mt-1">
                {t.hero.stats.years}
              </p>
            </div>
            <div>
              <p className="font-headline-lg text-3xl font-bold text-primary">
                <StatCounter targetValue={5} suffix="k+" />
              </p>
              <p className="font-body-md text-xs text-on-surface-variant mt-1">
                {t.hero.stats.patients}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary justify-start">
                <p className="font-headline-lg text-3xl font-bold">
                  <StatCounter targetValue={4.9} decimal={true} />
                </p>
                <span className="material-symbols-outlined text-[20px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mt-1">
                {t.hero.stats.rating}
              </p>
            </div>
            <div>
              <p className="font-headline-lg text-3xl font-bold text-primary">
                <StatCounter targetValue={99} suffix="%" />
              </p>
              <p className="font-body-md text-xs text-on-surface-variant mt-1">
                {t.hero.stats.satisfaction}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column Image & Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="relative w-full h-[450px] sm:h-[550px] lg:h-[600px] mt-12 lg:mt-0 max-w-[500px] mx-auto lg:max-w-none"
        >
          {/* Main Photo Mask with Glassmorphic Frame */}
          <div className="absolute inset-0 rounded-[40px] overflow-hidden bg-surface-container shadow-2xl border-4 border-white/20 dark:border-white/5 z-10">
            <img
              src="/hero photo.png"
              alt={t.hero.imgAlt}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 select-none"
            />
          </div>

          {/* Floating Pill Badges */}
          <div className="absolute top-10 -left-6 lg:-left-12 flex flex-col gap-3.5 z-30">
            <div className="bg-[var(--hero-floating-bg)] backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-lg rounded-full px-5 py-3 flex items-center gap-3 animate-float-y">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-[16px]">
                  health_and_safety
                </span>
              </div>
              <span className="font-body-md text-xs font-semibold text-on-surface">
                {lang === 'ar' ? 'علاج خالي من الألم' : 'Pain-Free Experience'}
              </span>
            </div>
            <div className="bg-[var(--hero-floating-bg)] backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-lg rounded-full px-5 py-3 flex items-center gap-3 animate-float-y [animation-delay:200ms]">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[16px]">
                  precision_manufacturing
                </span>
              </div>
              <span className="font-body-md text-xs font-semibold text-on-surface">
                {lang === 'ar' ? 'تقنيات رقمية متطورة' : 'Advanced Tech'}
              </span>
            </div>
            <div className="bg-[var(--hero-floating-bg)] backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-lg rounded-full px-5 py-3 flex items-center gap-3 animate-float-y [animation-delay:400ms]">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[16px]">
                  clean_hands
                </span>
              </div>
              <span className="font-body-md text-xs font-semibold text-on-surface">
                {lang === 'ar' ? 'تعقيم صارم للسلامة' : 'Strict Hygiene'}
              </span>
            </div>
          </div>

          {/* Floating Review Card Overlay */}
          <div
            className={`absolute -bottom-6 ${
              lang === 'ar' ? '-right-4 lg:-right-8' : '-left-4 lg:-left-8'
            } bg-[var(--hero-review-bg)] backdrop-blur-2xl border border-white/50 dark:border-white/5 shadow-2xl rounded-2xl p-4 flex items-center gap-4 z-30 clinical-glow transform hover:-translate-y-1 transition-transform duration-300`}
          >
            <div className="flex -space-x-3 space-x-reverse">
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-surface overflow-hidden shadow-sm select-none">
                <img src="/patient_1.png" alt="Patient 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-surface overflow-hidden shadow-sm select-none">
                <img src="/patient_2.png" alt="Patient 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-surface overflow-hidden shadow-sm select-none">
                <img src="/patient_3.png" alt="Patient 3" className="w-full h-full object-cover" />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-surface bg-primary-container text-white flex items-center justify-center text-xs font-bold shadow-sm select-none">
                +
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary mb-0.5 justify-start">
                <span className="font-bold text-base">4.9</span>
                <span className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant font-semibold tracking-wide">
                {t.hero.reviewsCount}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
