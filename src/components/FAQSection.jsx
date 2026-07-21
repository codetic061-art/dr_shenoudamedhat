import React, { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { faqData } from '../data/faq';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onToggle, lang }) => {
  return (
    <div className="bg-white dark:bg-surface-container-high rounded-2xl shadow-sm border border-[var(--border-outline-20)] overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full px-6 py-5 flex justify-between items-center text-start gap-4 transition-all duration-300 ${
          isOpen ? 'bg-[var(--hero-badge-bg)] border-l-4 border-primary' : 'border-l-4 border-transparent'
        }`}
      >
        <span className="font-bold text-primary text-sm sm:text-base leading-snug">
          {question}
        </span>
        <span
          className="material-symbols-outlined text-primary text-[20px] transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 text-start">
              <p className="font-body-md text-xs sm:text-sm leading-relaxed text-on-surface-variant">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const { lang, t } = useLang();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap scroll-mt-24"
    >
      {/* Heading */}
      <div className="text-center mb-16 flex flex-col items-center gap-3">
        <h2 className="font-display-lg text-headline-xl text-primary font-bold">
          {t.faq.h2}
        </h2>
        <div className="w-10 h-[2px] bg-[var(--bg-secondary-35)] rounded-full" />
      </div>

      {/* FAQ List */}
      <div className="max-w-[760px] mx-auto flex flex-col gap-3.5">
        {faqData.map((faq, index) => {
          const trans = t.faq.items[faq.keyIndex];
          const isOpen = openIndex === index;
          return (
            <FAQItem
              key={faq.id}
              question={trans.q}
              answer={trans.a}
              isOpen={isOpen}
              onToggle={() => handleToggle(index)}
              lang={lang}
            />
          );
        })}
      </div>
    </section>
  );
};
