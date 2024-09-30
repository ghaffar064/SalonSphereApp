import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  
} from "react-native";
import React, { useState,useEffect } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import {
  StarIcon,
  MapPinIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import color from "../../constants/color";

import navigationStrings from "../../constants/navigationStrings";
import { useNavigation } from "@react-navigation/native";

export default function Cards({data}) {
  const navigation = useNavigation();
  const [data1, setData1] = useState([])

 

  const toggleHeart = (index) => {
    const newData = [...data1];
    newData[index].fillheart = !newData[index].fillheart;
    if (newData[index].fillheart) alert("added to favourite");
    setData1(newData);
  };
  useEffect(() => {
    setData1(data); 
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data1}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.SHOP, { item});
            }}
          >
            <View
              style={{
                flexDirection: "row",
                margin: verticalScale(6),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(10),
                backgroundColor: "white",
                borderColor: "white",
              }}
            >
              <View style={{ flex: 0.3 }}>
                <Image
                  source={item.image}
                  style={{
                    width: moderateScale(120),
                    height: moderateVerticalScale(120),
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 0.6,
                }}
              >
                <View style={{ padding: moderateScale(20) }}>
                  <Text
                    style={{
                      fontSize: scale(17),

                      fontWeight: "400",
                      color,
                    }}
                  >
                    {item.name}
                  </Text>

                  <View style={{ flexDirection: "row" }}>
                    <StarIcon color="grey" fill={color.foreground} size={15} />
                    <StarIcon color="grey" fill={color.foreground} size={15} />
                    <StarIcon color="grey" fill={color.foreground} size={15} />
                    <StarIcon color="grey" size={15} />
                    <StarIcon color="grey" size={15} />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <MapPinIcon size={18} color="grey" />
                    <Text
                      style={{
                        fontSize: scale(12),
                        color: color.textColor,
                      }}
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => toggleHeart(index)}
                style={{ flex: 0.1, paddingVertical: moderateVerticalScale(5) }}
              >
                {item.fillheart ? (
                  <HeartIcon size={20} color="grey" fill={color.background} />
                ) : (
                  <HeartIcon size={20} color="grey" />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
