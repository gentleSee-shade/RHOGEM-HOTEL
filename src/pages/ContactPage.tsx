import React, { useState } from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { PageBanner } from '../components/PageBanner';
import { GeneralEnquiryForm } from '../components/GeneralEnquiryForm';
import { FaqAccordion } from '../components/FaqAccordion';
import { Seo } from '../components/Seo';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  MessageSquare,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { contact } = HOTEL_DATA;
  const [mapError, setMapError] = useState(false);

  return (
    <>
      <Seo
        title="Contact & Location | RHOGEM Hotel Takoradi"
        description="Contact RHOGEM Hotel in Apowa Mussey, Takoradi. Phone, WhatsApp, email, interactive map with directions, and frequently asked questions."
      />

      {/* Banner */}
      <PageBanner
        label="Get in Touch"
        title="Contact & Location"
        intro="Reach out to our front desk team in Takoradi for room reservations, directions, or conference queries."
      />

      {/* Two Column Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--white)]" aria-label="Contact Information and Map">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact details + General Enquiry form */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Hotel Information Box */}
              <div className="bg-[var(--ivory)] p-6 sm:p-8 rounded-[4px] border border-[var(--gold-soft)] space-y-6">
                <div>
                  <span className="section-label">Hotel Coordinates</span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-[var(--espresso)] font-bold mt-1">
                    Direct Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[var(--charcoal)]">
                  {/* Address */}
                  <div className="space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--crimson)] block flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Physical Address</span>
                    </span>
                    <p className="leading-relaxed">
                      {contact.address}
                    </p>
                    <p className="text-xs text-[var(--grey)]">
                      {contact.poBox}
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--crimson)] block flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp Direct</span>
                    </span>
                    <p>
                      <a
                        href={contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-[var(--crimson)] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{contact.primaryPhone}</span>
                        <ExternalLink className="w-3 h-3 text-[var(--grey)]" aria-hidden="true" />
                      </a>
                    </p>
                    <p className="text-xs text-[var(--grey)]">
                      Instant message reservations
                    </p>
                  </div>

                  {/* Phone numbers */}
                  <div className="space-y-1 sm:col-span-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--crimson)] block flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Telephone Numbers</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {contact.phoneNumbers.map((p, idx) => (
                        <div key={idx} className="bg-[var(--white)] p-2.5 rounded border border-[var(--gold-soft)]/50">
                          <span className="text-[11px] text-[var(--grey)] block">{p.label}</span>
                          <a
                            href={p.tel}
                            className="font-bold text-xs hover:text-[var(--crimson)] transition-colors"
                          >
                            {p.number}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Emails */}
                  <div className="space-y-1 sm:col-span-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--crimson)] block flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Email Addresses</span>
                    </span>
                    <div className="flex flex-col sm:flex-row gap-4 pt-1">
                      <div>
                        <span className="text-xs text-[var(--grey)] block">Enquiries:</span>
                        <a
                          href={`mailto:${contact.emails.enquiries}`}
                          className="font-bold text-xs sm:text-sm hover:text-[var(--crimson)] transition-colors"
                        >
                          {contact.emails.enquiries}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--grey)] block">Customer Service:</span>
                        <a
                          href={`mailto:${contact.emails.customerService}`}
                          className="font-bold text-xs sm:text-sm hover:text-[var(--crimson)] transition-colors"
                        >
                          {contact.emails.customerService}
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Social links */}
                <div className="border-t border-[var(--gold-soft)] pt-4 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--charcoal)]">
                    Social:
                  </span>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <a
                      href={contact.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--crimson)] transition-colors"
                    >
                      Facebook
                    </a>
                    <span className="text-[var(--gold)]">·</span>
                    <a
                      href={contact.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--crimson)] transition-colors"
                    >
                      Instagram
                    </a>
                    <span className="text-[var(--gold)]">·</span>
                    <a
                      href={contact.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--crimson)] transition-colors"
                    >
                      TikTok
                    </a>
                    <span className="text-[var(--gold)]">·</span>
                    <a
                      href={contact.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--crimson)] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* General Enquiry Form */}
              <GeneralEnquiryForm />
            </div>

            {/* Right Column: Large Map (F7) + Directions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--ivory)] p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm sticky top-28">
                <span className="section-label">Google Maps</span>
                <h3 className="font-heading text-2xl text-[var(--espresso)] font-bold mt-1 mb-4">
                  Find RHOGEM Hotel
                </h3>

                {/* Large Map iframe */}
                <div className="w-full h-80 sm:h-96 rounded-[4px] overflow-hidden border border-[var(--gold-soft)] bg-[var(--white)] shadow-inner mb-4">
                  {!mapError ? (
                    <iframe
                      title="RHOGEM Hotel Takoradi Google Maps Location"
                      src={contact.mapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onError={() => setMapError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-sm text-[var(--charcoal)]">
                      <MapPin className="w-8 h-8 text-[var(--crimson)] mb-2" aria-hidden="true" />
                      <p className="font-bold">{contact.address}</p>
                      <p className="text-xs text-[var(--grey)] mt-1">{contact.poBox}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-[var(--charcoal)]">
                    <span className="font-bold">Location note:</span> Situated along St Jude Street, Apowa Mussey, Ahanta West, Takoradi.
                  </div>

                  <a
                    href={contact.getDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--ivory)] border-t border-[var(--gold-soft)]" aria-label="Frequently Asked Questions">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Common Questions</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--espresso)] font-bold mt-1">
              Frequently Asked Questions
            </h2>
            <div className="max-w-[100px] mx-auto mt-4">
              <div className="kente-band rounded-full" aria-hidden="true" />
            </div>
          </div>

          <FaqAccordion />
        </div>
      </section>
    </>
  );
};
