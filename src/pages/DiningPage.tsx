import React from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { PageBanner } from '../components/PageBanner';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Seo } from '../components/Seo';
import { Phone, MessageSquare, Wine, Bell } from 'lucide-react';

export const DiningPage: React.FC = () => {
  const { dining, contact } = HOTEL_DATA;

  return (
    <>
      <Seo
        title="Restaurant, Bar & Room Service | RHOGEM Hotel Takoradi"
        description="Eat in our restaurant, relax in the bar and shared lounge, or enjoy room service at RHOGEM Hotel Takoradi. Contact us for today's menu and operating hours."
      />

      {/* Banner */}
      <PageBanner
        label="Food & Drinks"
        title="Dining & Bar Lounge"
        intro="Savour freshly prepared cuisine, refreshing drinks, and relaxed hospitality right here at the hotel in Takoradi."
      />

      {/* Full-width Restaurant Image */}
      <section className="bg-[var(--white)] py-12 px-4 sm:px-6" aria-label="Restaurant Atmosphere">
        <div className="max-w-[1200px] mx-auto">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[4px] overflow-hidden border border-[var(--gold-soft)] shadow-md bg-[var(--ivory)]">
            <ImageWithFallback
              slot="restaurant"
              alt="RHOGEM Hotel Restaurant & Dining Area"
              aspectRatio="16/9"
              priority={true}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Dining Copy & Feature Cards */}
      <section className="py-12 pb-20 px-4 sm:px-6 bg-[var(--white)]" aria-label="Dining Experience">
        <div className="max-w-[1200px] mx-auto space-y-16">
          
          {/* Main Dining Paragraph */}
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label">Culinary Hospitality</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1 mb-6">
              A Highlight of Your Stay
            </h2>
            <p className="text-lg sm:text-xl text-[var(--charcoal)] leading-relaxed font-sans font-normal">
              {dining.copy}
            </p>
          </div>

          {/* Feature cards for Bar and Shared Lounge, and Room Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Feature 1: Bar & Shared Lounge */}
            <div className="bg-[var(--ivory)] p-8 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[var(--white)] border border-[var(--gold-soft)] flex items-center justify-center text-[var(--gold)] mb-5">
                  <Wine className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl text-[var(--espresso)] font-bold mb-3">
                  Bar & Shared Lounge
                </h3>
                <p className="text-sm sm:text-base text-[var(--charcoal)] leading-relaxed">
                  Relax with refreshing beverages, chilled drinks, and comfortable seating in a convivial atmosphere suitable for socialising or unwinding after work.
                </p>
              </div>
            </div>

            {/* Feature 2: Room Service */}
            <div className="bg-[var(--ivory)] p-8 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[var(--white)] border border-[var(--gold-soft)] flex items-center justify-center text-[var(--gold)] mb-5">
                  <Bell className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl text-[var(--espresso)] font-bold mb-3">
                  Room Service
                </h3>
                <p className="text-sm sm:text-base text-[var(--charcoal)] leading-relaxed">
                  Have delicious, freshly prepared dishes and refreshments brought directly to your room so you can dine in total comfort and privacy.
                </p>
              </div>
            </div>

          </div>

          {/* Panel: Opening hours and today's menu: call or message us */}
          <div className="max-w-3xl mx-auto bg-[var(--espresso)] text-white p-8 sm:p-10 rounded-[4px] shadow-lg text-center">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[var(--gold)] block mb-2">
              Menu & Operating Inquiries
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-bold mb-3">
              Opening hours and today's menu: call or message us
            </h3>
            <p className="text-sm text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Our kitchen prepares fresh selections daily. Speak directly with our restaurant team to inquire about today's offerings, chef specials, or dietary needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={contact.primaryPhoneTel}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Restaurant Desk</span>
              </a>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white-outline w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Render menu section only if it has items (empty by default as required) */}
          {dining.menu && dining.menu.length > 0 && (
            <div className="max-w-3xl mx-auto pt-8 border-t border-[var(--gold-soft)]">
              <h3 className="font-heading text-2xl text-[var(--espresso)] font-bold mb-4 text-center">
                Today's Menu
              </h3>
              <div className="space-y-4">
                {dining.menu.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-[var(--gold-soft)]/50 pb-2">
                    <span className="font-bold text-sm text-[var(--charcoal)]">{item.name}</span>
                    {item.description && (
                      <span className="text-xs text-[var(--grey)]">{item.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};
