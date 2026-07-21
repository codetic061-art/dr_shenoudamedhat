import React from 'react';
import { useLang } from '../hooks/useLang';
import { reviewsData } from '../data/reviews';
import { motion } from 'framer-motion';

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2);
  }
  return parts[0][0] + parts[parts.length - 1][0];
};

const ReviewCard = ({ text, name, date, rating, index }) => {
  const initials = getInitials(name);

  return (
    <motion.article
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 25 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-white dark:bg-surface-container-high p-8 rounded-3xl shadow-sm border border-[var(--border-outline-20)] flex flex-col justify-between items-start text-start relative clinical-glow hover:shadow-md transition-shadow duration-300"
    >
      <div>
        {/* Star Rating Row */}
        <div className="flex gap-0.5 text-yellow-500 mb-4 justify-start">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
            >
              star
            </span>
          ))}
        </div>

        {/* Review Body */}
        <p className="font-body-md text-sm leading-relaxed text-on-surface-variant italic mb-6">
          “ {text} ”
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[var(--border-outline-20)] mb-6" />

      {/* User Row */}
      <div className="flex items-center gap-3 w-full">
        {/* Initials Circle */}
        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs font-serif-cormorant select-none">
          {initials}
        </div>
        <div>
          <cite className="font-headline-lg text-sm font-bold text-primary not-italic block">
            {name}
          </cite>
          <span className="font-body-md text-[10px] text-on-surface-variant font-semibold block mt-0.5">
            {date}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export const ReviewsSection = () => {
  const { t } = useLang();

  return (
    <section
      id="reviews"
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap"
    >
      {/* Heading */}
      <div className="text-center mb-16 flex flex-col items-center gap-3">
        <h2 className="font-display-lg text-headline-xl text-primary font-bold">
          {t.reviews.h2}
        </h2>
        <div className="w-10 h-[2px] bg-[var(--bg-secondary-35)] rounded-full" />
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviewsData.map((review, index) => {
          const trans = t.reviews.items[review.keyIndex];
          return (
            <ReviewCard
              key={review.id}
              text={trans.text}
              name={trans.name}
              date={trans.date}
              rating={review.rating}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};
