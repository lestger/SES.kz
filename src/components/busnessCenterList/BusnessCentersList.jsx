import {ContentLoader} from "../UI/Loader/ContentLoader";
import {useNavigate} from "react-router-dom";

export const BusnessCentersList = ({posts,loader}) => {
    const navigate=useNavigate();
    return (
        <>
             <div className="">
            <div className="bc__list">
                {loader?
                    <ContentLoader className={'d-flex justify-content-center align-items-center'} style={{width : "60vw"}}/>
                    :
                    posts.length!==0?
                        posts.map((business_center)=>

                               <div className="bc__item" key={business_center.id} onClick={()=>{navigate(`/products/premises/${business_center.id}`)}}>
                                   <div className="bc__img">
                                       <img style={{width: "350px", height: "263px"}} src={business_center.bs_img[0]} alt=""/>
                                   </div>
                                   <div className="bc__info-block">
                                       <div className="bc__title">{business_center.name}</div>
                                       <div className="bc__info">
                                           <div className="info__item adres">
                                               Адрес: <span>{business_center.address}</span>
                                           </div>
                                           <div className="info__item site">
                                               Сайт: <span><a href="#">{business_center.name}</a></span>
                                           </div>
                                           <div className="info__item time">
                                               Время работы: <span>пн - пт 08:00 до 17:00, обед c 12:00 до 13:00</span>
                                           </div>
                                           <div className="info__item map">
                                               2GIS: <span><a href={`https://2gis.kz/almaty/search/${business_center.geo[0]},${business_center.geo[1]}`}>{business_center.name}</a></span>
                                           </div>
                                       </div>
                                       <div className="bc__office-list">
                                           <a href={`/products/premises/${business_center.id}`}>Показать
                                               свободные офисы</a>
                                       </div>
                                   </div>
                               </div>

                        ):<h2>Не найдено!</h2>}

            </div>
        </div>
        </>
    )
}