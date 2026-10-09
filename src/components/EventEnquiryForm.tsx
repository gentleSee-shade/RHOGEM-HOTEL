import React, { useState } from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { MessageSquare, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export const EventEnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Meeting or conference',
    proposedDate: '',
    expectedGuests: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return !value.trim() ? 'Please provide your full name.' : '';
      case 'phone':
        return !value.trim() || value.trim().length < 7
          ? 'Please enter a valid phone number.'
          : '';
      case 'message':
        return !value.trim() ? 'Please provide details about your event requirements.' : '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message),
    };

    setTouched({
      name: true,
      phone: true,
      message: true,
    });

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.phone && !newErrors.message) {
      setIsSubmitted(true);
    }
  };

  const buildComposedMessage = () => {
    return `Hello RHOGEM Hotel, I would like to make an Event Enquiry.
Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim() || 'Not specified'}
Event Type: ${formData.eventType}
Proposed Date: ${formData.proposedDate || 'Flexible / To be confirmed'}
Expected Guests: ${formData.expectedGuests || 'To be confirmed'}
Message: ${formData.message.trim()}`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(buildComposedMessage());
    window.open(`https://wa.me/${HOTEL_DATA.contact.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    const text = encodeURIComponent(buildComposedMessage());
    const subject = encodeURIComponent(`Event Enquiry: ${formData.eventType} - ${formData.name}`);
    window.location.href = `mailto:${HOTEL_DATA.contact.emails.enquiries}?subject=${subject}&body=${text}`;
  };

  if (isSubmitted) {
    return (
      <div className="bg-[var(--white)] p-6 sm:p-8 rounded-[4px] border border-[var(--gold-soft)] shadow-sm space-y-5">
        <div className="flex items-center gap-3 text-[var(--crimson)]">
          <CheckCircle className="w-6 h-6 text-[var(--gold)]" aria-hidden="true" />
          <h3 className="font-heading text-xl text-[var(--espresso)]">
            Enquiry Details Ready
          </h3>
        </div>

        <p className="text-[var(--charcoal)] text-sm leading-relaxed">
          The hotel will reply to your enquiry as soon as possible. Send your request instantly via WhatsApp or email:
        </p>

        <div className="p-4 bg-[var(--ivory)] rounded text-xs text-[var(--charcoal)] whitespace-pre-line border border-[var(--gold-soft)] font-mono">
          {buildComposedMessage()}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Send on WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={handleSendEmail}
            className="flex-1 btn-outline flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Send by Email</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="text-xs text-[var(--grey)] underline hover:text-[var(--crimson)] block text-center pt-2"
        >
          Edit enquiry details
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[var(--white)] p-6 sm:p-8 rounded-[4px] border border-[var(--gold-soft)] shadow-sm space-y-4"
    >
      <div className="border-b border-[var(--gold-soft)] pb-4 mb-4">
        <span className="section-label">Enquiry Form</span>
        <h3 className="font-heading text-2xl text-[var(--espresso)] mt-1">
          Conference or Event Booking
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label
            htmlFor="event-name"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
          >
            Full Name <span className="text-[var(--crimson)]">*</span>
          </label>
          <input
            id="event-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-describedby={errors.name ? 'event-name-error' : undefined}
            placeholder="Kwame Mensah"
            className={`w-full py-2.5 px-3 rounded border text-sm text-[var(--charcoal)] bg-[var(--white)] ${
              errors.name ? 'border-[var(--crimson)] ring-1 ring-[var(--crimson)]' : 'border-[var(--gold-soft)]'
            }`}
          />
          {errors.name && (
            <p id="event-name-error" className="text-xs text-[var(--crimson)] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="event-phone"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
          >
            Contact Phone <span className="text-[var(--crimson)]">*</span>
          </label>
          <input
            id="event-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-describedby={errors.phone ? 'event-phone-error' : undefined}
            placeholder="+233 50 000 0000"
            className={`w-full py-2.5 px-3 rounded border text-sm text-[var(--charcoal)] bg-[var(--white)] ${
              errors.phone ? 'border-[var(--crimson)] ring-1 ring-[var(--crimson)]' : 'border-[var(--gold-soft)]'
            }`}
          />
          {errors.phone && (
            <p id="event-phone-error" className="text-xs text-[var(--crimson)] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email (Optional) */}
        <div>
          <label
            htmlFor="event-email"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
          >
            Email Address (Optional)
          </label>
          <input
            id="event-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="kwame@company.com"
            className="w-full py-2.5 px-3 rounded border border-[var(--gold-soft)] text-sm text-[var(--charcoal)] bg-[var(--white)]"
          />
        </div>

        {/* Event Type */}
        <div>
          <label
            htmlFor="event-type"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
          >
            Event Type <span className="text-[var(--crimson)]">*</span>
          </label>
          <select
            id="event-type"
            value={formData.eventType}
            onChange={(e) => handleChange('eventType', e.target.value)}
            className="w-full py-2.5 px-3 rounded border border-[var(--gold-soft)] text-sm text-[var(--charcoal)] bg-[var(--white)]"
          >
            <option value="Meeting or conference">Meeting or conference</option>
            <option value="Wedding">Wedding</option>
            <option value="Outdoor event">Outdoor event</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Proposed Date */}
        <div>
          <label
            htmlFor="event-date"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
          >
            Proposed Date
          </label>
          <input
            id="event-date"
            type="date"
            value={formData.proposedDate}
            onChange={(e) => handleChange('proposedDate', e.target.value)}
            className="w-full py-2.5 px-3 rounded border border-[var(--gold-soft)] text-sm text-[var(--charcoal)] bg-[var(--white)]"
          />
        </div>

        {/* Expected Guests */}
        <div>
          <label
            htmlFor="event-guests"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
          >
            Expected Guests
          </label>
          <input
            id="event-guests"
            type="text"
            value={formData.expectedGuests}
            onChange={(e) => handleChange('expectedGuests', e.target.value)}
            placeholder="e.g. 50 guests"
            className="w-full py-2.5 px-3 rounded border border-[var(--gold-soft)] text-sm text-[var(--charcoal)] bg-[var(--white)]"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="event-message"
          className="block text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] mb-1"
        >
          Event Requirements & Message <span className="text-[var(--crimson)]">*</span>
        </label>
        <textarea
          id="event-message"
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          aria-describedby={errors.message ? 'event-message-error' : undefined}
          placeholder="Please describe your setup, equipment needed, catering preferences, or preferred dates..."
          className={`w-full py-2.5 px-3 rounded border text-sm text-[var(--charcoal)] bg-[var(--white)] ${
            errors.message ? 'border-[var(--crimson)] ring-1 ring-[var(--crimson)]' : 'border-[var(--gold-soft)]'
          }`}
        />
        {errors.message && (
          <p id="event-message-error" className="text-xs text-[var(--crimson)] mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <div className="pt-2">
        <button type="submit" className="w-full btn-primary">
          Submit Event Enquiry
        </button>
      </div>
    </form>
  );
};
