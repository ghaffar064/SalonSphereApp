import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Button,Alert } from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Calendar } from 'react-native-calendars'; // Import the Calendar component
import color from '../../../constants/color';


dayjs.extend(utc);
dayjs.extend(timezone);

export default function DateAndTime({
  selectedDate,
  setSelectedDate,
  setActiveStep,
  setSelectedTime,
  setIncompleteMsg,
  selectedStylist,
  nextStep,
  selectedTime
}) {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  console.log(selectedDate)
  const handleNextStep = () => {
    if (!selectedDate) {
      Alert.alert(
        'Select Date',
        
      );
    }
    if (!selectedTime) {
      Alert.alert(
        'Select Time',
        
      );
    }
    else {
     nextStep()
    }
  };
  

  // Auto-select today's date when the component mounts
  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    setSelectedDate(today); // Auto-select today's date
  }, []);

  // Fetch available dates from the selected stylist
  useEffect(() => {
    if (selectedStylist && Array.isArray(selectedStylist.dateTimeSlots)) {
      const dates = [];
      selectedStylist.dateTimeSlots.forEach((slot) => {
        const formattedDate = dayjs(slot.date).format('YYYY-MM-DD');
        const today = dayjs().startOf('day');

        // Check if slot date is today or in the future
        if (dayjs(formattedDate).isAfter(today) || dayjs(formattedDate).isSame(today)) {
          if (!dates.includes(formattedDate)) {
            dates.push(formattedDate);
          }
        }
      });
      setAvailableDates(dates); // Update available dates
    }
  }, [selectedStylist]);

  // Fetch available times for the selected date (including today's date on first render)
  useEffect(() => {
    if (selectedDate && selectedStylist && Array.isArray(selectedStylist.dateTimeSlots)) {
      const times = [];
      selectedStylist.dateTimeSlots.forEach((slot) => {
        if (dayjs(slot.date).isSame(dayjs(selectedDate), 'day')) {
          slot.times.forEach((time) => {
            times.push(time);
          });
        }
      });
      setAvailableTimes(times); // Update available times
    }
  }, [selectedDate, selectedStylist]);

  const handleDayPress = (day) => {
    const selectedDay = dayjs(day.dateString);
    const today = dayjs().startOf('day');

    // Allow selecting only today or future dates
    if (selectedDay.isAfter(today) || selectedDay.isSame(today)) {
      setSelectedDate(day.dateString);
    }
  };

  const handleTime = (timeslot) => {
    setSelectedTime(timeslot);
    setIncompleteMsg(false);
    setActiveStep(3);
    nextStep()
  };

  // Create marked dates
  const markedDates = {};

  // Mark available dates with light blue
  availableDates.forEach((date) => {
    markedDates[date] = { selected: true, selectedColor: 'lightblue' }; // Set available dates to light blue
  });

  // Mark the selected date differently with purple
  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: 'purple' }; // Set selected date to purple
  }

  return (
    <ScrollView contentContainerStyle={styles.container}  showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Select Date And Time</Text>

      {/* Calendar integration */}
      {selectedStylist && (
        <>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            markingType={'multi-dot'}
            style={styles.calendar}
            theme={{
              todayTextColor: 'blue',
              dayTextColor: 'black',
              selectedDayBackgroundColor: 'lightblue', // Set default selected background color
              selectedDayTextColor: 'black',
              arrowColor: 'blue',
              disabledDayTextColor: 'grey',
            }}
          />

          {/* Available Times Display */}
          {availableTimes.length > 0 && (
            <View style={styles.timeSlotsContainer}>
              <Text style={styles.timeSlotsLabel}>Available Time Slots:</Text>
              <ScrollView contentContainerStyle={styles.timeSlotsList}>
                {availableTimes.map((timeSlot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.timeSlotButton}
                    onPress={() => handleTime(timeSlot)}
                  >
                    <Text style={styles.timeSlotText}>{timeSlot}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Show a message if no available times */}
          {availableTimes.length === 0 && selectedDate && (
            <Text style={styles.noTimeMessage}>No available times for this date.</Text>
          )}
        </>
      )}
        {/* <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNextStep} color={color.background} />
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  calendar: {
    marginBottom: 20,
  },
  timeSlotsContainer: {
    marginTop: 20,
  },
  timeSlotsLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  timeSlotsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlotButton: {
    backgroundColor: color.background,
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '40%',
    alignItems: 'center',
  },
  timeSlotText: {
    color: '#fff',
    fontSize: 16,
  },
  noTimeMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    zIndex: 1,
  },
});
