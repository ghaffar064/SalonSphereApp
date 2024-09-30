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


export default function Categories() {
    const {
        params:{
                    category
        }
    } = useRoute();
   
  return (
    <View style={{flex:1}}>
     <View style={{
        justifyContent:'center',
        backgroundColor:color.background,
        padding:moderateVerticalScale(12),
        borderBottomEndRadius:moderateScale(80)
        }}>
    <SearchBar placeholder={category.placeholder}/>
    
    </View>
    <Cards data ={category.data}/>
   </View>
  )
}