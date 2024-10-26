import { NavigationContainer } from "@react-navigation/native";
import React,{useState} from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";



export default function Routes({
  login, 
  onSignIn, 
  permissionStatus, 
  setPermissionStatus,
  location, 
  setLocation, 
  address, 
  setAddress, 
  allSalons, 
  categories, 
  setLogin,
}) {
  console.log("From Routes:", login);

  return login ? (
    <MainStack 
      allSalons={allSalons} 
      categories={categories}
      permissionStatus={permissionStatus}
      location={location} 
      setLocation={setLocation} 
      address={address} 
      setAddress={setAddress}
      onSignIn={onSignIn} 
      setLogin={setLogin} 
      login={login}
      setPermissionStatus={setPermissionStatus}
    />
  ) : (
    <AuthStack onSignIn={onSignIn} />
  );
}

