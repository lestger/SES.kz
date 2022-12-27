import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../API/Firebase";
import {useMessageCol} from "../hooks/useMessageCol";
import React, {useState} from "react";
import {useDocData} from "../hooks/useDocData";

export const Comments = ({id, item}) => {
    const col=collection(db, 'comments',id,'comments');
    const [comments,setComments,loading]=useMessageCol(col,item);
    const [user]=useDocData('users')
    const [text,setText]=useState('');
    async function submitComment() {
        setText('');
        await addDoc(col, {
            name: user.username,
            text: text,
            userId: auth.currentUser.uid,
            id:col.id,
            createdAt:Date.now()

        });
        console.log('submitted')
    }

    return (
        <><h3>Коментарии</h3>
            <div className={'comments-box'}>
                {
                    comments?.map((comment,index)=>
                        <div className={'p-1'} key={index}>
                            <b>{comment.name}: </b>
                            <p>{comment.text}</p>
                        </div>)}
            </div>

            <form className="input-group mb-3" onSubmit={(e)=>{e.preventDefault(); submitComment()}}>
                <input type="text" className="form-control" placeholder="Коментарии..."
                       value={text} onChange={(e)=>{setText(e.target.value)}}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Отправить</button>
                </div>
            </form></>
    )
}