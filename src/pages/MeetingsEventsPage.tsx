import React, { useState } from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { PageBanner } from '../components/PageBanner';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Lightbox } from '../components/Lightbox';
import { EventEnquiryForm } from '../components/EventEnquiryForm';
import { Seo } from '../components/Seo';
import { Users, Heart, CheckCircle2, Sparkles, Calendar } from 'lucide-react';

export const MeetingsEventsPage: React.FC = () => {
  const { meetingsAndEvents } = HOTEL_DATA;

  // Gallery items for Meetings & Events
  const eventGallery = [
    {
      id: 'conf-large',
      imageSlot: 'conference-large',
      title: 'Large Conference Venue (150-seater)',
      alt: 'Large air-conditioned conference hall for 150 guests',
    },
    {
      id: 'conf-mini',
      imageSlot: 'conference-mini',
      title: 'Mini Conference Room (60-seater)',
      alt: 'Mini conference venue for 60 guests',
    },
    {
      id: 'wed-1',
      imageSlot: 'wedding-1',
      title: 'Wedding Reception Setup',
      alt: 'Wedding reception celebration at RHOGEM Hotel',
    },
    {
      id: 'wed-2',
      imageSlot: 'wedding-2',
      title: 'Outdoor Banquet Area',
      alt: 'Outdoor garden event setup for celebrations',
    },
    {
      id: 'wed-3',
      imageSlot: 'wedding-3',
      title: 'Private Event Dining',
      alt: 'Private function dining setup for guests',
    },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const openPhoto = (idx: number) => {
    setActivePhotoIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <Seo
        title="Meetings, Conferences & Weddings | RHOGEM Hotel Takoradi"
        description="Air-conditioned conference halls (150-seater and 60-seater) and exclusive wedding packages in Takoradi. Residential rates and tailor-made event planning."
      />

      {/* Banner */}
      <PageBanner
        label="Corporate & Social Gatherings"
        title="Meetings & Events"
        intro="Two dedicated air-conditioned conference halls and exclusive wedding packages in Ahanta West, Takoradi."
      />

      {/* Section 1: Meetings & Conferences */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[var(--white)]" aria-label="Meetings & Conferences">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="section-label">Corporate Functions</span>
                <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1">
                  Meetings & Conferences
                </h2>
                <div className="w-12 h-[2px] bg-[var(--gold)] mt-2" aria-hidden="true" />
              </div>

              <p className="text-[var(--charcoal)] text-base sm:text-lg leading-relaxed">
                {meetingsAndEvents.conferences}
              </p>

              <div className="bg-[var(--ivory)] p-6 rounded-[4px] border border-[var(--gold-soft)] space-y-3">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--crimson)]">
                  Included Conference Package Highlights:
                </h3>
                <ul className="space-y-2 text-sm text-[var(--charcoal)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <span>Two venue options: 150-seater large hall and 60-seater mini hall</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <span>Room setup tailored to your meeting style (U-shape, theater, classroom)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <span>Stationery, notepads, pens, and chilled mineral water</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <span>Audiovisual equipment and high-speed Wi-Fi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <span>Full-board residential conference rates available on request</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[16/10] rounded-[4px] overflow-hidden border border-[var(--gold-soft)] shadow-sm bg-[var(--ivory)]">
                <ImageWithFallback
                  slot="conference-large"
                  alt="Large Conference Hall 150-seater at RHOGEM Hotel"
                  aspectRatio="16/9"
                />
              </div>
              <div className="aspect-[16/9] rounded-[4px] overflow-hidden border border-[var(--gold-soft)] shadow-sm bg-[var(--ivory)]">
                <ImageWithFallback
                  slot="conference-mini"
                  alt="Mini Conference Room 60-seater at RHOGEM Hotel"
                  aspectRatio="16/9"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Weddings & Outdoor Events */}
      <section
        id="weddings"
        className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 bg-[var(--ivory)] border-t border-[var(--gold-soft)]"
        aria-label="Weddings and Outdoor Celebrations"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <div>
                <span className="section-label">Celebrations</span>
                <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1">
                  Weddings & Outdoor Events
                </h2>
                <div className="w-12 h-[2px] bg-[var(--gold)] mt-2" aria-hidden="true" />
              </div>

              <p className="text-[var(--charcoal)] text-base sm:text-lg leading-relaxed">
                {meetingsAndEvents.weddings}
              </p>

              <div className="bg-[var(--white)] p-6 rounded-[4px] border border-[var(--gold-soft)] space-y-3">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--crimson)]">
                  Wedding Hosting Benefits:
                </h3>
                <ul className="space-y-2 text-sm text-[var(--charcoal)]">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[var(--crimson)] shrink-0" aria-hidden="true" />
                    <span>Exclusive hotel hire option for complete privacy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[var(--crimson)] shrink-0" aria-hidden="true" />
                    <span>Pre-wedding family dinner in our dining room</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[var(--crimson)] shrink-0" aria-hidden="true" />
                    <span>Spacious executive rooms for the bridal couple and special guests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[var(--crimson)] shrink-0" aria-hidden="true" />
                    <span>Pre-wedding breakfast and post-wedding reception catering packages</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <div className="aspect-[4/3] rounded-[4px] overflow-hidden border border-[var(--gold-soft)] shadow-md bg-[var(--white)]">
                <ImageWithFallback
                  slot="wedding-1"
                  alt="Weddings & Outdoor Celebrations at RHOGEM Hotel"
                  aspectRatio="4/3"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Event Photo Gallery (wedding-1..3, conference-large, conference-mini) */}
      <section className="py-16 px-4 sm:px-6 bg-[var(--white)] border-t border-[var(--gold-soft)]" aria-label="Venues Gallery">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="section-label">Gallery</span>
            <h2 className="font-heading text-3xl text-[var(--espresso)] font-bold mt-1">
              Our Venues & Celebrations
            </h2>
            <p className="text-xs text-[var(--grey)] mt-1">
              Click on any photograph to view in full screen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {eventGallery.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openPhoto(idx)}
                className="group relative aspect-[4/3] rounded-[4px] overflow-hidden border border-[var(--gold-soft)] bg-[var(--ivory)] text-left focus:ring-2 focus:ring-[var(--gold)]"
                aria-label={`View ${item.title}`}
              >
                <ImageWithFallback
                  slot={item.imageSlot}
                  alt={item.alt}
                  aspectRatio="4/3"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[11px] text-white font-sans font-bold line-clamp-1">
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Event Enquiry Form (F3) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--ivory)] border-t border-[var(--gold-soft)]" aria-label="Event Enquiry Form">
        <div className="max-w-2xl mx-auto">
          <EventEnquiryForm />
        </div>
      </section>

      {/* Lightbox for Event Gallery */}
      <Lightbox
        items={eventGallery}
        currentIndex={activePhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setActivePhotoIdx}
      />
    </>
  );
};
