import React, { useLayoutEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { 
  scale, 
  verticalScale, 
  moderateScale, 
  moderateVerticalScale 
} from "react-native-size-matters";
import { 
  ArrowLeftIcon, 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  ChatBubbleLeftEllipsisIcon 
} from "react-native-heroicons/outline";
import color from "../../constants/color";
import TopTab from "../../Navigation/TopTab";
import navigationStrings from "../../constants/navigationStrings";
import { IMAGELOCATION } from "../../../ipconfig";

export default function Shop() {


  const navigation = useNavigation();
  const route = useRoute();
  const { item} = route.params || {}; 

   

 
  
  const [selected, setSelected] = useState({});

  // Check if any service is selected
  const hasSelectedService = Object.values(selected).some((service) => service !== null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: verticalScale(20),
          }}
        >
         
          <Image
           

            source={{ uri: `${IMAGELOCATION}${item.coverImage}`}}
            style={{
              width: "105%",
              height: moderateScale(200),
            }}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{
              position: "absolute",
              left: moderateScale(8),
              top: moderateVerticalScale(16),
              backgroundColor: "white",
              borderRadius: 100,
            }}
          >
            <ArrowLeftIcon size={30} color={color.background} />
          </TouchableOpacity>
        </View>
        
        <View style={{ backgroundColor: "white", margin: moderateScale(5) }}>
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: "500",
              color: color.textColor,
            }}
          >
            {item.name}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", marginRight: moderateScale(15) }}>
              <StarIcon size={22} color="grey" fill={color.background} />
              <StarIcon size={22} color="grey" fill={color.background} />
              <StarIcon size={22} color="grey" fill={color.background} />
              <StarIcon size={22} color="grey" />
              <StarIcon size={22} color="grey" />
            </View>
            <View style={{ flexDirection: "row", right: 10 }}>
              <TouchableOpacity
                style={{ right: moderateScale(20), borderRadius: 100 }}
              >
                <PhoneIcon size={22} color={color.background} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderRadius: 100, right: moderateScale(10) }}
              >
                <ChatBubbleLeftEllipsisIcon size={22} color={color.background} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: moderateScale(5) }}>
            <MapPinIcon size={20} color="grey" />
            <Text>{item.address}</Text>
          </View>
        </View>

        <TopTab
            shopData = {item}
          services={item.services}
          selected={selected}
          onSelect={(serviceType, option) => {
            setSelected((prev) => ({
              ...prev,
              [serviceType]: option,
            }));
          }}
        />

        {/* Conditionally render the "Choose Next" button */}
        {hasSelectedService && (
          <View style={{ marginVertical: moderateVerticalScale(20), alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.STEPPERFORMSCREEN, {
                  selectedServices: selected,
                  stylists: item.stylists,
                  salonName: item.name,
                  salonId: item.salonId,
                  salon:item,
                })
              }
              style={{
                backgroundColor: color.background,
                paddingVertical: moderateVerticalScale(10),
                paddingHorizontal: moderateScale(20),
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: scale(16) }}>Choose Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
