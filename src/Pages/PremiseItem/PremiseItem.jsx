import {Link, useParams} from "react-router-dom";
import {useDocData} from "../../hooks/useDocData";
import {ContentLoader} from "../../components/UI/Loader/ContentLoader";
import './premiseItem.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";
import React, {useState} from "react";
import {TiTick} from "react-icons/ti";
import {Error404} from "../Error/Error404";
import {Footer} from "../../components/UI/Footer/Footer";
import {Panorama, Placemark, YMaps} from "@pbe/react-yandex-maps";
import Maps from "../../components/Map/Maps";
import Modalwindow from "../../components/UI/ModalWindow/Modalwindow";
import {Alert} from "../../components/UI/Alert/Alert";
import {auth, db} from "../../API/Firebase";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {Pannellum} from "pannellum-react";
import myImage from "../../img/VRPhoto.jpg";
import {Comments} from '../../components/Comments'
export const PremiseItem = () => {
    const params=useParams();
    const [modalActive,setModalActive]=useState(false);
    const [premise,loading]=useDocData('b_center',params.id);
    const [alert,setAlert]=useState({show:false,data:''});
    const [premiseNumber,setPremiseNumber]=useState('');


    const handleDragStart= (e)=>{e.preventDefault()}
   async function addPremise(){
       const arrayRef = doc(db, "users", auth.currentUser.uid);
       await updateDoc(arrayRef, {
           services: arrayUnion({premise, premiseNumber})
       });
       setAlert({show: true, data: 'Добавлено в корзину'});
    }





    return (
        <>{
            loading?<ContentLoader className={'centering'} />
                :
                premise?<>
                    <Modalwindow active={modalActive} setActive={setModalActive}>
                        <p>Кол-во помещении:</p>
                        <input type="number" className={'form-control'} value={premiseNumber} onChange={(e)=>{setPremiseNumber(e.target.value)}}/><br/>
                        <p>До какого числа:</p>
                        <input type="date" className={'form-control'} value={premiseNumber} onChange={(e)=>{setPremiseNumber(e.target.value)}}/><br/>
                        <Link to={'/products/tech/Компьютеры'} className={'text-muted'}>Также вы можете получить тех. товары</Link><br/><br/>
                        <Alert active={alert}>{alert.data}</Alert>
                        <button className={'btn btn-primary'} onClick={addPremise}>Получить</button>

                    </Modalwindow>
                    <section id="premise" className={'container'}>

                        <div className="overview">
                            <AliceCarousel mouseTracking >
                           {premise.bs_img?.map((i,index)=><img src={i} key={index}  className={'carousel-items'} onDragStart={handleDragStart} role="presentation" />)}
                                       </AliceCarousel>
                            <div className="course-head">
                                <div className="c-name">
                                    <h2>{premise.name}</h2>
                                    <div className="star">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p>
                                        {premise.description}
                                    </p>
                                </div>

                                <hr/>
                                <span>{premise.price} KZT</span>
                            </div>
                            <div>
                                <p><AiOutlineCheckCircle/> Количество Этажей: {premise.floors}</p>
                                <p><AiOutlineCheckCircle/> Количество доступных комнат: {premise.rooms}</p>

                            </div>
                            <hr/>
                            <h3>Пользыватель </h3>
                            <div>
                              <h5>Компания: <b>{premise.addedBy?.companyName}</b></h5>
                                <p>Время добавляения:{new Date(premise.addedBy?.createdAt).toLocaleString("ru-US")}</p>
                            </div>
                            <hr/>
                            <Comments id={params.id} item={premise} />
                        </div>
                        <div className="sidebar">
                            <div className="enroll">
                            <h3>Это здание включает: </h3>
                                {premise.advantages?.map((text)=><p>
                                    <TiTick/> {text}
                                </p>)}



                                <button className={'btn btn-primary'} onClick={()=>{setModalActive(true)}}>Получить Помещение</button>

                        </div>
                            <div className="enroll-map">
                                <h3>Местоположение на карте: </h3>
                                <Maps place={premise.geo} zoom={12} style={{width:500,height:200}}>
                                    <Placemark geometry={premise.geo} properties={{
                                        balloonContent: `<h6><b>${premise.name}</b></h6>`+
                                            `<b>${premise.address}</b>`+
                                            `<p><i>${premise.geo}</i></p>`
                                    }}/>

                                </Maps>

                            </div>
                            <div className="enroll-map my-2">
                                <h3>VR 360 </h3>

                                <YMaps query={{apikey:'3e4df121-c983-41ae-bf69-5f94c39f948d'}} >
                                    <Panorama defaultPoint={premise.geo} style={{width:500,height:400}}/>
                                </YMaps>
                            </div>
                            <div className="enroll-map my-2">



                                <Pannellum
                                    width="500px"
                                    height="300px"
                                    image={myImage}
                                    pitch={20}
                                    yaw={180}
                                    hfov={110}
                                    autoLoad
                                    showZoomCtrl={false}
                                    onLoad={() => {
                                        console.log("panorama loaded");
                                    }}
                                >
                                    <Pannellum.Hotspot
                                        type="custom"
                                        pitch={31}
                                        yaw={150}
                                        handleClick={(evt, name) => console.log(name,evt)}
                                        name="hs1"
                                    />
                                </Pannellum>
                            </div>

                            </div>

                    </section>
                    <Footer/>
                </>:<Error404/>}</>
    )
}