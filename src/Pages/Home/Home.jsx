import main_banner from "../../img/banners/1.png";
import Canon from "../../img/brands/Canon_logo_vector 2.svg";
import microsoft from "../../img/brands/microsoft 1.svg";
import HP from "../../img/brands/600px-HP_New_Logo_2D 1.svg";
import Samsung from "../../img/brands/Sams 1.svg";
import Lenovo from "../../img/brands/Lenovo-logo 1.svg";
import Oppo from "../../img/brands/oppo 1.svg";
import LG from "../../img/brands/1280px-LG_Logo_Slogan_3d 1.svg";
import Epson from "../../img/brands/2560px-Epson_logo 1.svg";
import Huawei from "../../img/brands/png-transparent-logo-huawei-customer-service-centre-华为-huawei-y-6-2018-dual-sim-4g-16gb-blue-hardware-electronic-logo-oppo-emblem-text-logo 1.svg";
import '../../styles/main.css'
import '../../components/UI/Footer/footer.css'
import {Footer} from "../../components/UI/Footer/Footer";
import {ChatWiget} from "../../components/ChatWidget/ChatWiget";
import {AuthContext} from "../../components/context/auth";
import {useContext, useState} from "react";
import {useDocData} from "../../hooks/useDocData";
import {ImStarEmpty} from "react-icons/im";
import {BsStopwatch} from "react-icons/bs";
import {MdPlace, MdProductionQuantityLimits} from "react-icons/md";
import {RiChatSmile3Line} from "@react-icons/all-files/ri/RiChatSmile3Line";
import Modalwindow from "../../components/UI/ModalWindow/Modalwindow";
import {RiBankCard2Line, RiMessage3Line} from "react-icons/ri";
import {auth, db, doc, updateDoc} from "../../API/Firebase";
import SESPRO from '../../img/sesPro.png'
import {TbTruckDelivery} from "react-icons/tb";

