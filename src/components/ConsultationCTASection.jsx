import React from 'react';
import { useLang } from '../hooks/useLang';

export const ConsultationCTASection = () => {
  const { lang, t } = useLang();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+201285600105';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsapp.message)}`;

  const handleScrollToBook = (e) => {
    e.preventDefault();
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta"
      className="bg-[#0e1d27] text-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-secondary-container/5 rounded-full blur-[100px] -z-5"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-primary-container/10 rounded-full blur-[100px] -z-5"></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          {/* Badge */}
          <span className="text-secondary-fixed font-body-md text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            {lang === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
          </span>

          {/* Heading */}
          <h2 className="font-display-lg text-headline-xl text-white leading-tight">
            {t.cta.h2}
          </h2>

          {/* Subheading */}
          <p className="font-body-lg text-sm text-white/70 max-w-[580px] leading-relaxed">
            {t.cta.sub}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {/* Primary CTA (Links to Booking) */}
            <a
              href="/book"
              className="bg-white text-[#0e1d27] font-cta text-cta uppercase px-8 py-4 rounded-full flex items-center gap-2 hover:scale-103 hover:bg-slate-100 transition-all duration-300 shadow-md font-bold"
            >
              <span>{t.cta.btn1}</span>
              <span className={`material-symbols-outlined text-[18px] text-[#0e1d27] ${lang === 'ar' ? 'rotate-180' : ''}`}>
                arrow_forward
              </span>
            </a>

            {/* Secondary CTA (WhatsApp) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[1.5px] border-white/20 hover:border-white/60 text-white font-cta text-cta uppercase px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] bg-white/5"
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path>
              </svg>
              <span>{t.cta.btn2}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
