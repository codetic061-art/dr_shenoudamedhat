import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LangProvider } from './contexts/LangContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ConsultationCTASection } from './components/ConsultationCTASection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import BookingPage from './pages/BookingPage';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased transition-colors duration-300">
      {/* Sticky header containing navigation */}
      <Navbar />

      {/* Main page content sections flow */}
      <main className="flex-grow pt-[80px] md:pt-[90px]">
        <HeroSection />
        <AboutSection />
        <PhilosophySection />
        <ServicesSection />
        <BeforeAfterSection />
        <ReviewsSection />
        <ConsultationCTASection />
        <FAQSection />
      </main>

      {/* Branding and contact links footer */}
      <Footer />

      {/* Floating conversational actions */}
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingPage />} />
        </Routes>
      </LangProvider>
    </ThemeProvider>
  );
}
