import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { casesData } from '../data/cases';
import { motion, AnimatePresence } from 'framer-motion';

export const BeforeAfterSection = () => {
  const { lang, t } = useLang();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'filling', 'bridge', 'denture'
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  // Map filters to indexes
  const filterMappings = {
    all: [0, 1, 2],
    filling: [0],
    bridge: [1],
    denture: [2]
  };

  // Filter chips in matching order
  const filterKeys = ['all', 'filling', 'bridge', 'denture'];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    const validIndexes = filterMappings[filter];
    // If current index is not in validIndexes, pick the first valid one
    if (!validIndexes.includes(activeIndex)) {
      setActiveIndex(validIndexes[0]);
    }
  };

  // Global listeners: stop drag on pointer-up anywhere, and keep tracking
  // pointer-move even if the pointer leaves the slider container while dragging
  // (otherwise the slider freezes until the cursor returns).
  useEffect(() => {
    const stopDrag = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (clientX) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    };
    const onMouseMove = (e) => onMove(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isDragging]);

  // Kick-off handlers: set dragging + immediately move to the pointer so the
  // slider responds on the initial click instead of waiting for mousemove.
  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    }
  };
  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (sliderRef.current && e.touches.length > 0) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    }
  };

  const activeCase = casesData[activeIndex];
  const caseTranslation = t.beforeafter.cases[activeCase.keyIndex];

  return (
    <section
      id="work"
      className="bg-surface-container-low dark:bg-surface-container/30 py-section-gap overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <h2 className="font-display-lg text-headline-xl text-primary font-bold">
            {t.beforeafter.h2}
          </h2>
          <div className="w-10 h-[2px] bg-secondary/35 rounded-full" />
          <p className="font-body-lg text-sm text-on-surface-variant max-w-[500px]">
            {t.beforeafter.sub}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {filterKeys.map((filter, index) => {
            const label = t.beforeafter.chips[index];
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs ${
                  isActive
                    ? 'bg-primary text-on-primary scale-103'
                    : 'bg-white dark:bg-surface-container-high text-on-surface hover:bg-surface-container hover:text-primary'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Slider Box */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
            <div
              ref={sliderRef}
              className="relative w-full h-[320px] sm:h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 select-none touch-none"
              style={{ touchAction: 'none' }}
            >
            {/* Case After Image (Always sits in the background, fully visible) */}
            <div className="absolute inset-0 w-full h-full bg-surface-container">
              <img
                src={activeCase.afterImage}
                alt={caseTranslation.afterAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
              />
              <span className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} bg-primary-container/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-3.5 py-1.5 rounded-full z-10 uppercase`}>
                {t.beforeafter.labels.after}
              </span>
            </div>

            {/* Case Before Image (Sits in the foreground, clipped on the right/left side) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
              style={{
                clipPath: lang === 'ar' 
                  ? `inset(0 0 0 ${sliderPos}%)` 
                  : `inset(0 ${100 - sliderPos}% 0 0)`
              }}
            >
              <img
                src={activeCase.beforeImage}
                alt={caseTranslation.beforeAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
              />
              <span className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-3.5 py-1.5 rounded-full z-10 uppercase`}>
                {t.beforeafter.labels.before}
              </span>
            </div>

            {/* Draggable Divider Handle */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-25 group active:bg-primary"
              style={{
                left: `${sliderPos}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {/* Central Floating Knob */}
              <div className="w-10 h-10 bg-white dark:bg-surface-container shadow-2xl rounded-full flex items-center justify-center text-primary border border-outline-variant/30 group-hover:scale-110 active:scale-95 transition-transform duration-200">
                <span className="material-symbols-outlined text-[20px] font-light">
                  swap_horiz
                </span>
              </div>
            </div>
          </div>

          {/* Dots Navigation (Only shows valid cases for the current filter) */}
          <div className="flex items-center gap-2 mt-2">
            {filterMappings[activeFilter].map((idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary w-6'
                      : 'bg-outline-variant/60 hover:bg-outline-variant'
                  }`}
                  aria-label={`Switch to case ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
