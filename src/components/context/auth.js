import React from 'react';
import {createContext,useEffect,useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../API/Firebase";
import {ContentLoader} from "../UI/Loader/ContentLoader";
import {MainLoader} from "../UI/Loader/MainLoader";
export const AuthContext =createContext()
const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
    setUser(user);
setLoading(false);
},[])
    });
    if(loading){return <MainLoader className={'d-flex justify-content-center align-items-center'} style={{height : "100vh"}}/> }
    return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
}
export default AuthProvider;