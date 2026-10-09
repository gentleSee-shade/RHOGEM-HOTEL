import React, { useState, useEffect, useRef } from 'react';
import { useBooking, formatDisplayDate } from '../context/BookingContext';
import { HOTEL_DATA } from '../data/hotel';
import { X, Phone, MessageSquare, Mail, AlertCircle, Info } from 'lucide-react';

export const AvailabilityModal: React.FC = () => {
  const {
    state,
    isModalOpen,
    closeBookingModal,
    setSelectedRoom,
    setFullName,
    setPhone,
    setNotes,
  } = useBooking();

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Store trigger element & handle focus trap + Escape key
  useEffect(() => {
    if (isModalOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeBookingModal();
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
              last.focus();
              e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        previousActiveElement.current?.focus();
      };
    }
  }, [isModalOpen, closeBookingModal]);

  if (!isModalOpen) return null;

  // Resolve room name
  const currentRoomObj = HOTEL_DATA.rooms.find((r) => r.id === state.selectedRoom);
  const roomDisplayName = currentRoomObj ? currentRoomObj.name : 'Any room type';

  const validate = (): boolean => {
    let isValid = true;
    if (!state.fullName.trim()) {
      setNameError('Please enter your full name.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!state.phone.trim() || state.phone.trim().length < 7) {
      setPhoneError('Please enter a valid contact phone number.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const buildMessage = () => {
    const formattedIn = formatDisplayDate(state.checkIn);
    const formattedOut = formatDisplayDate(state.checkOut);

    return `Hello RHOGEM Hotel, I would like to check availability.
Name: ${state.fullName.trim()}
Phone: ${state.phone.trim()}
Room: ${roomDisplayName}
Check-in: ${formattedIn}
Check-out: ${formattedOut} (${state.nights} night(s))
Guests: ${state.adults} adult(s), ${state.childrenCount} child(ren)
Notes: ${state.notes.trim() || 'None'}`;
  };

  const handleSendWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildMessage();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${HOTEL_DATA.contact.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildMessage();
    const subject = encodeURIComponent('Room availability request');
    const body = encodeURIComponent(msg);
    const mailto = `mailto:${HOTEL_DATA.contact.emails.enquiries}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto"
      onClick={closeBookingModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="availability-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[var(--white)] w-full max-w-lg rounded-[4px] border border-[var(--gold-soft)] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[var(--espresso)] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-[var(--gold)]">
              RHOGEM Hotel Takoradi
            </span>
            <h2 id="availability-modal-title" className="text-xl font-heading text-white mt-0.5">
              Room Availability Request
            </h2>
          </div>
          <button
            type="button"
            onClick={closeBookingModal}
            className="p-1.5 text-white/70 hover:text-white rounded hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Summary Box */}
          <div className="bg-[var(--ivory)] p-4 rounded border border-[var(--gold-soft)] text-sm space-y-1.5">
            <div className="font-bold text-[12px] uppercase tracking-wider text-[var(--crimson)] mb-1">
              Stay Summary
            </div>
            <div className="flex justify-between text-[var(--charcoal)]">
              <span className="text-[var(--grey)]">Dates:</span>
              <span className="font-semibold text-right">
                {formatDisplayDate(state.checkIn)} – {formatDisplayDate(state.checkOut)} ({state.nights} {state.nights === 1 ? 'night' : 'nights'})
              </span>
            </div>
            <div className="flex justify-between text-[var(--charcoal)]">
              <span className="text-[var(--grey)]">Guests:</span>
              <span className="font-medium text-right">
                {state.adults} {state.adults === 1 ? 'adult' : 'adults'}
                {state.childrenCount > 0 ? `, ${state.childrenCount} child(ren)` : ''}
              </span>
            </div>
            <div className="flex justify-between text-[var(--charcoal)]">
              <span className="text-[var(--grey)]">Room Type:</span>
              <span className="font-medium text-right text-[var(--crimson)]">{roomDisplayName}</span>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name (Required) */}
            <div>
              <label
                htmlFor="modal-fullname"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
              >
                Full Name <span className="text-[var(--crimson)]">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="modal-fullname"
                type="text"
                value={state.fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (nameError) setNameError('');
                }}
                onBlur={() => {
                  if (!state.fullName.trim()) setNameError('Please enter your full name.');
                }}
                placeholder="e.g. Kwame Mensah"
                aria-describedby={nameError ? 'name-error' : undefined}
                className={`w-full py-2.5 px-3 rounded border text-sm text-[var(--charcoal)] bg-[var(--white)] ${
                  nameError ? 'border-[var(--crimson)] ring-1 ring-[var(--crimson)]' : 'border-[var(--gold-soft)]'
                }`}
                required
              />
              {nameError && (
                <p id="name-error" className="text-xs text-[var(--crimson)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{nameError}</span>
                </p>
              )}
            </div>

            {/* Phone (Required) */}
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
              >
                Contact Phone <span className="text-[var(--crimson)]">*</span>
              </label>
              <input
                id="modal-phone"
                type="tel"
                value={state.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError('');
                }}
                onBlur={() => {
                  if (!state.phone.trim() || state.phone.trim().length < 7) {
                    setPhoneError('Please enter a valid contact phone number.');
                  }
                }}
                placeholder="e.g. +233 50 123 4567"
                aria-describedby={phoneError ? 'phone-error' : undefined}
                className={`w-full py-2.5 px-3 rounded border text-sm text-[var(--charcoal)] bg-[var(--white)] ${
                  phoneError ? 'border-[var(--crimson)] ring-1 ring-[var(--crimson)]' : 'border-[var(--gold-soft)]'
                }`}
                required
              />
              {phoneError && (
                <p id="phone-error" className="text-xs text-[var(--crimson)] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{phoneError}</span>
                </p>
              )}
            </div>

            {/* Room Select (Optional change) */}
            <div>
              <label
                htmlFor="modal-room"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
              >
                Change Room Selection (Optional)
              </label>
              <select
                id="modal-room"
                value={state.selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full py-2.5 px-3 rounded border border-[var(--gold-soft)] text-sm text-[var(--charcoal)] bg-[var(--white)]"
              >
                <option value="any">Any room type</option>
                {HOTEL_DATA.rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} (from {room.priceFormatted}/night)
                  </option>
                ))}
              </select>
            </div>

            {/* Notes (Optional) */}
            <div>
              <label
                htmlFor="modal-notes"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
              >
                Special Requests or Notes (Optional)
              </label>
              <textarea
                id="modal-notes"
                rows={2}
                value={state.notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Estimated arrival time, bedding preference, etc."
                className="w-full py-2 px-3 rounded border border-[var(--gold-soft)] text-sm text-[var(--charcoal)] bg-[var(--white)]"
              />
            </div>
          </form>

          {/* Mandatory Disclaimer Statement */}
          <div className="p-3 bg-[var(--ivory)] rounded border border-[var(--gold-soft)] text-xs text-[var(--grey)] flex items-start gap-2">
            <Info className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              This is an availability request, not a confirmed booking. The hotel will reply to confirm availability and your rate.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Send on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              className="w-full btn-outline flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Send by Email</span>
            </button>
          </div>

          {/* Call us instead */}
          <div className="text-center pt-2">
            <a
              href={HOTEL_DATA.contact.primaryPhoneTel}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--charcoal)] hover:text-[var(--crimson)] font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--crimson)]" aria-hidden="true" />
              <span>Call us instead: {HOTEL_DATA.contact.primaryPhone}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
