import './ChatWidget.css'
import React, {useRef, useState} from "react";
import {BsChatRightText} from "react-icons/bs";
import {BiSend} from "react-icons/bi";
import img from '../../img/icons/profile.svg'
import {useDetectOutsideClick} from "../../hooks/useDetectOutsudeClick";
import {addDoc, arrayUnion, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {auth, collection, db, storage} from "../../API/Firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useMessageCol} from "../../hooks/useMessageCol";
import {ContentLoader} from "../UI/Loader/ContentLoader";
import Message from "../UI/Message/Message";

export const ChatWiget = () => {
    const [consult,setConsult]=useState('');
    const [isTalking,setIsTalking]=useState(false)
    const el = useRef();
    const [active, setActive] = useDetectOutsideClick(el, false);
    const msgRef = collection(db, "messages", consult.ID + auth.currentUser.uid, 'chat')
    const [messages] = useMessageCol(msgRef,consult);
    const [text, setText] = useState('');
    const [loading,setLoading]=useState(false);

    const submitMessage = async (id) => {
        setText("");
        let url;
        if (img) {
            const imgRef = ref(storage, `messages/${id}/${new Date().getTime()}-${img.name}`);
            const snap = await uploadBytes(imgRef, img);
            url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        }
const messageCollection=collection(db, 'messages', (id+auth.currentUser.uid), 'chat');
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

    const getActiveConsultant = async () => {
        const consultantRef = collection(db, "users");
        const q = await query(consultantRef, where("isFree", "==", true));
        debugger
        const querySnapshot = await getDocs(q);
        let activeConsultants = [];
        querySnapshot.forEach((doc) => {
            activeConsultants.push(doc.data());
        });
        let random=Math.floor(Math.random() * activeConsultants.length);
        console.log(activeConsultants);
        if(activeConsultants.length!==0){
            await updateDoc(doc(db, 'users', activeConsultants[random].ID), {
                isFree: false,
                users:arrayUnion(auth.currentUser.uid)
            });
            return activeConsultants[random];
        }
        else{return null}


    }
    const finishConversation = async (id) => {

        setLoading(true);
        console.log(id)
        await updateDoc(doc(db, 'users', id), {
            isFree: true,
            users: []
        });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            chat:''
        });
        setConsult('');
        setIsTalking(false);
        setLoading(false)
    }
    const openChat=async ()=>{
        setLoading(true);
        const activeConsultant = await getActiveConsultant();

        setConsult(activeConsultant);
        console.log("OPENED: ",activeConsultant);

        setIsTalking(true);

        if(activeConsultant){
            collection(db, 'messages', 'chat',(activeConsultant.ID + auth.currentUser.uid));

            await updateDoc(doc(db, "users", auth.currentUser.uid), {chat: activeConsultant.ID});
        }
        else{}
        setLoading(false);

    }


    return (
        <div className={`chat-container ${active ? `chat-container-active` : ''}`} ref={el} >
            <span className={'chat-header-span'} onClick={()=>{setActive(!active)}}><BsChatRightText/>Чат</span>
            <div className="message-container ">
                <div className="chat-interlocutor">
                    <img src={img} alt=""/>
                    <span>{consult ? consult.username :<>Консультант</>}</span>

                </div>
                <div className="message-label ">
                    {isTalking?
                        loading?
                        <ContentLoader className={'d-flex justify-content-center'}/>
                        :
                         messages.length===0?
                             <div className={'chat-message-left mb-1'}>
                                 <div className={` text-break `} style={{borderRadius:"20px" ,margin:"10px"}}>
                                    Здравствуйте! Благодорим вас за использывания Пакета SES.PRO!
                                     Наш Сотрудник ответит через некоторое время. Пожалуйста, Будьте терпеливы.
                                 </div>
                             </div>
                             :messages?.map((m)=><Message msg={m} userid={auth.currentUser.uid} key={m.id}/>)
                        :<>Начните разговор с консультантом</>}
                </div>
<div><button className={`btn btn-outline-primary m-1 ${consult?'visually-hidden':''}`} onClick={()=>{openChat()}}>Начать разговор</button>
    <button className={`btn btn-outline-primary m-1 ${consult?'':'visually-hidden'}`} onClick={()=>{finishConversation(consult.ID)}}>Завершить</button>
</div>
                <form className="input-group mb-3" onSubmit={(e)=>{e.preventDefault();submitMessage(consult.ID)}}>

                    <input type="text" className="form-control" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder="Сообщение..."/>
                    <span className="input-group-text" id="basic-addon1"><BiSend/></span>
                </form>
            </div>
        </div>
    )
}