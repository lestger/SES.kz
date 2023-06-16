import React from 'react';
import img from '../../img/icons/profile.svg'
import {AiOutlineStop} from "react-icons/ai";

const AvailableUsers = ({user,setUser,finish}) => {


    return (
        <>
            <button className="users-list-wrapper btn" onClick={()=>{setUser(user)}}  >

                <div  style={{ display: 'flex'}}>
                    <div style={{position:'relative'}} >
                        <img src={img}
                              alt='' style={{ width:"40px", height:"40px", borderRadius:50}}/>
                        <div>{user.isOnline ?
                            <p className="chat-online"></p>
                            :null}
                        </div></div>
                        <div className="users-list-content">
                            <div className="">{user.username}</div>

                            <button className="btn btn-outline-danger"  onClick={()=>{finish(user.ID)}}><AiOutlineStop/></button>

                    </div>


                </div>

            </button>

        </>
    );
};

export default AvailableUsers;