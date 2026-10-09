import React, { useState } from 'react';
import { HOTEL_DATA } from '../data/hotel';

interface ImageWithFallbackProps {
  slot: string;
  alt: string;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | '1/1' | 'auto';
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  slot,
  alt,
  className = '',
  aspectRatio = '4/3',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const src = HOTEL_DATA.images[slot];

  const aspectClass =
    aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : '';

  // If missing or error, render the required fallback:
  // "A missing file must show an ivory block with a gold hairline border and the slot name in small caps, never a broken icon."
  if (!src || hasError) {
    return (
      <div
        className={`w-full ${aspectClass} bg-[var(--ivory)] border border-[var(--gold-soft)] flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 mb-2 rounded-full border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <span
          className="font-sans font-bold text-[11px] tracking-widest uppercase text-[var(--charcoal)]"
          style={{ fontVariant: 'small-caps' }}
        >
          {slot}
        </span>
        <span className="text-[11px] text-[var(--grey)] mt-0.5 line-clamp-1 max-w-[90%]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover ${aspectClass} ${className}`}
    />
  );
};
