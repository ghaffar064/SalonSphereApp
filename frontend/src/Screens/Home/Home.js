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
import axios from 'axios'
export default function Home({navigation,permissionStatus,setPermissionStatus,
location,setLocation,address,setAddress

}) {
  
  const [hairSalonData, setHairSalonData] = useState([]);
  const [nailSalonData, setNailSalonData] = useState([]);
  const [homeServiceData, setHomeServiceData] = useState([]);
  const [makeUpData, setMakeUpData] = useState([]);
  const [spaData, setSpaData] = useState([]);

  
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        // Fetch hair salons
        const hairResponse = await axios.get('http://192.168.100.11:3500/api/salon/getSalons?salonType=hair');
        setHairSalonData(hairResponse.data);
        
        // Fetch nail salons
        const nailResponse = await axios.get('http://192.168.100.11:3500/api/salon/getSalons?salonType=nail');
        setNailSalonData(nailResponse.data);
        const homeResponse = await axios.get('http://192.168.100.11:3500/api/salon/getSalons?salonType=Home Service');
        setHomeServiceData(homeResponse.data);

        const makeUpResponse = await axios.get('http://192.168.100.11:3500/api/salon/getSalons?salonType=Make Up');
        setMakeUpData(makeUpResponse.data);

        const spaResponse = await axios.get('http://192.168.100.11:3500/api/salon/getSalons?salonType=Spa');
        setSpaData(spaResponse.data);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };

    fetchSalons();
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
          data :makeUpData
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
          data :spaData
        },
          {name:'Home Service',
          imagePath:imagePath.homeservice,
          navigate:navigationStrings.HOMESERVICE,
          placeholder:"Search home service",
          data :homeServiceData
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
