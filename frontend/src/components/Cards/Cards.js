import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { useFavorites } from "../context/FavoritesContext";

export default function Cards({ data }) {
  const { favorites, updateFavorites } = useFavorites();
  const [data1, setData1] = useState([]);

  useEffect(() => {
    setData1(data);
  }, [data]);

  const toggleHeart = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.id !== item.id);
      Alert.alert("Removed from favorites");
    } else {
      newFavorites = [...favorites, item];
      Alert.alert("Added to favorites");
    }

    updateFavorites(newFavorites);
  };

  return (
    <FlatList
      data={data1}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => toggleHeart(item)}>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <HeartIcon size={24} color={favorites.some((fav) => fav.id === item.id) ? "red" : "grey"} />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
