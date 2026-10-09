import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Calendar, Users, Moon } from 'lucide-react';

interface CheckAvailabilityBarProps {
  id?: string;
  className?: string;
}

export const CheckAvailabilityBar: React.FC<CheckAvailabilityBarProps> = ({
  id = 'availability',
  className = '',
}) => {
  const {
    state,
    setCheckIn,
    setCheckOut,
    setNights,
    setAdults,
    setChildrenCount,
    openBookingModal,
    formattedCheckIn,
    formattedCheckOut,
    minDate,
  } = useBooking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal();
  };

  return (
    <section
      id={id}
      aria-label="Check Room Availability"
      className={`bg-[var(--ivory)] border-y border-[var(--gold-soft)] py-8 px-4 sm:px-6 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-6">
          <span className="section-label">Check Availability</span>
          <h2 className="text-2xl sm:text-3xl font-heading text-[var(--espresso)] mt-1">
            Plan Your Stay in Takoradi
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--white)] p-4 sm:p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm"
        >
          {/* Desktop 1-row / Mobile 2-column grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-end">
            
            {/* Field 1: Check In */}
            <div className="col-span-1">
              <label
                htmlFor="bar-checkin"
                className="block text-[12px] font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5"
              >
                Check In
              </label>
              <div className="relative">
                <input
                  id="bar-checkin"
                  type="date"
                  min={minDate}
                  value={state.checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2.5 px-3 bg-[var(--ivory)]/50 border border-[var(--gold-soft)] rounded-[4px] text-[var(--charcoal)] focus:bg-[var(--white)]"
                  required
                />
              </div>
              <span className="block text-[11px] text-[var(--grey)] mt-1 truncate">
                {formattedCheckIn}
              </span>
            </div>

            {/* Field 2: Nights */}
            <div className="col-span-1">
              <label
                htmlFor="bar-nights"
                className="block text-[12px] font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5"
              >
                Nights
              </label>
              <select
                id="bar-nights"
                value={state.nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full text-xs sm:text-sm py-2.5 px-3 bg-[var(--ivory)]/50 border border-[var(--gold-soft)] rounded-[4px] text-[var(--charcoal)] focus:bg-[var(--white)]"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'night' : 'nights'}
                  </option>
                ))}
              </select>
              <span className="block text-[11px] text-[var(--grey)] mt-1">
                Stay duration
              </span>
            </div>

            {/* Field 3: Check Out */}
            <div className="col-span-1">
              <label
                htmlFor="bar-checkout"
                className="block text-[12px] font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5"
              >
                Check Out
              </label>
              <div className="relative">
                <input
                  id="bar-checkout"
                  type="date"
                  min={state.checkIn}
                  value={state.checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2.5 px-3 bg-[var(--ivory)]/50 border border-[var(--gold-soft)] rounded-[4px] text-[var(--charcoal)] focus:bg-[var(--white)]"
                  required
                />
              </div>
              <span className="block text-[11px] text-[var(--grey)] mt-1 truncate">
                {formattedCheckOut}
              </span>
            </div>

            {/* Field 4: Adults */}
            <div className="col-span-1">
              <label
                htmlFor="bar-adults"
                className="block text-[12px] font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5"
              >
                Adults
              </label>
              <select
                id="bar-adults"
                value={state.adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full text-xs sm:text-sm py-2.5 px-3 bg-[var(--ivory)]/50 border border-[var(--gold-soft)] rounded-[4px] text-[var(--charcoal)] focus:bg-[var(--white)]"
              >
                {[1, 2, 3, 4, 5, 6].map((a) => (
                  <option key={a} value={a}>
                    {a} {a === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
              <span className="block text-[11px] text-[var(--grey)] mt-1">
                Ages 13+
              </span>
            </div>

            {/* Field 5: Children */}
            <div className="col-span-1">
              <label
                htmlFor="bar-children"
                className="block text-[12px] font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1.5"
              >
                Children
              </label>
              <select
                id="bar-children"
                value={state.childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                className="w-full text-xs sm:text-sm py-2.5 px-3 bg-[var(--ivory)]/50 border border-[var(--gold-soft)] rounded-[4px] text-[var(--charcoal)] focus:bg-[var(--white)]"
              >
                {[0, 1, 2, 3, 4].map((c) => (
                  <option key={c} value={c}>
                    {c} {c === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
              <span className="block text-[11px] text-[var(--grey)] mt-1">
                Ages 0–12
              </span>
            </div>

            {/* Field 6: Check Availability Button */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <button
                type="submit"
                className="w-full btn-primary h-[44px] sm:h-[48px]"
              >
                Check Availability
              </button>
              <span className="hidden lg:block text-[11px] text-transparent mt-1 select-none">
                .
              </span>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
};
