import React, {useRef} from 'react';
import './style.css'
import {useDetectOutsideClick} from "../../../../hooks/useDetectOutsudeClick";
import {Link, useNavigate} from "react-router-dom";
import {MdMeetingRoom, MdOutlineAdminPanelSettings} from "react-icons/md";
import login from "../../../../img/icons/profile.svg";
import {FaRegUser} from "react-icons/fa";
import {getAuth, signOut} from "../../../../API/Firebase";
import {BsChatText} from "react-icons/bs";


const DropdownMenu = ({userData}) => {
    const navigate=useNavigate();
    const el=useRef(null);

    const [active, setActive] =useDetectOutsideClick(el,false);

const LogOut = () => {
  signOut(getAuth()).then(navigate('/'));
}
    return (
        <div ref={el} >
            <button className={`user-button `} onClick={()=>{setActive(!active)}}>
                <img src={login} alt=""/><br/>{userData.username}
            </button>

            <div className={`menu ${active?'active':'inactive'}`}>
                {userData.admin?
                    <li className="menu-item">
                    <Link to={'/admin'}><button className="btn py-1"><MdOutlineAdminPanelSettings/><span>Админ</span></button></Link>
                </li>:null}
                <li className="menu-item">
                    <Link to={'/profile'}><button className="btn  py-1"><FaRegUser/><span>Кабинет</span></button></Link>
                </li>
                {userData.isConsult&&
                    <li className="menu-item">
                    <Link to={'/consultPage'}><button className="btn  py-1"><BsChatText/><span>Чат</span></button></Link>
                </li>}
                <li className="menu-item">
                    <button className="btn py-1" onClick={()=>{LogOut()}}><MdMeetingRoom/><span>Выйти</span></button>
                </li>

            </div>
        </div>
    );
};

export default DropdownMenu;