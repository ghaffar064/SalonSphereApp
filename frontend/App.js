import React, { useState,useEffect } from "react";
import Routes from "./src/Navigation/Routes";
import { Signin } from ".";
import AuthStack from "./src/Navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { nailsalon,hairsalon } from "./src/components/Dummydata";
import { Provider } from "react-redux";
import { store } from "./store";
import { StripeProvider } from '@stripe/stripe-react-native';
export default function App() {

  const [login, setLogin] = useState(false)
  const handleSignIn = () => {
    setLogin(true);
  };
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);
    
  const [address, setAddress] = useState(null);
  console.log(address,"from app.js")
  

 
  return (
    <StripeProvider publishableKey="pk_test_51PIFiAFdq3SMwAKaqLqamiYft5sraI8d13P9vy0x3mMC2NS1qPdI9Ygm7v8QceNqIgfunx6BwACCIKYQtSwbz7Jm00Cx9Ovein">
    <NavigationContainer>
      <Routes login={login}  onSignIn={handleSignIn} nailsalon = {nailsalon}
       hairsalon = {hairsalon} 
       location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
       permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}/>

    </NavigationContainer>
    </StripeProvider>
  );
}