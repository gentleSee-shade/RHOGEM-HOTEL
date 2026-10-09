import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HOTEL_DATA } from '../data/hotel';
import { useBooking } from '../context/BookingContext';
import { CheckAvailabilityBar } from '../components/CheckAvailabilityBar';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Lightbox } from '../components/Lightbox';
import { ScrollReveal } from '../components/ScrollReveal';
import { Seo } from '../components/Seo';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openBookingModal } = useBooking();

  // --- H1. HERO SLIDER STATE ---
  const heroSlides = [
    { slot: 'hero-1', alt: 'RHOGEM Hotel Takoradi exterior and entrance grounds' },
    { slot: 'hero-2', alt: 'RHOGEM Hotel swimming pool and outdoor leisure area' },
    { slot: 'hero-3', alt: 'RHOGEM Hotel conference and guest accommodation in Ahanta West' },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const heroIntervalRef = useRef<number | null>(null);

  // Auto-advance hero 6s with 700ms crossfade, pause on hover/focus/hidden tab, no auto-advance on reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const startTimer = () => {
      heroIntervalRef.current = window.setInterval(() => {
        if (!document.hidden && !isHeroHovered) {
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }
      }, 6000);
    };

    startTimer();
    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    };
  }, [isHeroHovered, heroSlides.length]);

  // --- H2. ROOMS CAROUSEL STATE ---
  const [roomIndex, setRoomIndex] = useState(0);
  const roomsContainerRef = useRef<HTMLDivElement>(null);

  const prevRoom = () => {
    setRoomIndex((prev) => Math.max(0, prev - 1));
    if (roomsContainerRef.current) {
      roomsContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const nextRoom = () => {
    setRoomIndex((prev) => Math.min(HOTEL_DATA.rooms.length - 1, prev + 1));
    if (roomsContainerRef.current) {
      roomsContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // --- H4. LIGHTBOX STATE ---
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  // --- H6. REVIEWS SLIDER STATE ---
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  const prevReview = () => {
    setCurrentReviewIdx(
      (prev) => (prev - 1 + HOTEL_DATA.reviews.length) % HOTEL_DATA.reviews.length
    );
  };

  const nextReview = () => {
    setCurrentReviewIdx((prev) => (prev + 1) % HOTEL_DATA.reviews.length);
  };

  const activeReview = HOTEL_DATA.reviews[currentReviewIdx];

  const scrollToAvailability = () => {
    const section = document.getElementById('home-availability');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Seo
        title="RHOGEM Hotel, Takoradi, Ghana | Rooms, Restaurant, Pool & Events"
        description="Welcome to RHOGEM Hotel in Takoradi (Ahanta West), Ghana. Comfortable rooms, swimming pool, restaurant, bar, and conference and event venues. Welcoming guests since 2016."
      />

      {/* ========================================================
          H1. HERO SLIDER
          ======================================================== */}
      <section
        aria-label="Welcome to RHOGEM Hotel"
        className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-[var(--espresso)] text-white select-none"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        onFocus={() => setIsHeroHovered(true)}
        onBlur={() => setIsHeroHovered(false)}
      >
        {/* Cross-fading background slides */}
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.slot}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <ImageWithFallback
                slot={slide.slot}
                alt={slide.alt}
                aspectRatio="auto"
                priority={index === 0}
                className="w-full h-full object-cover"
              />
              {/* Soft dark gradient scrim for WCAG AA readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)]/90 via-black/50 to-black/30"
                aria-hidden="true"
              />
            </div>
          );
        })}

        {/* Hero Content Box */}
        <div className="relative z-20 max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <span className="text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.25em] uppercase text-white/90 block mb-2">
              WELCOME TO
            </span>

            {/* Thin gold line */}
            <div className="w-16 h-[1.5px] bg-[var(--gold)] mx-auto mb-4" aria-hidden="true" />

            <h1 className="font-heading text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-sm">
              RHOGEM Hotel
            </h1>

            {/* Kente band accent under title */}
            <div className="w-24 mx-auto mb-5">
              <div className="kente-band rounded-full" aria-hidden="true" />
            </div>

            <p className="text-base sm:text-xl text-white/90 font-sans max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Akwaaba. Comfortable rooms, a pool, a restaurant and meeting spaces in Takoradi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToAvailability}
                className="w-full sm:w-auto btn-primary"
              >
                Check Availability
              </button>
              <Link
                to="/rooms"
                className="w-full sm:w-auto btn-white-outline"
              >
                View Rooms
              </Link>
            </div>
          </div>

          {/* Three dot indicators */}
          <div
            className="absolute bottom-6 flex items-center gap-2.5 z-20"
            role="tablist"
            aria-label="Hero slide indicators"
          >
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'bg-[var(--gold)] scale-110'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === currentSlide}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          H3. CHECK AVAILABILITY BAR
          ======================================================== */}
      <CheckAvailabilityBar id="home-availability" />

      {/* ========================================================
          H2. OUR ROOMS CAROUSEL
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--white)]" aria-label="Our Rooms">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Row with Prev/Next Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[var(--gold-soft)]/60">
            <div>
              <span className="section-label">Accommodation</span>
              <h2 className="text-3xl sm:text-4xl font-heading text-[var(--espresso)] mt-1">
                Our Rooms
              </h2>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              <Link
                to="/rooms"
                className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-[var(--crimson)] hover:text-[var(--crimson-dark)] transition-colors flex items-center gap-1.5"
              >
                <span>View All Rooms</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              {/* Prev / Next circle buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevRoom}
                  className="w-9 h-9 rounded-full border border-[var(--gold-soft)] bg-[var(--white)] hover:bg-[var(--ivory)] text-[var(--charcoal)] flex items-center justify-center transition-colors disabled:opacity-40"
                  aria-label="Previous rooms"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={nextRoom}
                  className="w-9 h-9 rounded-full border border-[var(--gold-soft)] bg-[var(--white)] hover:bg-[var(--ivory)] text-[var(--charcoal)] flex items-center justify-center transition-colors disabled:opacity-40"
                  aria-label="Next rooms"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Cards (Desktop 3 visible, tablet 2, mobile 1 with swipe & scroll-snap) */}
          <div
            ref={roomsContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
            tabIndex={0}
            role="region"
            aria-label="Rooms list"
          >
            {HOTEL_DATA.rooms.map((room) => (
              <div
                key={room.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start hotel-card flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Photo 4:3 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ivory)]">
                    <ImageWithFallback
                      slot={room.imageSlot}
                      alt={room.alt}
                      aspectRatio="4/3"
                      className="transition-transform duration-300 hover:scale-104"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <span className="text-[12px] font-sans font-bold tracking-wider uppercase text-[var(--crimson)] block mb-1">
                      {room.name}
                    </span>
                    <div className="font-heading text-2xl text-[var(--espresso)] font-bold mb-2">
                      From {room.priceFormatted} <span className="text-xs font-sans font-normal text-[var(--grey)]">per night</span>
                    </div>

                    <p className="text-xs text-[var(--charcoal)] font-semibold mb-2">
                      Bed: {room.bed} · {room.size}
                    </p>

                    <p className="text-sm text-[var(--grey)] line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 border-t border-[var(--gold-soft)]/40 mt-4">
                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      to={`/rooms#${room.id}`}
                      className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--crimson)] hover:text-[var(--crimson-dark)] transition-colors flex items-center gap-1"
                    >
                      <span>Check Details</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openBookingModal(room.id)}
                      className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] hover:text-[var(--crimson)] underline"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          H4. THREE COLUMNS: Gallery, Dining & Bar, Meetings & Events
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--ivory)] border-y border-[var(--gold-soft)]" aria-label="Highlights">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Col 1: Gallery */}
            <div className="bg-[var(--white)] p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="font-sans font-bold text-sm tracking-[0.12em] uppercase text-[var(--espresso)]">
                    Gallery
                  </h3>
                  <div className="w-12 h-[2px] bg-[var(--gold)] mt-1.5" aria-hidden="true" />
                </div>
                <p className="text-xs text-[var(--grey)] mb-4">
                  A glimpse into our grounds, rooms, swimming pool, and conference facilities.
                </p>

                {/* 3x3 square thumbnails */}
                <div className="grid grid-cols-3 gap-1.5 aspect-square">
                  {HOTEL_DATA.gallery.slice(0, 9).map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openLightboxAt(idx)}
                      className="relative w-full h-full overflow-hidden rounded-[2px] border border-[var(--gold-soft)]/50 group focus:ring-2 focus:ring-[var(--gold)]"
                      aria-label={`Open gallery photo: ${item.title}`}
                    >
                      <ImageWithFallback
                        slot={item.imageSlot}
                        alt={item.alt}
                        aspectRatio="1/1"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--gold-soft)] text-center">
                <button
                  type="button"
                  onClick={() => openLightboxAt(0)}
                  className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--crimson)] hover:underline inline-flex items-center gap-1"
                >
                  <span>View Full Photo Lightbox</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Col 2: Dining & Bar */}
            <div className="bg-[var(--white)] p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="font-sans font-bold text-sm tracking-[0.12em] uppercase text-[var(--espresso)]">
                    Dining & Bar
                  </h3>
                  <div className="w-12 h-[2px] bg-[var(--gold)] mt-1.5" aria-hidden="true" />
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] mb-4 bg-[var(--ivory)]">
                  <ImageWithFallback
                    slot="restaurant"
                    alt="RHOGEM Hotel Restaurant & Dining Area"
                    aspectRatio="16/9"
                  />
                </div>

                <p className="text-sm text-[var(--charcoal)] leading-relaxed mb-4">
                  Eat in our restaurant, relax in the bar and shared lounge, or have a meal brought to your room. Guests often tell us the food is a highlight of their stay.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--gold-soft)]">
                <Link
                  to="/dining"
                  className="btn-outline w-full text-center text-xs"
                >
                  View Dining →
                </Link>
              </div>
            </div>

            {/* Col 3: Meetings & Events */}
            <div className="bg-[var(--white)] p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="font-sans font-bold text-sm tracking-[0.12em] uppercase text-[var(--espresso)]">
                    Meetings & Events
                  </h3>
                  <div className="w-12 h-[2px] bg-[var(--gold)] mt-1.5" aria-hidden="true" />
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] mb-4 bg-[var(--ivory)]">
                  <ImageWithFallback
                    slot="conference-large"
                    alt="RHOGEM Hotel Conference Room Setup"
                    aspectRatio="16/9"
                  />
                </div>

                <p className="text-sm text-[var(--charcoal)] leading-relaxed mb-4">
                  We offer two air-conditioned conference venues (a 150-seater and a 60-seater) with setup, notepads, mineral water and audiovisual equipment.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--gold-soft)]">
                <Link
                  to="/meetings-events"
                  className="btn-outline w-full text-center text-xs"
                >
                  View Meetings & Events →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          H5. ABOUT STRIP
          ======================================================== */}
      <section className="relative py-20 px-4 sm:px-6 bg-[var(--white)] overflow-hidden" aria-label="About Strip">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Col 1: A Little About Us */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left bg-[var(--ivory)] p-8 rounded-[4px] border border-[var(--gold-soft)]">
              {/* ~120px circular image */}
              <div className="w-[120px] h-[120px] shrink-0 rounded-full overflow-hidden border-2 border-[var(--gold)] shadow-md bg-[var(--white)]">
                <ImageWithFallback
                  slot="about-1"
                  alt="RHOGEM Hotel grounds and reception"
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-sans font-bold text-sm tracking-[0.12em] uppercase text-[var(--espresso)] mb-1">
                  A Little About Us
                </h3>
                <div className="w-10 h-[2px] bg-[var(--gold)] mx-auto sm:mx-0 mb-3" aria-hidden="true" />
                <p className="text-sm text-[var(--charcoal)] leading-relaxed mb-4">
                  In the heart of Ahanta West, Takoradi. Welcoming guests since January 2016 with quiet surroundings and warm personalised Ghanaian service.
                </p>
                <Link
                  to="/about"
                  className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--crimson)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Learn more about us</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Col 2: Weddings & Outdoor Events */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left bg-[var(--ivory)] p-8 rounded-[4px] border border-[var(--gold-soft)]">
              {/* ~120px circular image */}
              <div className="w-[120px] h-[120px] shrink-0 rounded-full overflow-hidden border-2 border-[var(--gold)] shadow-md bg-[var(--white)]">
                <ImageWithFallback
                  slot="about-2"
                  alt="RHOGEM Hotel outdoor wedding and event grounds"
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-sans font-bold text-sm tracking-[0.12em] uppercase text-[var(--espresso)] mb-1">
                  Weddings & Outdoor Events
                </h3>
                <div className="w-10 h-[2px] bg-[var(--gold)] mx-auto sm:mx-0 mb-3" aria-hidden="true" />
                <p className="text-sm text-[var(--charcoal)] leading-relaxed mb-4">
                  Hold your wedding with exclusive use of the entire hotel. Enjoy time with loved ones and unwind in our executive rooms.
                </p>
                <Link
                  to="/meetings-events#weddings"
                  className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--crimson)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore wedding packages</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          H6. GUEST REVIEWS
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--ivory)] border-t border-[var(--gold-soft)]" aria-label="Guest Reviews">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Guest Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-heading text-[var(--espresso)] mt-1">
              What Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Reviews Slider (1-review slider with the 3 real reviews) */}
            <div className="lg:col-span-8 bg-[var(--white)] p-8 sm:p-10 rounded-[4px] border border-[var(--gold-soft)] shadow-sm relative">
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-xl sm:text-2xl text-[var(--espresso)] italic leading-relaxed mb-6">
                “{activeReview.quote}”
              </blockquote>

              {/* Author & Source */}
              <div className="flex items-center justify-between border-t border-[var(--gold-soft)]/50 pt-4">
                <div>
                  <div className="font-bold text-sm text-[var(--charcoal)]">
                    {activeReview.author}
                  </div>
                  <div className="text-xs text-[var(--grey)]">
                    {activeReview.source}
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevReview}
                    className="w-8 h-8 rounded-full border border-[var(--gold-soft)] flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--ivory)] transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs text-[var(--grey)] px-1">
                    {currentReviewIdx + 1} / {HOTEL_DATA.reviews.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextReview}
                    className="w-8 h-8 rounded-full border border-[var(--gold-soft)] flex items-center justify-center text-[var(--charcoal)] hover:bg-[var(--ivory)] transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Google Listing Badge & Highlights */}
            <div className="lg:col-span-4 bg-[var(--white)] p-6 rounded-[4px] border border-[var(--gold-soft)] shadow-sm">
              <a
                href={HOTEL_DATA.contact.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 bg-[var(--ivory)] rounded border border-[var(--gold-soft)] hover:border-[var(--crimson)] transition-colors text-center mb-6"
              >
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="text-3xl font-heading font-bold text-[var(--crimson)]">
                    {HOTEL_DATA.rating.score} / 5.0
                  </div>
                  <div className="flex items-center justify-center gap-1" aria-label="4 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? 'fill-[var(--gold)] text-[var(--gold)]'
                            : 'fill-[var(--gold)]/20 text-[var(--gold)]'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--charcoal)] mt-1 flex items-center justify-center gap-1">
                  <span>{HOTEL_DATA.rating.score} on Google · {HOTEL_DATA.rating.reviewCount} reviews</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--grey)] group-hover:text-[var(--crimson)]" aria-hidden="true" />
                </div>
                <span className="text-[11px] text-[var(--grey)] block mt-0.5">
                  View authentic guest reviews on Google
                </span>
              </a>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--charcoal)] block mb-3">
                  Google Guest Highlights:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[var(--charcoal)]">
                  {HOTEL_DATA.rating.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--ivory)] border border-[var(--gold-soft)] rounded text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Component for H4 Gallery */}
      <Lightbox
        items={HOTEL_DATA.gallery}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={setLightboxIndex}
      />
    </>
  );
};
