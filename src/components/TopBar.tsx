import React from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { MapPin, Phone } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { contact, locationBrief } = HOTEL_DATA;

  return (
    <div className="hidden lg:block bg-[var(--espresso)] text-white text-[13px] border-b border-white/10 select-none">
      <div className="max-w-[1200px] mx-auto px-6 h-10 flex items-center justify-between">
        {/* Left: Location */}
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
          <span>{locationBrief}</span>
        </div>

        {/* Right: Phone & Socials */}
        <div className="flex items-center gap-6">
          <a
            href={contact.primaryPhoneTel}
            className="flex items-center gap-2 text-white/90 hover:text-[var(--gold)] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
            <span className="font-semibold">{contact.primaryPhone}</span>
          </a>

          <div className="h-3.5 w-px bg-white/20" aria-hidden="true" />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href={contact.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RHOGEM Hotel on Facebook"
              className="text-white/80 hover:text-[var(--gold)] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RHOGEM Hotel on Instagram"
              className="text-white/80 hover:text-[var(--gold)] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={contact.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RHOGEM Hotel on TikTok"
              className="text-white/80 hover:text-[var(--gold)] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c-.01 1.83-.54 3.65-1.57 5.16-1.39 2.06-3.74 3.39-6.24 3.5-1.92.1-3.85-.45-5.41-1.58-1.92-1.39-3.13-3.6-3.27-5.97-.2-2.91 1.17-5.83 3.52-7.46 1.46-1.02 3.24-1.52 5.03-1.43v4.06c-.82-.09-1.68.08-2.4.49-.9.51-1.55 1.41-1.7 2.44-.22 1.24.28 2.54 1.25 3.32.88.72 2.08.97 3.19.7 1.09-.27 2-.04 2.53-1.89.26-.87.35-1.78.35-2.69V.02h-4.99z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={contact.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RHOGEM Hotel on LinkedIn"
              className="text-white/80 hover:text-[var(--gold)] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
