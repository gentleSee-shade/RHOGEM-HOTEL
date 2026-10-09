import React, { useState } from 'react';
import { HOTEL_DATA } from '../data/hotel';

interface LogoProps {
  scrolled?: boolean;
  onDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ scrolled = false, onDark = false }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const heightClass = scrolled ? 'h-[44px]' : 'h-[56px]';

  const content = (
    <div className={`flex items-center ${heightClass} transition-all duration-200 select-none`}>
      {!imageFailed ? (
        <img
          src={HOTEL_DATA.images.logo}
          alt="RHOGEM Hotel"
          className={`${heightClass} w-auto object-contain transition-all duration-200`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        /* Fallback text wordmark:
           crimson serif "RHOGEM", tracked grey "HOTEL", with the 'O' featuring a gold double-ring motif */
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center text-[var(--crimson)] font-serif font-bold tracking-wider text-2xl sm:text-3xl">
            <span>RH</span>
            {/* O emblem: gold double-ring with four petals */}
            <span className="relative inline-flex items-center justify-center mx-[1px]">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold)]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
                <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
                {/* 4-petal motif */}
                <path
                  d="M12 6.5C12 9.5 9.5 12 6.5 12C9.5 12 12 14.5 12 17.5C12 14.5 14.5 12 17.5 12C14.5 12 12 9.5 12 6.5Z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            </span>
            <span>GEM</span>
          </div>
          <span className="text-[var(--grey)] font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase mt-0.5 text-center">
            HOTEL
          </span>
        </div>
      )}
    </div>
  );

  if (onDark) {
    return (
      <div className="inline-block bg-[var(--ivory)] px-3 py-1 rounded-[4px] shadow-sm">
        {content}
      </div>
    );
  }

  return content;
};
