import React from 'react';
import { useLang } from '../hooks/useLang';
import { servicesData } from '../data/services';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, benefit, index }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 25 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-surface-container-high p-8 rounded-2xl shadow-sm border-l-4 border-transparent hover:border-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-start text-start group"
    >
      {/* Icon Wrapper */}
      <div className="w-12 h-12 bg-surface-container dark:bg-surface-container-lowest text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <span className="material-symbols-outlined text-[28px] font-light">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-headline-lg text-lg font-bold text-primary mb-3">
        {title}
      </h3>

      {/* Benefit Description */}
      <p className="font-body-md text-xs leading-relaxed text-on-surface-variant">
        {benefit}
      </p>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const { t } = useLang();

  return (
    <section
      id="services"
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap"
    >
      {/* Heading */}
      <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center gap-3">
        <h2 className="font-display-lg text-headline-xl text-primary font-bold">
          {t.services.h2}
        </h2>
        <div className="w-10 h-[2px] bg-[var(--bg-secondary-35)] rounded-full" />
        <p className="font-body-lg text-sm text-on-surface-variant max-w-[500px]">
          {t.services.sub}
        </p>
      </div>

      {/* Services Grid (2 cols mobile, 4 cols desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => {
          // Fetch translation mapping dynamically via current language
          const serviceTranslation = t.services.items[service.keyIndex];
          return (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={serviceTranslation.title}
              benefit={serviceTranslation.benefit}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};
