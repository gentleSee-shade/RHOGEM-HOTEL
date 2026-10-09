import React from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { useBooking } from '../context/BookingContext';
import { Phone, CalendarCheck } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const { openBookingModal } = useBooking();
  const { contact } = HOTEL_DATA;

  return (
    <aside
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--white)] border-t border-[var(--gold-soft)] shadow-[0_-4px_16px_rgba(43,27,22,0.1)] px-2 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={contact.primaryPhoneTel}
          className="flex flex-col items-center justify-center py-2 px-1 rounded bg-[var(--ivory)] hover:bg-[var(--gold-soft)]/50 text-[var(--charcoal)] border border-[var(--gold-soft)] text-center transition-colors min-h-[44px]"
          aria-label="Call RHOGEM Hotel"
        >
          <Phone className="w-4 h-4 text-[var(--crimson)] mb-1 shrink-0" aria-hidden="true" />
          <span className="text-[12px] font-sans font-bold uppercase tracking-wider leading-none">
            Call
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded bg-[var(--ivory)] hover:bg-[var(--gold-soft)]/50 text-[var(--charcoal)] border border-[var(--gold-soft)] text-center transition-colors min-h-[44px]"
          aria-label="Chat with RHOGEM Hotel on WhatsApp"
        >
          <svg
            className="w-4 h-4 text-[#25D366] fill-current mb-1 shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.242-.038.375.281.144.346.491 1.2.534 1.288.043.088.072.191.014.306-.058.115-.087.187-.173.289l-.26.306c-.087.086-.177.18-.076.353.101.173.45 1.411 1.666 2.083.473.262.83.356 1.074.433.245.077.389.066.534-.101.144-.167.62-1.025.786-1.378.166-.353.332-.295.56-.21l1.767.834c.228.085.38.14.437.237.058.097.058.563-.086.968zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.444 5.176L2 22l4.982-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
          <span className="text-[12px] font-sans font-bold uppercase tracking-wider leading-none">
            WhatsApp
          </span>
        </a>

        {/* Book Button */}
        <button
          type="button"
          onClick={() => openBookingModal()}
          className="flex flex-col items-center justify-center py-2 px-1 rounded bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white text-center transition-colors min-h-[44px]"
          aria-label="Open booking enquiry form"
        >
          <CalendarCheck className="w-4 h-4 text-white mb-1 shrink-0" aria-hidden="true" />
          <span className="text-[12px] font-sans font-bold uppercase tracking-wider leading-none">
            Book
          </span>
        </button>
      </div>
    </aside>
  );
};
