import React from 'react';

interface PageBannerProps {
  label?: string;
  title: string;
  intro?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  label,
  title,
  intro,
}) => {
  return (
    <div className="bg-[var(--ivory)] border-b border-[var(--gold-soft)] py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        {label && (
          <span className="section-label block mb-2">
            {label}
          </span>
        )}
        <h1 className="font-heading text-[var(--espresso)] text-4xl sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
          {title}
        </h1>
        {/* Signature 3px Kente-inspired band directly under each page's main title */}
        <div className="max-w-[140px] mx-auto mt-5 mb-6">
          <div className="kente-band rounded-full" aria-hidden="true" />
        </div>
        {intro && (
          <p className="text-[var(--grey)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
};
