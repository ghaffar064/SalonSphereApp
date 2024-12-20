import React, { useState, useEffect, useCallback  } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  SafeAreaView
} from 'react-native';
import { API_URL } from '../../../ipconfig';
import Cards from '../../components/Cards/Cards';
import color from "../../constants/color";
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";
import navigationStrings from '../../constants/navigationStrings';
import SearchBar from '../../components/SearchBar';



const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const handleBackPress = () => {
    
    navigation.navigate(navigationStrings.TABROUTES); 
  
};
  // Handle Android Back Button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(navigationStrings.TABROUTES);
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  // Fetch search results from backend
  const fetchResults = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/searchquery/search?query=${query}`);
      const data = await response.json();
      setResults(data); // Assuming the response is an array of search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
  
    // Clear previous debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  
    // If the input is cleared, reset the results immediately
    if (text.trim() === '') {
      setResults([]); // Clear results when input is cleared
    } else {
      // Set a new debounce timer to wait before making the API call
      const timer = setTimeout(() => {
        if (text.trim()) {
          fetchResults(text);
        }
      }, 500); // Adjust delay (500ms) as needed
      setDebounceTimer(timer);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
    <TouchableOpacity
           onPress={handleBackPress}
            style={{
              position: "absolute",
              left: moderateScale(18),
              top: moderateVerticalScale(35),
              backgroundColor: "white",
              borderRadius: 100,
              
            }}
          >
            <ArrowLeftIcon size={30} color={color.background} />
          </TouchableOpacity>
     
    </View>
      {/* Search Bar */}
      
       <SearchBar
      placeholder="Search for salons or services"
      containerStyle={{
        height: 50,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
       
      }}
      value={searchQuery}
      onChangeText={handleInputChange}
      
    />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#000" style={styles.loading} />}

      {/* Display Search Results */}
      {results.length > 0&&searchQuery!=='' ? (
       
        <TouchableOpacity style={styles.resultItem} >
              <Cards data={results}/>
            </TouchableOpacity>
      ) : (
        searchQuery.trim() === '' && (
          <Text style={styles.placeholderText}>Start typing to see results...</Text>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    
  },
  header: {
    backgroundColor: color.background,
    padding: 40,
   
    marginBottom: 10,
  },
 
  loading: {
    marginVertical: 20,
  },
  resultItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 16,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default SearchScreen;