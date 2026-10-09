import React from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/PageBanner';
import { Seo } from '../components/Seo';
import { ArrowLeft, Home, Phone } from 'lucide-react';
import { HOTEL_DATA } from '../data/hotel';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Page Not Found | RHOGEM Hotel Takoradi"
        description="The page you are looking for could not be found. Return to RHOGEM Hotel homepage or explore our rooms and amenities."
      />

      <PageBanner
        label="404 Error"
        title="Page Not Found"
        intro="The page you requested may have moved or is unavailable. We invite you to return to our homepage or contact our reception."
      />

      <section className="py-20 px-4 sm:px-6 bg-[var(--white)] text-center">
        <div className="max-w-md mx-auto space-y-6">
          <p className="text-[var(--charcoal)] text-base leading-relaxed">
            Need assistance or looking to book a room? Our front desk team is always on hand to assist you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Return Home</span>
            </Link>
            <a
              href={HOTEL_DATA.contact.primaryPhoneTel}
              className="w-full sm:w-auto btn-outline flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
