import {useEffect, useState} from "react";
import {onSnapshot, orderBy, query, where} from "firebase/firestore";
import {auth, collection, db} from "../API/Firebase";


export const useMessageCol = (coll, consult) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {


        setLoading(true);
        if (coll !== 'ActiveUsers') {
            const a = onSnapshot(
                query(coll, orderBy('createdAt', 'asc')),
                async querySnap => {
                    let msg = [];
                    await querySnap.forEach(d => {
                        msg.push(d.data())
                    });
                    console.log("MSGS FETCHED");

                    return setData(msg);

                })
            return (() => a())
        }else{
            const u = collection(db, "users");
            const q = query(u, where("chat", "==", auth.currentUser.uid));
            const b= onSnapshot(q, (querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });

                return setData(users);
            });
            return (() => b())
        };

        setLoading(false);

    }, [consult])
    return [data, setData, loading];
}