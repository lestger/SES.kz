import React from 'react';
import './message.css'
const Message = ({msg, userid}) => {
    return (
        <>
            <div className={`${(msg.sender===userid)?'chat-message-right':'chat-message-left'} mb-1`}>
                <div className={` text-break `} style={{borderRadius:"20px" ,margin:"10px"}}>
                    {msg.text}
                    <span className={ `badge fw-light fst-italic badge-pill float-end text-white mt-2 }`} style={{fontSize:"12px" }}>{msg.createdAt.toDate().getHours()}:{msg.createdAt.toDate().getMinutes()}</span>

                </div>
            </div>

        </>

    );
};

export default Message;