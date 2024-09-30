import { View, Text , TouchableOpacity,StyleSheet, SafeAreaView,Image,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import {
 
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import imagePath from '../../constants/imagePath';
import GetLocation from '../../components/GetLocation';
import navigationStrings from '../../constants/navigationStrings';
import CustomizedTextInput from '../../components/CustomizedTextInput'
import SearchBar from '../../components/SearchBar';
import styles from './styles';

import color from '../../constants/color';
import {BellIcon} from "react-native-heroicons/outline";

export default function Home({navigation,nailsalon,hairsalon,permissionStatus,setPermissionStatus,
location,setLocation,address,setAddress

}) {
  
 
  const [hairSalonData, setHairSalonData] = useState();
  const [nailSalonData, setNailSalonData] = useState();
  useEffect(() => {
    setHairSalonData(hairsalon); 
    setNailSalonData(nailsalon)
  }, []);
      const categories= [
        
        {name:'Hair Salon',
          imagePath:imagePath.hairsalon,
          navigate:navigationStrings.HAIRSALON,
          placeholder:"Search your hair salon",
          data :hairSalonData
          

        },
        
          {name:'Nail Salon',
          imagePath:imagePath.nailsalon,
          navigate:navigationStrings.NAILSALON,
          placeholder:"Search your nail salon",
          data :nailSalonData

        },

          {name:'Makeup',
          imagePath:imagePath.makeup,
          navigate:navigationStrings.MAKEUP,
          placeholder:"Search your makeup artist",
          data :nailSalonData
        },
          {name:'Skin Care',
          imagePath:imagePath.skincare,
          navigate:navigationStrings.SKINCARE,
          placeholder:"Search skin care products",
          data :nailSalonData
        },
          {name:'Spa',
          imagePath:imagePath.spa,
          navigate:navigationStrings.SPA,
          placeholder:"Search your spa",
          data :nailSalonData
        },
          {name:'Home Service',
          imagePath:imagePath.homeservice,
          navigate:navigationStrings.HOMESERVICE,
          placeholder:"Search home service",
          data :nailSalonData
        },
                         
                        
                        
                        ]

  return (
    <SafeAreaView style = {styles.container} >
     <View style = {styles.view1}>
       
     
         <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
         <View>
          <Text style = {styles.userText}>Hii Ghaffar, Lahore</Text>
         
          <GetLocation permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}
            location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
          
          />
       
         
          
          </View>
          <TouchableOpacity onPress={()=>{navigation.navigate(navigationStrings.NOTIFICATION) }}>
         <BellIcon size={30} color={color.background} fill={color.foreground}/>
          </TouchableOpacity>
         </View>
    
        <SearchBar placeholder={"Search"}/>
    
  {/**/}
      
     </View>
     <View style = {styles.view2}>
          <Text style={styles.headingText}>Welcome</Text>
          <Text style={styles.headingText}>What are you looking for?</Text>

     </View>
     <View style = {styles.view3}>
     {categories.map((category,i)=>
            <TouchableOpacity style={styles.buttons}
      key={i}
      
      onPress={()=>{navigation.navigate(navigationStrings.CATEGORIES,{
        category
      })}}
      >
        <Image source={category.imagePath} style={{height:moderateVerticalScale(100),width:moderateScale(100)}}/>
          <Text style={{color:color.textColor}}>
           {category.name}
          </Text>
        </TouchableOpacity>
    
    )}
     
     </View>
    </SafeAreaView>
  )
}
