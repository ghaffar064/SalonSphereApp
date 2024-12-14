import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import StarIcon from 'react-native-vector-icons/Ionicons';
import color from '../../constants/color';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import {XMarkIcon} from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from "@react-navigation/native";
const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const route = useRoute();
  const { salon1 } = route.params || {}; 
  console.log("salon 1 is",salon1);
  
  // console.log('Route params:', useRoute().params);
  // console.log(item.salon._id);

  const handleRating = (value) => {
    setRating(value);
  };
  const navigation = useNavigation();
  const handleSubmit = () => {
    if (rating === 0 || review.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and a review.');
      return;
    }
    Alert.alert('Thank you!', 'Your review has been submitted.');
    setRating(0);
    setReview('');
  };

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection:'row',
       
       alignItems:'center',
       backgroundColor:color.background,
       paddingVertical:moderateVerticalScale(30),
       borderBottomEndRadius:moderateScale(8),
       
        height:100
       }}>
        
        <TouchableOpacity style={{marginLeft:10}} onPress={navigation.goBack} >
        <XMarkIcon color="white" size={28} />
      </TouchableOpacity>

         <Text style={{color:'white',fontSize:scale(17),marginLeft:100}}>Your Review</Text>
        

   
   </View>
      
      

   <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <StarIcon
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color={star <= rating ? '#FF007F' : '#CCCCCC'}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Say something"
        value={review}
        onChangeText={setReview}
        multiline
      />
          
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop:20
  },
  starIcon: {
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: color.background,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Reviews;
