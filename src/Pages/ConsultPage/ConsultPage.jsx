import icon from '../../img/logo/SES.kz.png';
import './consultPage.css'
import AvailableUsers from "./AvailableUsers";
import Message from "../../components/UI/Message/Message";
import {BiSend} from "react-icons/bi";
import React, {useState} from "react";
import img from "../../img/icons/profile.svg";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {auth, collection, db, storage} from "../../API/Firebase";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {useMessageCol} from "../../hooks/useMessageCol";

export const ConsultPage = () => {

    const [user,setUser]=useState('');
    const [messages] = useMessageCol(collection(db, "messages",  auth.currentUser.uid + user.ID, 'chat'),user);

    const [text,setText]=useState('')
    const submitMessage = async (id) => {
        setText("");
        let url;
        if (img) {const imgRef = ref(storage, `messages/${id}/${new Date().getTime()}-${img.name}`);
            const snap = await uploadBytes(imgRef, img);
            url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        }
        const messageCollection=collection(db, 'messages', (auth.currentUser.uid+id), 'chat');
        await addDoc(messageCollection, {
            text,
            sender: auth.currentUser.uid,
            to: id,
            createdAt: new Date(),
            mediaName: img.name || '',
            mediaUrl: url || '',
            id: Date.now().toString(36) + Math.random().toString(36).substr(2)
        });
    }
    const [activeUsers,setActiveUsers]=useMessageCol('ActiveUsers',user);

    const finishConversation = async (id) => {

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isFree: true,
            users: []
        });
        await updateDoc(doc(db, 'users', id), {
            chat:''
        });

    }
    return (
        <>



            <div className=" consult-container">
                <div className={'users-list-group'}>
                    <div className={'users-list-item'}>
                        {activeUsers.map((user) => <AvailableUsers finish={finishConversation}user={user}  key={user.ID} setUser={setUser}/>)}
                        <center><hr className="my-1" style={{width: "50px"}}/></center>
                    </div>
                </div>
                <div style={{display:"absolute", width:'100%',height:'100%'}}>
                    {user && activeUsers.length!==0?
                        <>
                            <div className={"interlocutor-data-field"}>
                               <div>
                                    <strong>{user.username}</strong>
                                    <div className="text-muted small"><em>{user.email}</em></div>
                                </div>
                            </div>

                            <div className="consult-messages p-4 " >
                                {messages.length && messages.map((message, i) => <Message msg={message} userid={auth.currentUser.uid} key={i}/>)}
                            </div>
                            <form className="input-group mb-3" onSubmit={(e)=>{e.preventDefault();submitMessage(user.ID)}}>

                                <input type="text" className="form-control" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder="Сообщение..."/>
                                <span className="input-group-text" id="basic-addon1"><BiSend/></span>
                            </form></>

                        :


                        <div className={" user-label centering "} style={{height:'89vh'}}>
                            <div><img src={icon}  alt={'icon'}/>
                                <br/>
                                <i>Select a user to start conversation</i></div>


                        </div>}</div>


            </div></>
    )
}