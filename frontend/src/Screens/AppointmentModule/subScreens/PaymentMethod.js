import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Button, ActivityIndicator } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

export default function PaymentMethod({ selectedServices, selectedStylist, selectedDate, selectedTime, salonName,nextStep }) {
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
 
  const [isProcessing, setIsProcessing] = useState(false); // New state for loading indicator
  
  // Calculate total price based on selected services
  const calculateTotalPrice = (selectedServices) => {
    return Object.values(selectedServices).reduce((total, service) => {
      const price = service.price ? parseFloat(service.price) : 0;
      return total + price;
    }, 0) * 100; // Convert to cents
  };

  const fetchPaymentIntentClientSecret = async () => {
    const amount = calculateTotalPrice(selectedServices); // Calculate total price

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/booking/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount, // Send the calculated amount
        salonName, // Include salon name
        selectedStylist, // Include selected stylist
        selectedDate, // Include selected date
        selectedTime, // Include selected time
        customerEmail: email // Include customer email
      }),
    });

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter all details");
      return;
    }
  
    const billingDetails = { email };
  
    try {
      setIsProcessing(true); // Set loading state to true
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        Alert.alert("Unable to process payment", error);
        setIsProcessing(false); // Reset loading state
        return;
      }
  
      const formattedSelectedServices = Object.values(selectedServices).map(service => ({
        serviceName: service.name,
        price: service.price
      }));
  
      const stylistName = selectedStylist?.name;
  
      const { paymentIntent, paymentError } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        billingDetails: billingDetails
      });
  
      if (paymentError) {
        Alert.alert(`Payment Confirmation Error: ${paymentError.message}`);
        console.log(paymentError);
      } else if (paymentIntent) {
        console.log("Payment Successful", paymentIntent);
        Alert.alert("Payment successful");
        nextStep()
  
        // Create booking after successful payment
        const bookingResult = await createBooking(paymentIntent.id, formattedSelectedServices, stylistName);
        console.log("Booking created:", bookingResult);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("An unexpected error occurred");
    } finally {
      setIsProcessing(false); // Reset loading state
    }
  };
  
  // Update createBooking to include services and stylistName
  const createBooking = async (paymentIntentId, formattedSelectedServices, stylistName) => {
    const bookingData = {
      salonName,
      selectedServices: formattedSelectedServices,
      selectedStylist: { stylistName },
      selectedDate,
      selectedTime,
      customerEmail: email,
      paymentIntentId // Send the payment intent ID
    };
  
    const response = await fetch(`${API_URL}/booking/create-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData),
    });
  
    const result = await response.json();
    return result;
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: '4242 4242 4242 4242' }}
        onCardChange={cardDetails => setCardDetails(cardDetails)}
        cardStyle={styles.card}
        style={styles.cardContainer}
      />
      {isProcessing ? ( // Show loading indicator
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    borderColor: 'gray',
  },
});
