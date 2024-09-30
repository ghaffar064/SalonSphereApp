import { StyleSheet,Dimensions} from 'react-native'

import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import color from '../../constants/color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
const deviceheight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
 const styles = StyleSheet.create({

    container:{
     
      backgroundColor:'white',
      flex:1
     
     
     
    },
  
    view1:{
     
      justifyContent:'center',
      backgroundColor:color.background,
      padding:moderateScale(28),
      backgroundColor:color.background,
      borderBottomEndRadius:moderateScale(80),
     
     
          
     
      
      
    },
    view2:{
      
     
      alignItems:'center',
      padding:moderateScale(2),
      

     
      

    },
    view3:{
      
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center',
      flexWrap:'wrap',
      
   
      

  
    },
    userText:{
      
      fontSize:scale(15),
      color:'white'
    
    },
   
    locationview:{
      flexDirection:'row',
     
    },
    headingText:{
        fontSize:scale(18),
        color:color.textColor,
        fontStyle:'italic'
      
    },
    buttons:{borderWidth:moderateScale(1),width:'45%',alignItems:'center',justifyContent:'center',
    borderRadius:moderateScale(20),margin:scale(8),
    borderColor:color.background,color:'white'
    

}
  })
  export default styles;