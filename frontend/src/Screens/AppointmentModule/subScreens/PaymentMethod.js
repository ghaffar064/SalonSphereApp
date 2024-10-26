import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { BookingContext } from '../../../contextApi/BookingContext';

export default function PaymentMethod({
  selectedServices,
  selectedStylist,
  selectedDate,
  selectedTime,
  salonName,
  nextStep,
  salon


})

{
  console.log("payment ",salon)
  console.log(selectedServices);
  const { addBooking } = useContext(BookingContext);
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    const servicesArray = Object.values(selectedServices || {});

    const amount = servicesArray.reduce(
      (total, service) => total + parseFloat(service.price || 0),
      0
    ) * 100;

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/booking/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        salonName,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerEmail: email,
      }),
    });

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

 const handlePayPress = async () => {
  if (!cardDetails?.complete || !email) {
    Alert.alert('Please enter all details');
    return;
  }

  const billingDetails = { email };

  try {
    setIsProcessing(true);
    const { clientSecret, error } = await fetchPaymentIntentClientSecret();

    if (error) {
      Alert.alert('Unable to process payment', error);
      setIsProcessing(false);
      return;
    }

    const { paymentIntent, paymentError } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      billingDetails,
    });

    if (paymentError) {
      Alert.alert(`Payment Confirmation Error: ${paymentError.message}`);
    } else {
      const newBooking = {
        salonName,
        salon, // Include the entire salon object
        selectedServices,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerEmail: email,
        paymentIntentId: paymentIntent.id,
      };

      console.log('Adding new booking:', newBooking);
      await addBooking(newBooking); // Save the booking
      nextStep(); // Proceed to the next step
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('An unexpected error occurred');
  } finally {
    setIsProcessing(false);
  }
};

  
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled
        placeholders={{ number: '4242 4242 4242 4242' }}
        onCardChange={setCardDetails}
        cardStyle={styles.card}
        style={styles.cardContainer}
      />
      {isProcessing ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  input: { height: 40, borderWidth: 1, marginBottom: 20, padding: 10 },
  cardContainer: { height: 50, marginVertical: 30 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 5 },
});
