import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ServiceProvider from './subScreens/ServiceProvider';

const StepperFormScreen = ({ route, navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const { selectedServices } = route.params; // Passed from the Service screen
  const [selectedStylists, setSelectedStylists] = useState({}); // State to hold selected stylists

  const steps = [
    "Service",        // Step 1 - Selected
    "Service Provider", // Step 2
    "Date & Time",    // Step 3
    "Cart",           // Step 4
    "Payment",        // Step 5
    "Confirmation"    // Step 6
  ];

  // Function to proceed to the next step
  const nextStep = () => {
    if (currentPosition < steps.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  // Function to go back to the previous step
  const prevStep = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  // Function to handle the final confirmation (API call, etc.)
  const handleConfirmation = () => {
    // Make an API call here to confirm the booking
    console.log('Booking confirmed with selected service:', selectedServices, 'and selected stylists:', selectedStylists);
    // Navigate to a success page or reset the stepper form
    navigation.navigate('BookingSuccess'); // Example of navigation to a success screen
  };

  const handleNextStep = (stylists) => {
    setSelectedStylists(stylists); // Save selected stylists to state
    nextStep(); // Move to the next step
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Step Indicator */}
      <StepIndicator
        currentPosition={currentPosition}
        labels={steps}
        stepCount={steps.length}
      />

      {/* Render different content based on the current step */}
      {currentPosition === 1 && (
        <View>
          <ServiceProvider 
            selectedServices={selectedServices} 
            onNextStep={handleNextStep} // Pass the handler to ServiceProvider
          />
          <Button title="Back" onPress={prevStep} />
        </View>
      )}

      {currentPosition === 2 && (
        <View>
          <Text>Select Date and Time</Text>
          {/* Add Date and Time Picker UI */}
          <Button title="Next" onPress={nextStep} />
          <Button title="Back" onPress={prevStep} />
        </View>
      )}

      {currentPosition === 3 && (
        <View>
          <Text>Cart Summary</Text>
          {/* Add Cart Summary UI */}
          <Button title="Next" onPress={nextStep} />
          <Button title="Back" onPress={prevStep} />
        </View>
      )}

      {currentPosition === 4 && (
        <View>
          <Text>Payment Method</Text>
          {/* Add Payment Method Selection */}
          <Button title="Confirm Booking" onPress={handleConfirmation} />
          <Button title="Back" onPress={prevStep} />
        </View>
      )}

      {currentPosition === 5 && (
        <View>
          <Text>Confirmation</Text>
          {/* Show Confirmation UI */}
          <Button title="Back" onPress={prevStep} />
        </View>
      )}
    </View>
  );
};

export default StepperFormScreen;
