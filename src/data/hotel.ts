/**
 * RHOGEM Hotel Single Source of Truth
 * All hotel facts, contact information, rooms, amenities, reviews, FAQs, and image mapping.
 * No hotel facts should be hard-coded inside components.
 */

export interface Room {
  id: 'standard' | 'classic' | 'deluxe' | 'executive';
  name: string;
  priceFrom: number;
  priceFormatted: string;
  bed: string;
  size: string;
  description: string;
  features: string[];
  imageSlot: string;
  alt: string;
}

export interface AmenityBlock {
  id: string;
  title: string;
  description: string;
  imageSlot: string;
  alt: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  source: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  isCatchAll?: boolean;
}

export interface MenuItem {
  name: string;
  category?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  imageSlot: string;
  title: string;
  alt: string;
}

export const HOTEL_DATA = {
  name: "RHOGEM Hotel",
  established: "January 2016",
  locationBrief: "Apowa Mussey, St Jude Street, Takoradi",
  district: "Ahanta West",
  city: "Takoradi",
  region: "Western Region",
  country: "Ghana",
  poBox: "P.O. Box MC 3491",

  contact: {
    address: "Apowa Mussey, St Jude Street, Takoradi, Ghana",
    poBox: "P.O. Box MC 3491",
    primaryPhone: "+233 55 309 9605",
    primaryPhoneTel: "tel:+233553099605",
    phoneNumbers: [
      { label: "Primary & WhatsApp", number: "+233 55 309 9605", tel: "tel:+233553099605" },
      { label: "Front Desk 2", number: "+233 25 666 7484", tel: "tel:+233256667484" },
      { label: "Front Desk 3", number: "+233 55 929 0599", tel: "tel:+233559290599" },
    ],
    whatsappNumber: "233553099605",
    whatsappLink: "https://wa.me/233553099605",
    emails: {
      enquiries: "info@rhogemhotels.com",
      customerService: "customerservice@rhogemhotels.com",
    },
    socials: {
      facebook: "https://www.facebook.com/Rhogemhotel77",
      instagram: "https://www.instagram.com/rhogem_hotel/",
      tiktok: "https://www.tiktok.com/@rhogemhotelofficial",
      linkedin: "http://www.linkedin.com/in/rhogem-rhogem-8a8b28348",
    },
    googleListingUrl: "https://www.google.com/maps/search/?api=1&query=RHOGEM+Hotel+Takoradi",
    mapsEmbedUrl: "https://www.google.com/maps?q=RHOGEM+Hotel+Takoradi+Ghana&output=embed",
    getDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=RHOGEM+Hotel+Takoradi+Ghana",
  },

  rating: {
    score: "4.0",
    reviewCount: 237,
    source: "Google",
    highlights: ["Quiet", "Great value", "Luxury", "Child-friendly", "Great view"],
  },

  about: {
    story: "Welcome to RHOGEM Hotel, in the heart of Ahanta West, Takoradi. Our team is focused on warm, personalised service and comfortable rooms, whether you travel for business or leisure. Since January 2016 we have welcomed guests, families, companies and wedding parties, and your comfort remains our first priority.",
    establishedBadge: "Welcoming guests since January 2016",
    reasonsToChoose: [
      {
        title: "Quiet surroundings",
        description: "A peaceful environment tucked in Apowa Mussey, offering a restful escape from busy city life.",
      },
      {
        title: "Personalised service",
        description: "Our dedicated local team delivers warm Ghanaian Akwaaba hospitality with attentive care.",
      },
      {
        title: "Good value",
        description: "Honest starting rates, dependable comfort, and quality amenities for both short and extended stays.",
      },
    ],
  },

  dining: {
    copy: "Eat in our restaurant, relax in the bar and shared lounge, or have a meal brought to your room. Guests often tell us the food is a highlight of their stay.",
    features: [
      {
        title: "Bar & Shared Lounge",
        description: "Relax with refreshing beverages, cocktails, and comfortable seating in a convivial atmosphere.",
      },
      {
        title: "Room Service",
        description: "Have delicious, freshly prepared dishes brought directly to the privacy of your room.",
      },
    ],
    contactPanelNote: "Opening hours and today's menu: call or message us",
    // Editable menu array - publish no priced items unless supplied
    menu: [] as MenuItem[],
  },

  meetingsAndEvents: {
    conferences: "We offer two air-conditioned conference venues, a 150-seater and a 60-seater, for functions, meetings and social events. Tailor-made conference packages include room setup, notepads, mineral water and audiovisual equipment. Full-board residential conference rates are available on request.",
    weddings: "Hold your wedding with exclusive use of the entire hotel for you and your guests. Enjoy time with loved ones in our dining room the night before, or unwind in our executive rooms. Ask about pre-wedding breakfast and post-wedding reception packages.",
  },

  rooms: [
    {
      id: "standard",
      name: "Standard Room",
      priceFrom: 350,
      priceFormatted: "GH₵350",
      bed: "1 double bed",
      size: "60 sq ft",
      description: "A simple, comfortable room, ideal for solo travellers or short stays.",
      features: ["Air conditioning", "Wi-Fi", "TV", "Shower", "Telephone", "Towels", "Non-smoking"],
      imageSlot: "room-standard",
      alt: "Standard Room with double bed at RHOGEM Hotel",
    },
    {
      id: "classic",
      name: "Classic Room",
      priceFrom: 490,
      priceFormatted: "GH₵490",
      bed: "1 queen bed",
      size: "169 sq ft",
      description: "A comfortable room with a sofa and a real home-away-from-home feel.",
      features: ["Air conditioning", "Wi-Fi", "TV", "Shower", "Telephone", "Towels", "Sofa"],
      imageSlot: "room-classic",
      alt: "Classic Room with queen bed and sofa at RHOGEM Hotel",
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      priceFrom: 650,
      priceFormatted: "GH₵650",
      bed: "1 queen bed",
      size: "180 sq ft",
      description: "Designed for comfort and convenience, a good choice if you are in town on business.",
      features: ["Air conditioning", "Wi-Fi", "TV", "In-room safe", "Telephone", "Bath"],
      imageSlot: "room-deluxe",
      alt: "Deluxe Room with queen bed at RHOGEM Hotel",
    },
    {
      id: "executive",
      name: "Executive Room",
      priceFrom: 850,
      priceFormatted: "GH₵850",
      bed: "1 king bed",
      size: "196 sq ft",
      description: "Our most spacious room: quiet, with a king-size bed, a sofa and a work area.",
      features: [
        "Air conditioning",
        "Wi-Fi",
        "TV",
        "In-room safe",
        "Shower",
        "Telephone",
        "Bath",
        "Work space",
        "Towels",
        "Centre table",
        "Sofa",
      ],
      imageSlot: "room-executive",
      alt: "Executive room with king-size bed and work area at RHOGEM Hotel",
    },
  ] as Room[],

  amenities: {
    blocks: [
      {
        id: "pool",
        title: "Swimming Pool",
        description: "Unwind by our outdoor swimming pool, ideal for a refreshing swim or relaxing under the Takoradi sun.",
        imageSlot: "pool",
        alt: "Outdoor swimming pool at RHOGEM Hotel",
      },
      {
        id: "gym",
        title: "Gym & Personal Training",
        description: "Maintain your fitness routine with dedicated fitness equipment and personal training assistance.",
        imageSlot: "gym",
        alt: "Gym and fitness training facilities at RHOGEM Hotel",
      },
      {
        id: "restaurant",
        title: "Restaurant",
        description: "Enjoy flavourful dishes and beverages crafted by our culinary team in a welcoming setting.",
        imageSlot: "restaurant",
        alt: "RHOGEM Hotel Restaurant dining area",
      },
      {
        id: "conference-mini",
        title: "Mini Conference Room",
        description: "Our dedicated 60-seater air-conditioned room, configured for board meetings, presentations and focused workshops.",
        imageSlot: "conference-mini",
        alt: "60-seater mini conference venue at RHOGEM Hotel",
      },
      {
        id: "conference-large",
        title: "Large Conference Room",
        description: "Our spacious 150-seater air-conditioned venue, tailored for corporate gatherings, seminars and social receptions.",
        imageSlot: "conference-large",
        alt: "150-seater large conference hall at RHOGEM Hotel",
      },
    ] as AmenityBlock[],

    alsoIncluded: [
      "Complimentary Wi-Fi",
      "24-hour security",
      "24-hour front desk",
      "Private balcony rooms",
      "River views",
      "Flat-screen TVs with DSTV",
      "Room service",
      "Bar and shared lounge",
      "Fine art collection",
    ],
  },

  reviews: [
    {
      id: "rev-1",
      quote: "Really like our stay there, the food was phenomenal, clean room and great service… highly recommend it!",
      author: "Aurelly L.",
      source: "Google review",
      rating: 5,
    },
    {
      id: "rev-2",
      quote: "This hotel was a delightful surprise: great bed, clean environment, a welcoming staff… Also the food at the restaurant was excellent!",
      author: "Yannick L.",
      source: "Google review",
      rating: 5,
    },
    {
      id: "rev-3",
      quote: "I travelled from the United States and was captivated by Rhogem Hotel. Their staff were great, the environment was plush… I will recommend Rhogem any day, any time from anywhere. Plus their food was great.",
      author: "R. A.",
      source: "Google review",
      rating: 5,
    },
  ] as Review[],

  faqs: [
    {
      question: "What are your check-in and check-out times?",
      answer: "12:00 noon for both. Call us if you need earlier arrival or later departure.",
    },
    {
      question: "Is Wi-Fi provided at the hotel?",
      answer: "Yes, complimentary.",
    },
    {
      question: "Do you have an on-site restaurant?",
      answer: "Yes, plus a bar and shared lounge and room service.",
    },
    {
      question: "Can we host meetings or weddings at RHOGEM Hotel?",
      answer: "Yes. See Meetings & Events or send an enquiry.",
    },
    {
      question: "How do I make a room booking?",
      answer: "Use Check Availability to send a request on WhatsApp or email, or call us. A request is not a confirmed booking until the hotel replies.",
    },
    {
      question: "What about payment, cancellations, parking, children, or pets?",
      answer: "Please contact us directly for questions regarding payment terms, cancellations, parking, or travelling with children and pets.",
      isCatchAll: true,
    },
  ] as FaqItem[],

  gallery: [
    { id: "gal-1", imageSlot: "gallery-1", title: "Hotel Exterior & Grounds", alt: "RHOGEM Hotel grounds and exterior in Takoradi" },
    { id: "gal-2", imageSlot: "gallery-2", title: "Swimming Pool Area", alt: "Outdoor swimming pool and relaxation area" },
    { id: "gal-3", imageSlot: "gallery-3", title: "Executive Room", alt: "Executive room with king bed and workspace" },
    { id: "gal-4", imageSlot: "gallery-4", title: "Restaurant Dining", alt: "Hotel restaurant dining room" },
    { id: "gal-5", imageSlot: "gallery-5", title: "Lounge & Bar", alt: "Bar and shared lounge setting" },
    { id: "gal-6", imageSlot: "gallery-6", title: "Conference Hall", alt: "Air-conditioned conference room setup" },
    { id: "gal-7", imageSlot: "gallery-7", title: "Deluxe Room", alt: "Deluxe room with queen bed" },
    { id: "gal-8", imageSlot: "gallery-8", title: "Gym & Fitness", alt: "Fitness equipment in the gym" },
    { id: "gal-9", imageSlot: "gallery-9", title: "Wedding Setup", alt: "Outdoor event and wedding celebration area" },
  ] as GalleryItem[],

  images: {
    "logo": "/images/logo.png",
    "hero-1": "/images/hero-1.jpg",
    "hero-2": "/images/hero-2.jpg",
    "hero-3": "/images/hero-3.jpg",
    "room-standard": "/images/room-standard.jpg",
    "room-classic": "/images/room-classic.jpg",
    "room-deluxe": "/images/room-deluxe.jpg",
    "room-executive": "/images/room-executive.jpg",
    "pool": "/images/pool.jpg",
    "gym": "/images/gym.jpg",
    "restaurant": "/images/restaurant.jpg",
    "conference-large": "/images/conference-large.jpg",
    "conference-mini": "/images/conference-mini.jpg",
    "wedding-1": "/images/wedding-1.jpg",
    "wedding-2": "/images/wedding-2.jpg",
    "wedding-3": "/images/wedding-3.jpg",
    "gallery-1": "/images/gallery-1.jpg",
    "gallery-2": "/images/gallery-2.jpg",
    "gallery-3": "/images/gallery-3.jpg",
    "gallery-4": "/images/gallery-4.jpg",
    "gallery-5": "/images/gallery-5.jpg",
    "gallery-6": "/images/gallery-6.jpg",
    "gallery-7": "/images/gallery-7.jpg",
    "gallery-8": "/images/gallery-8.jpg",
    "gallery-9": "/images/gallery-9.jpg",
    "about-1": "/images/about-1.jpg",
    "about-2": "/images/about-2.jpg",
  } as Record<string, string>,
};
