import React, { useState } from 'react';
import { HOTEL_DATA } from '../data/hotel';
import { ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full space-y-3">
      {HOTEL_DATA.faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-[var(--gold-soft)] rounded-[4px] bg-[var(--white)] overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-sans font-bold text-[15px] sm:text-[16px] text-[var(--espresso)] hover:text-[var(--crimson)] transition-colors focus:bg-[var(--ivory)]"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[var(--gold)] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-[var(--charcoal)] text-sm sm:text-[15px] leading-relaxed border-t border-[var(--gold-soft)]/40 bg-[var(--ivory)]/30">
                <p>{faq.answer}</p>

                {/* If catch-all question, provide Call and WhatsApp buttons as requested */}
                {faq.isCatchAll && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={HOTEL_DATA.contact.primaryPhoneTel}
                      className="btn-primary text-xs !min-h-[40px] !py-1 !px-4 inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href={HOTEL_DATA.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs !min-h-[40px] !py-1 !px-4 inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                )}

                {/* If meeting/wedding question, provide link */}
                {faq.question.toLowerCase().includes('meetings') && (
                  <div className="mt-2">
                    <Link
                      to="/meetings-events"
                      className="text-xs font-bold uppercase tracking-wider text-[var(--crimson)] hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      View Meetings & Events details →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
