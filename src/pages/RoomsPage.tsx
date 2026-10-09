import React from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { useBooking } from '../context/BookingContext';
import { PageBanner } from '../components/PageBanner';
import { CheckAvailabilityBar } from '../components/CheckAvailabilityBar';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Seo } from '../components/Seo';
import {
  Wifi,
  Tv,
  Wind,
  Phone,
  Bath,
  Check,
  Shield,
  Armchair,
  Briefcase,
  Sparkles,
} from 'lucide-react';

export const RoomsPage: React.FC = () => {
  const { openBookingModal } = useBooking();

  // Helper to choose a suitable icon for amenities
  const getFeatureIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes('wi-fi')) return <Wifi className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('tv')) return <Tv className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('air conditioning')) return <Wind className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('telephone')) return <Phone className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('safe')) return <Shield className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('bath') || f.includes('shower')) return <Bath className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('sofa') || f.includes('table')) return <Armchair className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    if (f.includes('work')) return <Briefcase className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
    return <Check className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />;
  };

  return (
    <>
      <Seo
        title="Rooms & Accommodation | RHOGEM Hotel Takoradi"
        description="Explore our four room categories in Takoradi: Standard, Classic, Deluxe, and Executive. Comfortable bedding, quiet surroundings, starting from GH₵350/night."
      />

      {/* Banner */}
      <PageBanner
        label="Accommodation"
        title="Our Rooms & Rates"
        intro="Choose from four thoughtfully appointed room categories, designed for restful comfort, business convenience, or a relaxed family stay in Takoradi."
      />

      {/* Four Alternating Room Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--white)]" aria-label="Room categories">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {HOTEL_DATA.rooms.map((room, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={room.id}
                id={room.id}
                className="scroll-mt-28 bg-[var(--white)] rounded-[4px] border border-[var(--gold-soft)] shadow-md overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column */}
                  <div className={`lg:col-span-6 relative bg-[var(--ivory)] ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="aspect-[4/3] w-full h-full">
                      <ImageWithFallback
                        slot={room.imageSlot}
                        alt={room.alt}
                        aspectRatio="4/3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Detail Column */}
                  <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between ${isEven ? 'lg:order-1' : ''}`}>
                    <div>
                      {/* Room Header */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--gold-soft)]/50 pb-4 mb-4">
                        <div>
                          <span className="text-xs font-sans font-bold tracking-wider uppercase text-[var(--crimson)] block">
                            Room Category
                          </span>
                          <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-0.5">
                            {room.name}
                          </h2>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="font-heading text-2xl sm:text-3xl font-bold text-[var(--crimson)]">
                            From {room.priceFormatted}
                          </span>
                          <span className="block text-xs text-[var(--grey)]">
                            per night
                          </span>
                        </div>
                      </div>

                      {/* Bed & Size specs */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-4 bg-[var(--ivory)] p-3 rounded border border-[var(--gold-soft)]/40">
                        <span>Bed: {room.bed}</span>
                        <span className="text-[var(--gold)]">·</span>
                        <span>Size: {room.size}</span>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--charcoal)] text-base leading-relaxed mb-6">
                        {room.description}
                      </p>

                      {/* Features Grid */}
                      <div className="mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] block mb-3">
                          Room Amenities:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {room.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-[var(--charcoal)]"
                            >
                              {getFeatureIcon(feature)}
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[var(--gold-soft)]/50">
                      <button
                        type="button"
                        onClick={() => openBookingModal(room.id)}
                        className="btn-primary w-full sm:w-auto"
                      >
                        Enquire About This Room
                      </button>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Disclaimer Under Rooms */}
        <div className="max-w-[1200px] mx-auto mt-12 p-4 bg-[var(--ivory)] rounded border border-[var(--gold-soft)] text-center text-xs text-[var(--grey)]">
          <p>
            Prices are starting rates per night. The hotel confirms the final rate and availability when you enquire.
          </p>
        </div>
      </section>

      {/* Reusable Availability Bar */}
      <CheckAvailabilityBar id="availability" />
    </>
  );
};
