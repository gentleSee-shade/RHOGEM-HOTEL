import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOTEL_DATA } from '../data/hotel';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { contact } = HOTEL_DATA;
  const [mapError, setMapError] = useState(false);

  return (
    <footer className="bg-[var(--espresso)] text-white relative select-none">
      {/* 3px Kente-inspired band on top edge */}
      <div className="kente-band" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-12">
        {/* Three Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Column 1: Book Now! */}
          <div>
            <h3 className="font-heading text-xl text-[var(--gold)] mb-4 uppercase tracking-wider">
              Book Now!
            </h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Reach our front desk directly for reservations, event bookings, and general enquiries.
            </p>

            {/* Contact details */}
            <ul className="space-y-3 text-sm text-white/90">
              {contact.phoneNumbers.map((phone, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <a
                      href={phone.tel}
                      className="hover:text-[var(--gold)] transition-colors font-medium"
                    >
                      {phone.number}
                    </a>
                    <span className="text-white/50 text-xs ml-2">({phone.label})</span>
                  </div>
                </li>
              ))}

              <li className="flex items-start gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <div>
                    <a
                      href={`mailto:${contact.emails.enquiries}`}
                      className="hover:text-[var(--gold)] transition-colors"
                    >
                      {contact.emails.enquiries}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:${contact.emails.customerService}`}
                      className="hover:text-[var(--gold)] transition-colors text-white/70"
                    >
                      {contact.emails.customerService}
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-[var(--gold)] font-bold block mb-3">
                Follow Us
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[var(--crimson)] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[var(--crimson)] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[var(--crimson)] transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c-.01 1.83-.54 3.65-1.57 5.16-1.39 2.06-3.74 3.39-6.24 3.5-1.92.1-3.85-.45-5.41-1.58-1.92-1.39-3.13-3.6-3.27-5.97-.2-2.91 1.17-5.83 3.52-7.46 1.46-1.02 3.24-1.52 5.03-1.43v4.06c-.82-.09-1.68.08-2.4.49-.9.51-1.55 1.41-1.7 2.44-.22 1.24.28 2.54 1.25 3.32.88.72 2.08.97 3.19.7 1.09-.27 2-.04 2.53-1.89.26-.87.35-1.78.35-2.69V.02h-4.99z" />
                  </svg>
                </a>
                <a
                  href={contact.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[var(--crimson)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="font-heading text-xl text-[var(--gold)] mb-4 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link to="/" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Our Rooms</span>
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Amenities & Facilities</span>
                </Link>
              </li>
              <li>
                <Link to="/dining" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Restaurant & Bar Lounge</span>
                </Link>
              </li>
              <li>
                <Link to="/meetings-events" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Meetings, Conferences & Weddings</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>About RHOGEM Hotel</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Contact & FAQ</span>
                </Link>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-white/5 rounded border border-white/10">
              <span className="text-xs uppercase tracking-wider text-[var(--gold)] font-bold block mb-1">
                Quick Enquiry
              </span>
              <p className="text-xs text-white/70 mb-3">
                Send a fast message directly to our reservations team.
              </p>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[var(--gold)] transition-colors"
              >
                <span>Chat via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: Find Us (replaces "Our Awards") */}
          <div>
            <h3 className="font-heading text-xl text-[var(--gold)] mb-4 uppercase tracking-wider">
              Find Us
            </h3>
            
            {/* Embedded Map */}
            <div className="w-full h-44 rounded overflow-hidden border border-white/10 mb-4 bg-black/20">
              {!mapError ? (
                <iframe
                  title="RHOGEM Hotel Location Map"
                  src={contact.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onError={() => setMapError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-xs text-white/70">
                  <MapPin className="w-6 h-6 text-[var(--gold)] mb-1" aria-hidden="true" />
                  <span>{contact.address}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-white/90 flex items-start gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {contact.address}
                <br />
                <span className="text-white/60 text-xs">{contact.poBox}</span>
              </span>
            </p>

            <a
              href={contact.getDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>

        {/* Hotel Summary Sentence */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center sm:text-left">
          <p className="text-sm text-white/70 max-w-3xl leading-relaxed">
            Welcome to RHOGEM Hotel, in the heart of Ahanta West, Takoradi. Our team is focused on warm, personalised service and comfortable rooms, welcoming guests since January 2016.
          </p>
        </div>

        {/* Base Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {currentYear} RHOGEM Hotel. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/rooms" className="hover:text-white transition-colors">Rooms</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
