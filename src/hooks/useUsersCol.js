import {useEffect, useState} from "react";
import {collection, db, getDocs} from "../FirebaseAPI/Firebase";

export const useUsersCol= () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const dataColl = await getDocs(collection(db, "users"));
            setUsers(dataColl.docs.map((user) => ({...user.data(), id: user.id})));
        }
        getUsers();
    }, [])
    return users;
}