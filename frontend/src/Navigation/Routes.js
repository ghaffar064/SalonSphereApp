import { NavigationContainer } from "@react-navigation/native";
import React,{useState} from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";



export default function Routes({login, onSignIn,permissionStatus, setPermissionStatus,
    location,setLocation,address,setAddress,allSalons,categories

 }) {
 

console.log(login)
  return <>
        {login? <MainStack allSalons={allSalons} categories={categories}
        
        permissionStatus={permissionStatus}
        location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
        
        setPermissionStatus={setPermissionStatus}/>:<AuthStack onSignIn={onSignIn} />}

  </>;
}
