import {collection, getDoc, onSnapshot} from "firebase/firestore";
import {auth, doc, getDocs} from "../API/Firebase";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/context/auth";
import {db} from "../API/Firebase";

export const useDocData = (path,id)=>{
    const {user}=useContext(AuthContext);
const  [data,setData]=useState([]);
const [loading,setLoading]=useState(false);
         useEffect(  () => {
            const fetchUserData= async ()=>{
                setLoading(true)
                if(id==='all'){
                    console.log('ALL')
                    const dataColl = await getDocs(collection(db, path));
                    setLoading(false);
                    return  setData(dataColl.docs.map((user) => ({...user.data(), id: user.id})));
                }
                if(id!==undefined){console.log("ID: ",id)
                    await getDoc(doc(db, path, id)).then((docSnap) => {
                            return  docSnap.exists ? setData(docSnap.data()): null;
                        }
                    );setLoading(false);}
             if(user && id===undefined){
                 console.log('CURRENT')
                     await getDoc(doc(db, path,auth.currentUser.uid )).then((docSnap) => {
                         return  docSnap.exists ? setData(docSnap.data()): null;
                     }
                 );setLoading(false);


             }
             else { return null}

            }
       fetchUserData();
         },[])
         return [data,loading,setData];
    }