export const Home = () => {
    const addSesPro= async()=>{
       await updateDoc(doc(db,'users', auth.currentUser.uid),{sesPro:true});
        window.location.reload();
    }
const user=useContext(AuthContext);
const [currentUser]=useDocData('users');
const [active,setActive]=useState(false)
    return (
        <>
<Modalwindow active={active} setActive={setActive}>
    <h5>Личные Данные</h5>

<div className="bank-card">
   <span> Ф.И.О.</span>
        <input type="text" placeholder={'Иван Иванов'}  className={'form-control my-2'}/>
<span><RiBankCard2Line/>Банковская карта:</span>
    <input type="text" placeholder={'4400 4305 1234 56789'} className={'form-control my-2'}/>
  <span> CVV</span>

    <input type="text" placeholder={'777'} className={'form-control my-2'}/>
   <span> Введите Пароль от аккаунта:</span>
    <input type="password" className={'form-control my-2'}/>
</div>
    <button className={'btn btn-primary p-2 my-2 float-end'} onClick={addSesPro}>Купить</button>
</Modalwindow>
            <section>
                <div className="container">
                    <div className="slider">
                        <img src={main_banner} alt=""/>
                    </div>
                </div>
            </section>


            {/*<br/>*/}
            {/*<section className={'container'}>*/}
            {/*    <div className=" d-flex border border-1 justify-content-center bg-success "><i style={{color:'white',padding:10}}>ses.kz решает бытовые проблемы. От закупки канцелярских принадлежностей до решения проблем с помещением </i></div>*/}
            {/*</section>*/}
            <br/><br/>


            <section id="features" className={'container'}>
                <h1>С помощью нашего продукта вы сможете:</h1>
                {/*<p>We are the leading educational center in Kazakhstan</p>*/}
                <div className="fea-base">
                    <div className="fea-box">
                        <BsStopwatch/>
                        <h2>Арендовать помещение на долгий срок</h2>
                        {/*<p>We will support you in any direction in your search to find yourself!</p>*/}
                    </div>
                    <div className="fea-box">
                        <RiMessage3Line/>
                        <h2>Взять консультацию у лучших специалистов</h2>
                        {/*<p>We will support you in any direction in your search to find yourself!</p>*/}
                    </div>
                    <div className="fea-box">
                        <MdPlace/>
                        <h2>Выбрать Удобное место для своей работы</h2>
                        {/*<p>We will support you in any direction in your search to find yourself!</p>*/}
                    </div>
                    <div className="fea-box">
                        <MdProductionQuantityLimits/>
                        <h2>Покупать качественные и проверенные товары</h2>
                        {/*<p>Наш ассистент выберет для вас самое </p>*/}
                    </div>
                    <div className="fea-box">
                        <ImStarEmpty/>
                        <h2>Организация пространства для вашей работы</h2>
                        {/*<p>Upon completion of the course, you can receive a certificate!</p>*/}
                    </div>
                    <div className="fea-box">
                        <TbTruckDelivery/>
                        <h2>Быстро доставить товары до вашего офиса</h2>
                        {/*<p>Upon completion of the course, you can receive a certificate!</p>*/}
                    </div>
                </div>
            </section>
            <section id={'ses-packs'} className={'container'}>

                <div className="pack-image">
                    <img src={SESPRO} alt=""/>
                </div>
                <div className="pack-content ">
                    <h3 className={'pack-name'}>
                        <b style={{color:'#2B51A1'}}>S</b>
                        <b style={{color:'#FC8507'}}>E</b>
                        <b style={{color:'#2B51A1'}}>S</b>
                        .PRO
                    </h3>
                    <p>Подключая SES.PRO Вы получаете услуги:</p>
                    <h5><RiChatSmile3Line style={{color:'#FC8507'}}/>Онлайн Консультант</h5>
                    <h5>
                        <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"
                              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                              preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                               fill="#2B51A1" stroke="none">
                                <path d="M2162 3819 c-58 -29 -93 -89 -100 -174 l-5 -65 -616 0 c-690 0 -671
2 -821 -72 -119 -58 -231 -170 -288 -289 -43 -88 -72 -188 -72 -251 l0 -38
-52 0 c-87 -1 -171 -53 -197 -123 -7 -18 -11 -154 -11 -373 0 -288 3 -351 15
-382 32 -76 83 -110 179 -119 l64 -6 6 -63 c15 -144 81 -278 191 -389 80 -80
151 -124 257 -163 l73 -27 644 -3 c709 -3 698 -4 774 59 55 46 87 107 98 191
12 83 26 110 72 138 28 18 51 20 187 20 136 0 159 -2 187 -20 46 -28 60 -55
72 -138 11 -84 43 -145 98 -191 76 -63 65 -62 774 -59 l644 3 73 27 c106 38
177 83 257 163 110 111 176 245 191 389 l6 63 64 6 c96 9 147 43 179 119 12
31 15 94 15 382 0 219 -4 355 -11 373 -26 70 -110 122 -196 123 -53 0 -53 0
-53 33 -1 65 -31 173 -72 256 -59 121 -169 231 -288 289 -150 74 -131 72 -821
72 l-616 0 -5 65 c-7 85 -42 145 -101 174 -41 20 -58 21 -398 21 -340 0 -356
-1 -397 -21z m729 -129 c15 -8 19 -22 19 -60 l0 -50 -350 0 -350 0 0 50 c0 36
5 52 18 59 23 14 637 15 663 1z m1410 -264 c183 -39 335 -179 392 -361 22 -69
22 -80 22 -635 0 -555 0 -566 -22 -635 -53 -167 -180 -295 -348 -348 -69 -22
-79 -22 -680 -22 -567 0 -613 1 -638 18 -41 27 -58 60 -67 131 -14 112 -64
186 -163 238 -39 22 -54 23 -237 23 -183 0 -198 -1 -237 -23 -99 -52 -149
-126 -163 -238 -9 -71 -26 -104 -67 -131 -25 -17 -71 -18 -638 -18 -601 0
-611 0 -680 22 -167 53 -296 181 -348 348 -22 69 -22 80 -22 635 0 520 1 570
18 625 30 97 66 156 138 228 73 73 172 128 265 145 29 6 724 10 1729 11 1407
0 1691 -2 1746 -13z m-4041 -996 l0 -350 -39 0 c-76 0 -71 -26 -71 349 0 186
3 341 7 344 3 4 28 7 55 7 l48 0 0 -350z m4708 6 c2 -265 -1 -341 -10 -348 -7
-4 -32 -8 -55 -8 l-43 0 0 351 0 350 53 -3 52 -3 3 -339z"/>
                                <path d="M891 3310 c-152 -23 -260 -102 -325 -240 -30 -63 -31 -70 -34 -228
-4 -184 2 -202 63 -202 64 0 69 12 75 177 5 127 9 155 29 196 45 93 115 140
232 156 46 6 67 14 81 31 23 28 23 62 1 88 -23 26 -54 32 -122 22z"/>
                                <path d="M3282 3147 c-12 -13 -22 -34 -22 -46 0 -29 226 -579 248 -603 20 -24
84 -24 105 0 24 27 247 571 247 603 0 33 -34 69 -66 69 -44 0 -71 -42 -151
-237 -43 -106 -81 -189 -85 -185 -4 4 -43 94 -87 201 -44 106 -88 199 -98 207
-27 21 -67 17 -91 -9z"/>
                                <path d="M3982 3150 c-22 -21 -22 -25 -22 -330 l0 -309 26 -20 c15 -12 34 -21
44 -21 10 0 29 9 44 21 25 20 26 24 26 125 l0 104 30 0 c27 0 37 -11 109 -119
44 -65 87 -121 96 -125 28 -10 52 -7 73 12 42 34 37 60 -27 162 l-60 95 35 29
c102 84 106 239 8 333 -55 53 -91 63 -240 63 -107 0 -123 -2 -142 -20z m285
-152 c31 -29 30 -72 -2 -103 -21 -22 -33 -25 -95 -25 l-70 0 0 75 0 75 72 0
c60 0 76 -4 95 -22z"/>
                                <path d="M550 2510 c-17 -17 -20 -33 -20 -109 0 -85 1 -91 27 -111 32 -25 69
-20 96 12 13 16 17 39 17 104 0 96 -16 124 -70 124 -17 0 -39 -9 -50 -20z"/>
                            </g>
                        </svg>VR View</h5>
                    <div className="my-5 ">
                        <h4 className="my-3"><b>50 000 ₸</b></h4>
                        <button className={'btn btn-outline-primary p-3 '} onClick={()=>{setActive(true)}}>Подключить</button>
                    </div>

                </div>


            </section>
<br/><br/>
            <section>
                <div className="container">
                    <div className="brands">
                        <a rel="noreferrer" target="_blank" href={"https://www.canon.ru/"}>
                            <div className="brand"><img src={Canon} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.microsoft.com/ru-kz"}>
                            <div className="brand"><img src={microsoft} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.hp.com/kz-ru/home.html"}>
                            <div className="brand"><img src={HP} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.samsung.com/kz_ru/"}>
                            <div className="brand"><img src={Samsung} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.lenovo.com/kz/ru/"}>
                            <div className="brand"><img src={Lenovo} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.oppo.com/kz/"}>
                            <div className="brand"><img src={Oppo} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.lg.com/kz"}>
                            <div className="brand"><img src={LG} alt=""/>
                            </div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://epson.kz/"}>
                            <div className="brand"><img src={Epson} alt=""/></div>
                        </a>
                        <a rel="noreferrer" target="_blank" href={"https://www.huawei.com/kz/"}>
                            <div className="brand"><img
                                src={Huawei}
                                alt=""/></div>
                        </a>
                    </div>
                    {user?currentUser.sesPro&&<ChatWiget/>:null}
                </div>
            </section>
            <br/>
            <br/>
<Footer/>

        </>
    )
}