import React from 'react';
import { useLang } from '../hooks/useLang';
import { motion } from 'framer-motion';

export const PhilosophySection = () => {
  const { t } = useLang();

  return (
    <section
      id="philosophy"
      className="bg-surface-container-low dark:bg-[var(--philosophy-bg)] py-16 md:py-24"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6"
        >
          {/* Circular Doctor Avatar */}
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-[var(--border-primary-20)] bg-surface shadow-md">
            <img
              src="/about me.webp"
              alt={t.philosophy.imgAlt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top select-none"
            />
          </div>

          {/* Large Quote */}
          <blockquote className="font-display-lg italic text-2xl md:text-3xl text-primary leading-relaxed px-4 md:px-12 mt-2">
            {t.philosophy.quote}
          </blockquote>

          {/* Separation Line */}
          <div className="w-12 h-[2px] bg-[var(--bg-secondary-35)] rounded-full mt-2" />

          {/* Doctor Signature / Info */}
          <div>
            <cite className="font-headline-lg text-lg font-bold text-primary not-italic block">
              {t.philosophy.name}
            </cite>
            <span className="font-body-md text-xs text-on-surface-variant font-semibold block mt-1">
              {t.philosophy.specialty}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
