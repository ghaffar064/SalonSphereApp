import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function PaymentMethod({ salonName, salonId, selectedServices }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    try {
      const response = await fetch('http://192.168.100.11:3500/booking/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salonId,
          salonName,
          selectedServices,
        }),
      });

      const data = await response.json();
      console.log("Checkout response:", data); // Log the response for debugging

      if (!response.ok || !data.clientSecret) {
        throw new Error('Failed to fetch client secret');
      }

      const { clientSecret, customerId, ephemeralKey } = data;

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        customerId,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: salonName,
      });

      if (error) {
        Alert.alert('Error', error.message);
        console.log(error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize payment sheet. Please try again.');
      console.error('PaymentSheet initialization error:', error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Payment failed', error.message);
      console.log(error);
    } else {
      Alert.alert('Success', 'Your payment is confirmed!');
      // Navigate to confirmation screen or update UI
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    Object.keys(selectedServices).forEach(serviceKey => {
      const service = selectedServices[serviceKey];
      total += parseInt(service.price.replace('Rs. ', ''), 10);
    });
    return total * 100; // Amount in cents
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Payment Method</Text>
      <Text>Salon Name: {salonName}</Text>
      <Text>Total Amount: Rs. {calculateTotalAmount() / 100}</Text>
      <Button title="Proceed to Pay" onPress={openPaymentSheet} />
    </View>
  );
}
