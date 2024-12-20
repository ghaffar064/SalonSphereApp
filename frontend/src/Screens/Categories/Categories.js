import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SearchBar from '../../components/SearchBar'
import Cards from '../../components/Cards/Cards';

import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import color from '../../constants/color';
import { useRoute } from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';


export default function Categories({navigation}) {
    const {
        params:{
                    category
        }
    } = useRoute();
  
    const handleInput = () => {
      navigation.navigate(navigationStrings.SEARCHSCREEN)
    };
  return (
    <View style={{flex:1}}>
     <View style={{
        justifyContent:'center',
        backgroundColor:color.background,
        padding:moderateVerticalScale(12),
        borderBottomEndRadius:moderateScale(80)
        }}>
    <SearchBar placeholder={category.placeholder}
           onFocus={handleInput}
    />
    
    </View>
    <Cards data ={category.data}/>
   </View>
  )
}
