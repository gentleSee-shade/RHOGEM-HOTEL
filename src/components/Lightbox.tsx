import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface LightboxProps {
  items: Array<{ id: string; imageSlot: string; title: string; alt: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = items.length;
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % total);
  }, [currentIndex, total, onSelectIndex]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || total <= 1) return;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    const prevSlot = items[prevIndex]?.imageSlot;
    const nextSlot = items[nextIndex]?.imageSlot;

    if (prevSlot && HOTEL_DATA.images[prevSlot]) {
      const img1 = new Image();
      img1.src = HOTEL_DATA.images[prevSlot];
    }
    if (nextSlot && HOTEL_DATA.images[nextSlot]) {
      const img2 = new Image();
      img2.src = HOTEL_DATA.images[nextSlot];
    }
  }, [currentIndex, isOpen, items, total]);

  // Keyboard navigation & Esc & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close Button */}
      <div
        className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-sans tracking-widest uppercase text-[var(--gold)]">
          {currentIndex + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div
        className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-full bg-black/50 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
        </button>

        {/* Display Image or Fallback */}
        <div className="max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-[4px] border border-white/10 shadow-2xl">
          <ImageWithFallback
            slot={currentItem.imageSlot}
            alt={currentItem.alt}
            className="max-h-[75vh] w-auto object-contain"
            priority={true}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-full bg-black/50 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div
        className="w-full max-w-5xl text-center py-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-white text-base font-heading tracking-wide">
          {currentItem.title}
        </h4>
        <p className="text-white/60 text-xs mt-0.5">
          {currentItem.alt}
        </p>
      </div>
    </div>
  );
};
