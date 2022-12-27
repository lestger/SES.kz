import topLocation from "../../../img/icons/top-location.svg";
import telephone from "../../../img/icons/telephone.svg";
import smartphone from "../../../img/icons/smartphone.svg";
import Logo from "../../../img/logo/SES.kz.png";
import fav from "../../../img/icons/heart.svg";
import cart from "../../../img/icons/card.svg";
import login from "../../../img/icons/profile.svg";
import './header.css';
import {Link} from "react-router-dom";
import DropdownMenu from "./Dropdown/DropdownMenu";
import React, {useContext} from "react";
import compare from "../../../img/icons/srav.svg";
import {AuthContext} from "../../context/auth";
import {useDocData} from "../../../hooks/useDocData";
import {BiBuildings} from "react-icons/bi";

export const Navbar = () => {
const user=useContext(AuthContext);
    const [userData,loading]=useDocData("users");
    return (
        <><div className="header">
            <div className="top-panel">
                <div className="container">
                    <div className="top-panel-content">
                        <div className="top-city flex">
                            <img src={topLocation} alt="" className="top-icon"/>
                            <Link to={"#"}>Алматы</Link>
                        </div>
                        <div className="top-links flex">

                        </div>
                        <div className="top-contacts flex">
                            <div className="top-contact">
                                <img src={telephone} alt="" className="top-icon"/>
                                <a href="tel:+77087020626">+7 708 702 06 26</a>
                            </div>
                            <div className="top-contact">
                                <img src={smartphone} alt="" className="top-icon"/>
                                <a href="tel:+77087087006">+7 708 708 70 06</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav">
                <div className="container">
                    <div className="nav-content flex">
                        <div className="nav-logo">
                            <div className="main-logo">
                                <Link to={"/"}>
                                    <img src={Logo} alt=""/>
                                </Link>
                            </div>
                        </div>
                        <div className="nav-search flex">
                            <div className="search">
                            <span><span style={{color: "#4A75CF"}}>S</span>mart <span
                                style={{color: "#FC8507"}}>E</span>asy <span
                                style={{color: "#4A75CF"}}>S</span>olution</span>
                                <span>Умно трать своё <span style={{color: "#F84C3B"}}>время</span></span>
                            </div>
                        </div>


                        <div className={`nav-toolbar  flex `}>
                            <div className="nav-toolbar-box">
                                <Link to={'/products/tech/Компьютеры'}><img src={compare} alt=""/><br/>Продукты</Link>
                            </div>
                            <div className="nav-toolbar-box">
                                <Link to={'/products/premises'}><BiBuildings style={{color:'#c7c7c7',fontSize:25}}/><br/>Помещения</Link>
                            </div>

                            <div className="nav-toolbar-box">
                                <Link to="/cart"><img src={cart} alt=""/><br/>Корзина</Link>

                            </div>

                            <div className="nav-toolbar-box">
                                {user.user?
                                    loading?
                                        <div style={{background:'#B8B8B8',borderRadius:35,width:35,height:35}}/>
                                        : <DropdownMenu userData={userData}/>
                                     : <Link to="/login"><img src={login} alt=""/><br/>Войти</Link>}

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div></>
    )
}