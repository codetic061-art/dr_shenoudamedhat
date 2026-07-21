import React, { useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { useTheme } from '../hooks/useTheme';

export const Navbar = () => {
  const { lang, t, toggle } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'work', label: t.nav.work },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'faq', label: t.nav.faq },
  ];

  return (
    <header>
      <nav
        id="navbar"
        role="navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--navbar-bg-scrolled)] backdrop-blur-xl border-b border-[var(--border-outline-20)] shadow-md py-3'
            : 'bg-[var(--navbar-bg-top)] backdrop-blur-md border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-2 group hover:scale-102 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-primary text-[32px] group-hover:rotate-12 transition-transform duration-300">
              dentistry
            </span>
            <span className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
              {lang === 'ar' ? 'د. شنودة' : 'Dr. Shenouda'}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="font-body-md text-sm tracking-wide uppercase text-on-surface-variant hover:text-primary hover:scale-102 transition-all duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="text-on-surface-variant hover:text-primary hover:scale-105 transition-all p-2 rounded-full hover:bg-surface-container"
              aria-label="Toggle Theme"
            >
              <span className="material-symbols-outlined text-[24px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Language Toggle */}
            <button
              id="lang-toggle"
              onClick={toggle}
              className="relative flex items-center justify-center p-1 bg-surface-container rounded-full border border-outline-variant hover:scale-105 transition-all duration-300 group"
              aria-label="Toggle Language"
            >
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                  lang === 'en'
                    ? 'bg-surface-container-highest text-primary shadow-sm'
                    : 'text-on-surface-variant group-hover:text-primary'
                }`}
              >
                EN
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold font-label-ar rounded-full transition-all duration-300 ${
                  lang === 'ar'
                    ? 'bg-surface-container-highest text-primary shadow-sm'
                    : 'text-on-surface-variant group-hover:text-primary'
                }`}
              >
                عربي
              </span>
            </button>

            {/* Booking Button */}
            <a
              id="nav-booking-cta"
              href="/book"
              className="bg-primary-container text-on-primary font-cta text-xs uppercase px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 hover:bg-primary transition-all duration-300 shadow-sm"
            >
              <span>{t.nav.book}</span>
              <span className={`material-symbols-outlined text-[16px] ${lang === 'ar' ? 'rotate-180' : ''}`}>
                arrow_forward
              </span>
            </a>
          </div>

          {/* Mobile Actions Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggle}
              className="text-xs font-bold text-primary bg-surface-container px-2.5 py-1.5 rounded-full border border-[var(--border-outline-20)] shadow-sm"
              aria-label="Toggle Language"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="text-on-surface-variant hover:text-primary p-2 rounded-full bg-surface-container"
              aria-label="Toggle Theme"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-primary p-2 rounded-full bg-surface-container"
              aria-label="Toggle Navigation Drawer"
              aria-expanded={isDrawerOpen}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isDrawerOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-y-0 ${
            lang === 'ar' ? 'right-0' : 'left-0'
          } w-3/4 max-w-[300px] h-screen bg-surface-container shadow-2xl z-40 p-6 flex flex-col justify-between transform transition-transform duration-300 md:hidden border-r border-[var(--border-outline-20)] ${
            isDrawerOpen
              ? 'translate-x-0'
              : lang === 'ar'
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-8 mt-16">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]">
                dentistry
              </span>
              <span className="font-headline-lg text-xl font-bold text-primary">
                {lang === 'ar' ? 'د. شنودة' : 'Dr. Shenouda'}
              </span>
            </div>
            
            <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className="font-body-md text-base tracking-wide uppercase text-on-surface-variant hover:text-primary pb-2 border-b border-[var(--border-outline-20)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 mt-auto pb-8">
            <a
              href="/book"
              className="bg-primary text-on-primary font-cta text-sm uppercase py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-transform duration-300"
            >
              <span>{t.nav.book}</span>
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
            </a>
          </div>
        </div>

        {/* Overlay background for drawer */}
        {isDrawerOpen && (
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30 md:hidden transition-all"
          />
        )}
      </nav>
    </header>
  );
};
