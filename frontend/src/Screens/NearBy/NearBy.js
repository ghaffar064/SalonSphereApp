import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import color from '../../constants/color';
import SearchBar from '../../components/SearchBar'
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import * as Location from 'expo-location';
import MapView, { Marker,Callout } from 'react-native-maps';
import Map from '../../components/Map';

export default function NearBy({nailsalon,hairsalon,permissionStatus,setPermissionStatus,location

  ,setLocation,address,setAddress
}) {
  
  return (
    <SafeAreaView style={{flex:1}}>
     
    <View style={{
       justifyContent:'center',
       backgroundColor:color.background,
       paddingVertical:moderateVerticalScale(30),
       borderBottomEndRadius:moderateScale(80),
        paddingLeft:moderateScale(10)
       }}>
         <Text style={{color:'white',fontSize:scale(17)}}>Near by you</Text>
         <Text style={{color:'white',fontSize:scale(13),marginTop:moderateVerticalScale(5),
        marginBottom:moderateVerticalScale(10)}}>Search your nearest salon</Text>
   <SearchBar placeholder="Search"/>


   
   </View>
      
   <Map nailsalon = {nailsalon} hairsalon = {hairsalon} permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}
      location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
   />

      
  
  </SafeAreaView>
  )
}