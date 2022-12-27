import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword} from "firebase/auth";
import {auth, db} from "../../API/Firebase";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {useState} from "react";
import {useDocData} from "../../hooks/useDocData";
import {ContentLoader} from "../../components/UI/Loader/ContentLoader";

export const UsersList = () => {
    const [users,loading,setUsers]=useDocData('users','all');
    const [currentUser]=useDocData('users');

    const [input,setInput]=useState({
        name:'', email:'', pass:''    });
    const [UserSelected, setUserSelected]=useState('');
    const {name,email,pass}=input;
    const [prev,setPrev]=useState(currentUser);

    const handleChange=(e)=>{setInput({...input,[e.target.name]:e.target.value})}
    const select=(user) =>{
        setUserSelected(user);
        setInput({
            name:user.username,
            email:user.email,
            pass:user.password
        })
    }


    const update = async()=>{

        try {const res =await signInWithEmailAndPassword(auth, UserSelected.email, UserSelected.password);
            updateEmail(res.user, input.email).then(() => {
                updatePassword(res.user, input.password).then(() => { alert("User updated!")});
            })
            await updateDoc(doc(db,'users', UserSelected.ID),{
                username:input.username,
                email:input.email,
                password:input.password
            });

            await signInWithEmailAndPassword(auth, prev.email, prev.password);

            window.location.reload();
        }
        catch (err){alert(err)}


    }
const giveAdmin=async () => {
    await updateDoc(doc(db, 'users', UserSelected.ID), {
        admin:!UserSelected.admin

    });
    window.location.reload();
}
    const giveConsult=async () => {
        await updateDoc(doc(db, 'users', UserSelected.ID), {
            consult:{isConsult:!UserSelected.consult.isConsult}
        });
        window.location.reload();
    }
    const createUser= async (username,email,pass)=>{
        const authorize = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, 'users', authorize.user.uid),
            {username:username,email:email,password:pass, id:authorize.user.uid,banned:false})
        setInput({
            name:'',
            email:'',
            pass:''
        })
        await signInWithEmailAndPassword(auth, prev.email, prev.password);
        alert("User created!");
        window.location.reload();

    }

    const Ban = async()=> {
        await updateDoc(doc(db,'users',UserSelected.ID),{isDisabled:!UserSelected.isDisabled});
        window.location.reload();
    }

   async function Activate() {
       await updateDoc(doc(db,'users',UserSelected.ID),{isActive:!UserSelected.isActive});
       window.location.reload();
    }

    return (
        <>
            {loading?<ContentLoader/>:<div>

            <div>
                <h5 >Пользыватели</h5>
                <label className="label">
                    <span>Company name:</span>
                    <input
                        type="text" id="fullName"
                        required="required"
                        value={name}
                        name={'name'}
                        onChange={handleChange}
                        className="form-control"/></label>
                <label className="label"><span>Email: </span>
                    <input  type="email" id="email"
                            required="required"
                            value={email}
                            onChange={handleChange}
                            name={'email'}
                            className="form-control"/></label>
                <label  className="label">
                    <span>Password: </span>
                    <input  type="text" id="password"
                            required="required"
                            value={pass}
                            onChange={handleChange}
                            name={'pass'}
                            className="form-control"/></label>

            </div>
            <br/>
            <button className="btn btn-info m-lg-1" onClick={()=>{createUser(name,email,pass)}} id={'createUser'}>Create</button>
            {UserSelected?
                <><button className="btn btn-info m-lg-1 "  onClick={update} id={'updateUser'}>Update</button>
                    <button className="btn btn-info m-lg-1" onClick={Activate} id={'ban'}>Disable/Active</button>
                    <button className="btn btn-info m-lg-1" onClick={Ban} id={'ban'}>Ban</button>
                    <button className="btn btn-info m-lg-1" onClick={giveAdmin} id={'ban'}>Disable/Enable Admin</button>
                    <button className="btn btn-info m-lg-1" onClick={giveConsult} id={'ban'}>Disable/Enable Consultant</button>
                </>
                :''}
            <table id="usersList" style={{marginTop: "10px"}} className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Consultant</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user,index)=>{
                    return(
                        <tr key={index} onClick={()=>{select(user)}}>
                            <td className={"p-1"}> {index+1}</td>
                            <td className={"p-1"}> {user.username}{user.isDisabled?<b>(Banned)</b>:user.isActive?'':<b>(Not Active)</b>}</td>
                            <td className={"p-1"}> {user.email}</td>
                            <td className={"p-1"}>{user.password}</td>
                            <td className={"p-1"}>{JSON.stringify(user.admin)}</td>
                            <td className={"p-1"}>{JSON.stringify(user.isConsult)}</td>
                        </tr>
                    )})}
                </tbody>



            </table>
        </div>}</>
    );

}