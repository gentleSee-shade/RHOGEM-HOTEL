import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BookingState {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  childrenCount: number;
  selectedRoom: string; // 'any' | 'standard' | 'classic' | 'deluxe' | 'executive'
  fullName: string;
  phone: string;
  notes: string;
}

interface BookingContextType {
  state: BookingState;
  setCheckIn: (dateStr: string) => void;
  setCheckOut: (dateStr: string) => void;
  setNights: (nights: number) => void;
  setAdults: (adults: number) => void;
  setChildrenCount: (children: number) => void;
  setSelectedRoom: (room: string) => void;
  setFullName: (name: string) => void;
  setPhone: (phone: string) => void;
  setNotes: (notes: string) => void;
  isModalOpen: boolean;
  openBookingModal: (preselectedRoom?: string) => void;
  closeBookingModal: () => void;
  formattedCheckIn: string;
  formattedCheckOut: string;
  minDate: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Helper functions for dates
export const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDateString = (str: string): Date => {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = parseDateString(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const today = new Date();
  const todayStr = toDateString(today);
  const tomorrowStr = toDateString(addDays(today, 1));

  const [state, setState] = useState<BookingState>({
    checkIn: todayStr,
    checkOut: tomorrowStr,
    nights: 1,
    adults: 1,
    childrenCount: 0,
    selectedRoom: 'any',
    fullName: '',
    phone: '',
    notes: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set Check In
  const setCheckIn = (dateStr: string) => {
    // Prevent past dates
    const selected = parseDateString(dateStr);
    const todayObj = parseDateString(todayStr);
    const validCheckIn = selected < todayObj ? todayStr : dateStr;

    // Recalculate checkOut based on existing nights
    const inDate = parseDateString(validCheckIn);
    const newOutDate = addDays(inDate, state.nights);
    const newOutStr = toDateString(newOutDate);

    setState((prev) => ({
      ...prev,
      checkIn: validCheckIn,
      checkOut: newOutStr,
    }));
  };

  // Set Check Out
  const setCheckOut = (dateStr: string) => {
    const inDate = parseDateString(state.checkIn);
    let outDate = parseDateString(dateStr);

    // If checkOut <= checkIn, set checkOut = checkIn + 1
    if (outDate <= inDate) {
      outDate = addDays(inDate, 1);
    }

    const diffTime = outDate.getTime() - inDate.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) diffDays = 1;
    if (diffDays > 30) diffDays = 30;

    setState((prev) => ({
      ...prev,
      checkOut: toDateString(outDate),
      nights: diffDays,
    }));
  };

  // Set Nights (1-30)
  const setNights = (n: number) => {
    const safeNights = Math.max(1, Math.min(30, n));
    const inDate = parseDateString(state.checkIn);
    const newOutDate = addDays(inDate, safeNights);

    setState((prev) => ({
      ...prev,
      nights: safeNights,
      checkOut: toDateString(newOutDate),
    }));
  };

  const setAdults = (adults: number) => {
    const safe = Math.max(1, Math.min(6, adults));
    setState((prev) => ({ ...prev, adults: safe }));
  };

  const setChildrenCount = (c: number) => {
    const safe = Math.max(0, Math.min(4, c));
    setState((prev) => ({ ...prev, childrenCount: safe }));
  };

  const setSelectedRoom = (room: string) => {
    setState((prev) => ({ ...prev, selectedRoom: room }));
  };

  const setFullName = (name: string) => {
    setState((prev) => ({ ...prev, fullName: name }));
  };

  const setPhone = (phone: string) => {
    setState((prev) => ({ ...prev, phone: phone }));
  };

  const setNotes = (notes: string) => {
    setState((prev) => ({ ...prev, notes: notes }));
  };

  const openBookingModal = (preselectedRoom?: string) => {
    if (preselectedRoom) {
      setState((prev) => ({ ...prev, selectedRoom: preselectedRoom }));
    }
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        setCheckIn,
        setCheckOut,
        setNights,
        setAdults,
        setChildrenCount,
        setSelectedRoom,
        setFullName,
        setPhone,
        setNotes,
        isModalOpen,
        openBookingModal,
        closeBookingModal,
        formattedCheckIn: formatDisplayDate(state.checkIn),
        formattedCheckOut: formatDisplayDate(state.checkOut),
        minDate: todayStr,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
