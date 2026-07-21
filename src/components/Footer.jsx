import React from 'react';
import { useLang } from '../hooks/useLang';

export const Footer = () => {
  const { lang, t } = useLang();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+201285600105';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsapp.message)}`;

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'services', label: t.footer.links[0] },
    { id: 'about', label: t.footer.links[1] },
    { id: 'work', label: t.footer.links[2] },
    { id: 'faq', label: t.footer.links[3] },
  ];

  return (
    <footer className="w-full bg-[#0e1d27] text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 text-start">
        
        {/* Column 1: Brand details (span 5) */}
        <div className="lg:col-span-5 flex flex-col items-start gap-4">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, 'home')}
            className="flex items-center gap-2 hover:scale-101 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-primary-fixed text-[32px]">
              dentistry
            </span>
            <span className="font-headline-lg text-2xl font-bold text-white tracking-tight">
              {lang === 'ar' ? 'د. شنودة' : 'Dr. Shenouda'}
            </span>
          </a>
          <cite className="font-headline-lg text-sm text-secondary-fixed italic not-italic font-bold">
            {t.footer.tagline}
          </cite>
          <p className="font-body-md text-xs leading-relaxed text-white/60 max-w-sm">
            {t.footer.description}
          </p>
        </div>

        {/* Column 2: Quick Links (span 3) */}
        <div className="lg:col-span-3 flex flex-col items-start gap-4 md:pl-4 lg:pl-10">
          <h4 className="font-headline-lg text-sm font-bold text-white tracking-wider uppercase">
            {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
          </h4>
          <div className="flex flex-col gap-2.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className="font-body-md text-xs text-white/60 hover:text-white underline decoration-white/20 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Contact details (span 4) */}
        <div className="lg:col-span-4 flex flex-col items-start gap-4">
          <h4 className="font-headline-lg text-sm font-bold text-white tracking-wider uppercase">
            {lang === 'ar' ? 'بيانات الاتصال' : 'Contact Us'}
          </h4>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs text-white/60 hover:text-white transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </div>
              <span className="font-semibold">{t.footer.contact.whatsapp}</span>
            </a>
            <div className="flex items-center gap-2.5 text-xs text-white/60">
              <div className="w-7 h-7 rounded-full bg-primary-fixed/10 flex items-center justify-center text-primary-fixed">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
              </div>
              <span className="font-semibold">{t.footer.contact.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-white/60">
              <div className="w-7 h-7 rounded-full bg-secondary-fixed/10 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
              </div>
              <span className="font-semibold">
                {lang === 'ar' ? 'السبت - الخميس: 09:00 ص - 20:00 م' : 'Sat - Thu: 09:00 AM - 20:00 PM'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-white/5 text-center relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body-md text-[10px] text-white/40 tracking-wider">
          {t.footer.copyright}
        </p>
        <div className="flex gap-4 text-[10px] text-white/35 font-semibold">
          <a href="#" className="hover:text-white transition-colors">
            {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">
            {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </a>
        </div>
      </div>
    </footer>
  );
};
