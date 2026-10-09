import React from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { PageBanner } from '../components/PageBanner';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Seo } from '../components/Seo';
import { Link } from 'react-router-dom';
import {
  Wifi,
  ShieldCheck,
  Clock,
  Compass,
  Waves,
  Tv,
  Bell,
  Wine,
  Palette,
} from 'lucide-react';

export const AmenitiesPage: React.FC = () => {
  // Map "Also Included" items to icons
  const getAlsoIncludedIcon = (item: string) => {
    switch (item) {
      case 'Complimentary Wi-Fi':
        return <Wifi className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case '24-hour security':
        return <ShieldCheck className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case '24-hour front desk':
        return <Clock className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case 'Private balcony rooms':
        return <Compass className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case 'River views':
        return <Waves className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case 'Flat-screen TVs with DSTV':
        return <Tv className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case 'Room service':
        return <Bell className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case 'Bar and shared lounge':
        return <Wine className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      case 'Fine art collection':
        return <Palette className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
      default:
        return <Wifi className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />;
    }
  };

  return (
    <>
      <Seo
        title="Amenities & Facilities | RHOGEM Hotel Takoradi"
        description="Discover RHOGEM Hotel facilities: outdoor swimming pool, gym with personal training, restaurant, bar lounge, and modern conference rooms in Takoradi."
      />

      {/* Banner */}
      <PageBanner
        label="Facilities & Comfort"
        title="Hotel Amenities"
        intro="Relax, recharge, and stay productive with our comprehensive on-site facilities, whether you are unwinding by the pool or hosting meetings."
      />

      {/* Alternating image/text blocks for 5 main amenities */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--white)]" aria-label="Key Facilities">
        <div className="max-w-[1200px] mx-auto space-y-20">
          {HOTEL_DATA.amenities.blocks.map((block, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={block.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-6 rounded-[4px] overflow-hidden border border-[var(--gold-soft)] shadow-sm bg-[var(--ivory)] ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="aspect-[16/10]">
                    <ImageWithFallback
                      slot={block.imageSlot}
                      alt={block.alt}
                      aspectRatio="16/9"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <span className="section-label">Facility</span>
                  <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1 mb-4">
                    {block.title}
                  </h2>
                  <div className="w-12 h-[2px] bg-[var(--gold)] mb-5" aria-hidden="true" />
                  <p className="text-[var(--charcoal)] text-base sm:text-lg leading-relaxed mb-6">
                    {block.description}
                  </p>

                  {/* Contextual links */}
                  {block.id === 'restaurant' && (
                    <Link to="/dining" className="btn-outline text-xs">
                      View Dining Details →
                    </Link>
                  )}
                  {(block.id === 'conference-mini' || block.id === 'conference-large') && (
                    <Link to="/meetings-events" className="btn-outline text-xs">
                      Event Packages & Bookings →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Also Included Grid */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--ivory)] border-t border-[var(--gold-soft)]" aria-label="Also Included">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">All-Inclusive Conveniences</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1">
              Also Included
            </h2>
            <div className="max-w-[100px] mx-auto mt-4">
              <div className="kente-band rounded-full" aria-hidden="true" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOTEL_DATA.amenities.alsoIncluded.map((item, idx) => (
              <div
                key={idx}
                className="bg-[var(--white)] p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1 duration-200"
              >
                <div className="p-3 bg-[var(--ivory)] rounded-full border border-[var(--gold-soft)] shrink-0">
                  {getAlsoIncludedIcon(item)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-[var(--espresso)] mb-1">
                    {item}
                  </h3>
                  <span className="text-xs text-[var(--grey)]">
                    Standard guest amenity at RHOGEM Hotel.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
