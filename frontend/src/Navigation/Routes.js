import { NavigationContainer } from "@react-navigation/native";
import React,{useState} from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";



export default function Routes({login, onSignIn,nailsalon,hairsalon,permissionStatus, setPermissionStatus,
    location,setLocation,address,setAddress

 }) {
 


  return <>
        {login? <MainStack nailsalon = {nailsalon} hairsalon = {hairsalon}
        
        permissionStatus={permissionStatus}
        location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
        
        setPermissionStatus={setPermissionStatus}/>:<AuthStack onSignIn={onSignIn} />}

  </>;
}
