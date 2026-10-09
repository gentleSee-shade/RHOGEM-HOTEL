import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useBooking } from '../context/BookingContext';
import { Menu, X, Phone } from 'lucide-react';
import { HOTEL_DATA } from '../data/hotel';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Amenities', path: '/amenities' },
  { label: 'Dining', path: '/dining' },
  { label: 'Meetings & Events', path: '/meetings-events' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBookingModal } = useBooking();
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for header resize (>24px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC and focus trap for mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--crimson)] focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full bg-[var(--white)] border-b border-[var(--gold-soft)]/60 transition-all duration-200 ${
          isScrolled ? 'shadow-[0_4px_20px_rgba(43,27,22,0.08)] py-2' : 'py-3.5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 focus-visible:rounded"
            aria-label="RHOGEM Hotel homepage"
          >
            <Logo scrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-1 text-[13px] font-sans font-bold tracking-[0.12em] uppercase transition-colors whitespace-nowrap ${
                    active
                      ? 'text-[var(--crimson)]'
                      : 'text-[var(--charcoal)] hover:text-[var(--crimson)]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--gold)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action: Book Now (Desktop) + Hamburger (Mobile) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openBookingModal()}
              className="hidden lg:inline-flex btn-primary"
              aria-label="Book a room at RHOGEM Hotel"
            >
              Book Now
            </button>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerBtnRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-[var(--charcoal)] hover:text-[var(--crimson)] hover:bg-[var(--ivory)] rounded transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/60 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[var(--white)] shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="p-4 flex items-center justify-between border-b border-[var(--gold-soft)]">
                <Logo scrolled={true} />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[var(--charcoal)] hover:text-[var(--crimson)] rounded"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="p-6 flex flex-col gap-2" aria-label="Mobile Nav">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-3 rounded text-[15px] font-sans font-bold tracking-[0.1em] uppercase transition-colors ${
                        active
                          ? 'bg-[var(--ivory)] text-[var(--crimson)] border-l-4 border-[var(--crimson)]'
                          : 'text-[var(--charcoal)] hover:bg-[var(--ivory)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 bg-[var(--ivory)] border-t border-[var(--gold-soft)] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full btn-primary"
              >
                Book Now
              </button>

              <a
                href={HOTEL_DATA.contact.primaryPhoneTel}
                className="w-full btn-outline flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[var(--crimson)]" aria-hidden="true" />
                <span>Call Hotel</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
