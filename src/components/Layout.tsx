import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileActionBar } from './MobileActionBar';
import { AvailabilityModal } from './AvailabilityModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, hash } = useLocation();

  // Scroll to top or anchor on route change
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--white)] text-[var(--charcoal)] selection:bg-[var(--gold-soft)] selection:text-[var(--espresso)]">
      <TopBar />
      <Header />

      {/* Main content landmark; padded on bottom for mobile action bar (<768px) */}
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>

      <Footer />
      <MobileActionBar />
      <AvailabilityModal />
    </div>
  );
};
