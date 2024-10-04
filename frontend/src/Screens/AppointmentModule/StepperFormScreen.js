import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ServiceProvider from './subScreens/ServiceProvider';
import DateAndTime from './subScreens/DateAndTime';
import color from '../../constants/color';

const StepperFormScreen = ({ route, navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const { selectedServices, stylists, salonName } = route.params;
  const [selectedStylist, setSelectedStylist] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [incompleteMsg, setIncompleteMsg] = useState(false);

  const steps = [
    'Service',
    'Service Provider',
    'Date & Time',
    'Cart',
    'Payment',
    
  ];

  const nextStep = () => {
    if (currentPosition < steps.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const prevStep = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const handleConfirmation = () => {
    console.log(
      'Booking confirmed with selected service:',
      selectedServices,
      'and selected stylists:',
      selectedStylist
    );
    navigation.navigate('BookingSuccess');
  };

  const handleNextStep = (stylists) => {
    setSelectedStylist(stylists);
    nextStep();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header with salon name */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{salonName}</Text>
      </View>

      {/* Step Indicator */}
     <View style={{margin:5}}>
     <StepIndicator
  currentPosition={currentPosition}
  labels={steps}
  stepCount={steps.length}
  customStyles={{
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40, // Slightly larger size for the current step
    separatorStrokeWidth: 3,
    currentStepIndicatorStyle: {
      backgroundColor: color.background, // Ensures the current step is colored
      borderColor: color.background, // Border color for the current step
      borderWidth: 2, // Border thickness
    },
    stepIndicatorFinishedColor: color.background, // Color for the finished steps
    stepIndicatorUnFinishedColor: '#E0E0E0', // Unfinished steps remain grey
    separatorFinishedColor: color.background, // Finished separator lines color
    separatorUnFinishedColor: '#E0E0E0', // Unfinished separator color

    labelColor: '#757575', // Text label color for unfinished steps
    finishedLabelColor: 'black', // Label color for finished steps (try this instead of `finishedStepLabelColor`)
    currentStepLabelColor: color.background, // Label color for the current step

    labelFontSize: 16, // Increase font size for step labels (try different values here)
    currentStepIndicatorLabelFontSize: 16, // Larger font size for the current step
    stepIndicatorLabelFontSize: 14, // Base font size for step indicator labels

    stepStrokeWidth: 0, // Removes any inner stroke from steps
    currentStepStrokeWidth: 2, // Adds stroke width around the current step
    currentStepStrokeColor: '#E0E0E0', // Stroke color for the current step

    stepStrokeFinishedColor: color.background, // Border for completed steps
    stepStrokeUnFinishedColor: '#E0E0E0', // Border for unfinished steps
    stepStrokeCurrentColor: color.background, // Border for the current step
  }}
/>

     </View>


      {/* Render different content based on the current step */}
      <View style={styles.contentContainer}>
        {currentPosition === 1 && (
          <View>
            <ServiceProvider
              selectedServices={selectedServices}
              onNextStep={handleNextStep}
              stylists={stylists}
              setSelectedStylist={setSelectedStylist}
              selectedStylist={selectedStylist}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={nextStep}>
                <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentPosition === 2 && (
          <View>
          
            <DateAndTime
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setActiveStep={setActiveStep}
              selectedAgent={selectedAgent}
              setSelectedTime={setSelectedTime}
              setIncompleteMsg={setIncompleteMsg}
              selectedServices={selectedServices}
              selectedStylist={selectedStylist}
            />
           
          </View>
        )}

        {currentPosition === 3 && (
          <View>
            <Text style={styles.stepText}>Cart Summary</Text>
            {/* Add Cart Summary UI */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={nextStep}>
                <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentPosition === 4 && (
          <View>
            <Text style={styles.stepText}>Payment Method</Text>
            {/* Add Payment Method Selection */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleConfirmation}>
                <Text style={styles.buttonText}>CONFIRM BOOKING</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentPosition === 5 && (
          <View>
            <Text style={styles.stepText}>Confirmation</Text>
            {/* Show Confirmation UI */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: color.background,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: color.background,
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#757575',
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default StepperFormScreen;
