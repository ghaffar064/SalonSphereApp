import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState({ ongoing: [], history: [] });
  const [loading, setLoading] = useState(true); // Ensure loading until bookings are fetched

  // Load bookings when the provider mounts
  useEffect(() => {
    loadBookings();
  }, []);

  // Load bookings from AsyncStorage and update state
  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      console.log('Loaded bookings from storage:', storedBookings);

      const parsedBookings = storedBookings
        ? JSON.parse(storedBookings)
        : { ongoing: [], history: [] };

      setBookings(parsedBookings); // Set state with loaded bookings

    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false); // Ensure loading state is turned off
    }
  };

  // Add a new booking and save to both state and AsyncStorage
  const addBooking = async (newBooking) => {
    setBookings((prevBookings) => {
      const updatedBookings = {
        ongoing: [...prevBookings.ongoing, newBooking],
        history: prevBookings.history,
      };

      // Save updated bookings to AsyncStorage
      AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings))
        .then(() => console.log('Booking added and saved:', updatedBookings))
        .catch((error) => console.error('Error saving new booking:', error));

      return updatedBookings; // Return updated state
    });
  };

  if (loading) {
    return null; // Prevent rendering until data is loaded
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};