import React, { useEffect, useState, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const { lang, t } = useLang();
  const [bioText, setBioText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoading(true);
    // Fetch about-me.md or about-me-ar.md from publicDir based on language
    const bioFile = lang === 'ar' ? '/about-me-ar.md' : '/about-me.md';
    fetch(bioFile)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load bio');
        return res.text();
      })
      .then((text) => {
        setBioText(text);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bio:', err);
        setIsLoading(false);
      });
  }, [lang]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Get mouse offsets relative to the section
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Scale down movement for subtle lag/parallax
    setBlobPos({ x: x * 0.08, y: y * 0.08 });
  };

  const handleMouseLeave = () => {
    setBlobPos({ x: 0, y: 0 });
  };

  // Helper to parse about-me.md simple formatting
  const renderBioContent = () => {
    if (!bioText) return null;
    
    // Split text into lines
    const lines = bioText.split('\n');
    let elements = [];
    let currentList = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip top main H1 header or empty lines
      if (!line || line.startsWith('# About Me') || line === '---') {
        continue;
      }

      // Check for headings
      if (line.startsWith('## ') || line.startsWith('### ')) {
        // Flush any active list
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${key++}`} className="list-disc pl-5 pr-5 mb-5 space-y-2 text-on-surface-variant text-sm">
              {currentList}
            </ul>
          );
          currentList = [];
        }
        const headingText = line.replace(/^[#\s]+/, '');
        elements.push(
          <h3 key={`h-${key++}`} className="font-headline-lg text-lg font-bold text-primary mt-6 mb-3 text-start">
            {headingText}
          </h3>
        );
        continue;
      }

      // Check for bullet list items
      if (line.startsWith('- ')) {
        let itemText = line.replace(/^-\s+/, '');
        // Highlight bold strings in lists
        const boldMatches = itemText.split('**');
        let parsedItem = [];
        for (let idx = 0; idx < boldMatches.length; idx++) {
          if (idx % 2 !== 0) {
            parsedItem.push(<strong key={idx} className="font-bold text-primary">{boldMatches[idx]}</strong>);
          } else {
            parsedItem.push(boldMatches[idx]);
          }
        }
        currentList.push(<li key={`li-${key++}`}>{parsedItem}</li>);
        continue;
      }

      // Plain paragraph, parse bold text inside
      // Flush any active list first
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="list-disc pl-5 pr-5 mb-5 space-y-2 text-on-surface-variant text-sm">
            {currentList}
          </ul>
        );
        currentList = [];
      }

      const boldMatches = line.split('**');
      let parsedParagraph = [];
      for (let idx = 0; idx < boldMatches.length; idx++) {
        if (idx % 2 !== 0) {
          parsedParagraph.push(<strong key={idx} className="font-bold text-primary">{boldMatches[idx]}</strong>);
        } else {
          parsedParagraph.push(boldMatches[idx]);
        }
      }

      elements.push(
        <p key={`p-${key++}`} className="font-body-md text-sm leading-relaxed text-on-surface-variant mb-4 text-start">
          {parsedParagraph}
        </p>
      );
    }

    // Final flush
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="list-disc pl-5 pr-5 mb-5 space-y-2 text-on-surface-variant text-sm">
          {currentList}
        </ul>
      );
    }

    return elements;
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Photo with interactive fluid background */}
        <div className="lg:col-span-5 relative flex items-center justify-center h-[420px] sm:h-[500px]">
          {/* Liquid Blob Background (Large morphing & rotating glow) */}
          <div
            className="absolute w-[300px] sm:w-[385px] h-[300px] sm:h-[385px] bg-gradient-to-tr from-[#00E5B4] via-[#00A0DC] to-[#0032B4] opacity-60 blur-xl filter -z-10 animate-liquid-blob transition-transform duration-500 ease-out"
            style={{ transform: `translate(${blobPos.x}px, ${blobPos.y}px)` }}
          />

          {/* Doctor Portrait Image */}
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="w-[280px] sm:w-[350px] h-[360px] sm:h-[450px] rounded-[32px] overflow-hidden shadow-xl border border-white/20 dark:border-white/5 bg-surface-container relative group flex items-center justify-center"
          >
            {/* Small solid morphing liquid blob directly behind the doctor's silhouette */}
            <div className="absolute w-[92%] h-[92%] bg-gradient-to-tr from-[#00E5B4] via-[#00A0DC] to-[#0032B4] opacity-85 animate-liquid-blob" />

            <img
              src="/about me.png"
              alt={t.about.imgAlt}
              className="w-full h-full object-cover object-top select-none group-hover:scale-103 transition-transform duration-700 relative z-10"
            />
            {/* Soft clinical blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
          </motion.div>
        </div>

        {/* Right Side: Bio Text Content */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: lang === 'ar' ? -40 : 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Header */}
          <h2 className="font-display-lg text-headline-xl text-primary font-bold mb-2">
            {t.about.h2}
          </h2>
          <p className="font-body-md text-sm text-secondary font-semibold uppercase tracking-wider mb-6">
            {t.about.sub}
          </p>

          {/* Achievement Badges Row */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-[var(--hero-badge-bg)] border border-outline-variant px-4 py-2 rounded-full font-body-md text-xs font-bold text-primary shadow-xs">
              {t.about.badges.experience}
            </span>
            <span className="bg-[var(--hero-badge-bg)] border border-outline-variant px-4 py-2 rounded-full font-body-md text-xs font-bold text-primary shadow-xs">
              {t.about.badges.patients}
            </span>
            <span className="bg-[var(--hero-badge-bg)] border border-outline-variant px-4 py-2 rounded-full font-body-md text-xs font-bold text-primary shadow-xs">
              {t.about.badges.certified}
            </span>
          </div>

          {/* Loaded Biography Text */}
          <div className="w-full max-w-[620px]">
            {isLoading ? (
              <div className="flex flex-col gap-3 py-6">
                <div className="h-4 bg-surface-container-high rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-surface-container-high rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-surface-container-high rounded-full w-5/6 animate-pulse"></div>
              </div>
            ) : bioText ? (
              renderBioContent()
            ) : (
              // Edge case empty fallback
              <p className="text-on-surface-variant text-sm italic">
                {lang === 'ar' ? 'المعلومات الحيوية غير متوفرة حالياً.' : 'Biography text is currently unavailable.'}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
