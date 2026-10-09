import React from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { PageBanner } from '../components/PageBanner';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Seo } from '../components/Seo';
import { Link } from 'react-router-dom';
import { CalendarCheck, Shield, Users, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { about } = HOTEL_DATA;

  return (
    <>
      <Seo
        title="About Us | RHOGEM Hotel Takoradi, Ghana"
        description="Learn about RHOGEM Hotel in Ahanta West, Takoradi. Welcoming guests since January 2016 with quiet surroundings, warm Ghanaian service, and genuine value."
      />

      {/* Banner */}
      <PageBanner
        label="Our Story"
        title="About RHOGEM Hotel"
        intro="A privately run hotel dedicated to genuine hospitality, quiet comfort, and attentive service in Takoradi, Western Region."
      />

      {/* Hotel Story Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--white)]" aria-label="Hotel Story">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="section-label">Since 2016</span>
                <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1">
                  Warm Hospitality in Ahanta West
                </h2>
                <div className="w-12 h-[2px] bg-[var(--gold)] mt-2" aria-hidden="true" />
              </div>

              {/* Exact brief copy */}
              <p className="text-[var(--charcoal)] text-base sm:text-lg leading-relaxed font-normal">
                {about.story}
              </p>

              {/* Welcoming guests since January 2016 highlight */}
              <div className="p-6 bg-[var(--ivory)] rounded-[4px] border border-[var(--gold-soft)] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--white)] border border-[var(--gold-soft)] flex items-center justify-center text-[var(--gold)] shrink-0">
                  <CalendarCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--crimson)] block">
                    Established Milestone
                  </span>
                  <p className="text-base sm:text-lg font-heading font-bold text-[var(--espresso)]">
                    {about.establishedBadge}
                  </p>
                </div>
              </div>
            </div>

            {/* Circular or featured photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-[4px] overflow-hidden border border-[var(--gold-soft)] shadow-md bg-[var(--ivory)]">
                <ImageWithFallback
                  slot="about-1"
                  alt="RHOGEM Hotel grounds and reception"
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Three-item row: Why guests choose RHOGEM */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--ivory)] border-y border-[var(--gold-soft)]" aria-label="Why Choose Us">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">The RHOGEM Difference</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1">
              Why Guests Choose RHOGEM
            </h2>
            <div className="max-w-[100px] mx-auto mt-4">
              <div className="kente-band rounded-full" aria-hidden="true" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.reasonsToChoose.map((reason, idx) => (
              <div
                key={idx}
                className="bg-[var(--white)] p-8 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[var(--ivory)] border border-[var(--gold-soft)] flex items-center justify-center text-[var(--crimson)] mb-5">
                    {idx === 0 && <Shield className="w-6 h-6 text-[var(--gold)]" aria-hidden="true" />}
                    {idx === 1 && <HeartHandshake className="w-6 h-6 text-[var(--gold)]" aria-hidden="true" />}
                    {idx === 2 && <Users className="w-6 h-6 text-[var(--gold)]" aria-hidden="true" />}
                  </div>
                  <h3 className="font-heading text-2xl text-[var(--espresso)] font-bold mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--charcoal)] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action band to Rooms and Contact (No client logo strip!) */}
      <section className="py-16 px-4 sm:px-6 bg-[var(--white)]" aria-label="Next steps">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="section-label">Plan Your Visit</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold">
            Experience Our Hospitality in Takoradi
          </h2>
          <p className="text-[var(--grey)] text-base max-w-xl mx-auto">
            Whether booking an overnight stay or planning a special event, our team is ready to welcome you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/rooms" className="w-full sm:w-auto btn-primary">
              View Room Categories
            </Link>
            <Link to="/contact" className="w-full sm:w-auto btn-outline">
              Get in Touch with Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
