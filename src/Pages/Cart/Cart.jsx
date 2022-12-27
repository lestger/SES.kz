import {tableToExcel} from "./toExcel";
import {useDocData} from "../../hooks/useDocData";
import {Link} from "react-router-dom";
import {AiOutlineMinusCircle} from "react-icons/ai";
import './cart.css'
import {auth, db, doc} from "../../API/Firebase";
import {updateDoc,arrayRemove} from "firebase/firestore";
import Modalwindow from "../../components/UI/ModalWindow/Modalwindow";
import {useState} from "react";
import {RiBankCard2Line} from "react-icons/ri";
export const Cart = () => {
    const [user,loading,setUser]=useDocData('users');
    let totalPremise=0;
    let totalProduct=0;
if(!loading){
    user.products?.forEach((p)=>{totalProduct=totalProduct+(p.product.price*p.number)});
    user.services?.forEach((s)=>{totalPremise=totalPremise+(s.premise.price*s.premiseNumber)});
}
async function deleteProduct(product){
    const arrayRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(arrayRef, {
        products: arrayRemove(product)
    });
    window.location.reload();
    // setUser(user);
}
    async function deleteService(service){
        const arrayRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(arrayRef, {
            services: arrayRemove(service)
        });
        window.location.reload();
        // setUser({...user, services: []})
    }
const [active,setActive]=useState(false);
let usersLocal=[];
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
                <button className={'btn btn-primary p-2 my-2 float-end'} onClick={()=>{localStorage.setItem('items',JSON.stringify({total:totalProduct+totalPremise,createdAt:Date.now()}))}}>Купить</button>
            </Modalwindow>
            <section>
                <div className="container">
                    <div className="order__cart">
                        <div className="order__top">
                            <div className="order__cart-total">
                                <b>Итого:</b> <span>{(user.services?.length||0)+(user.products?.length||0)}</span> товара на сумму
                            </div>
                            <div className="order__cart-total-sum">

                                <span>{totalProduct+totalPremise} </span>₸
                            </div>
                        </div>
                        <div className="order__btn">

                            <button type="submit" className="btn btn-primary"
                            onClick={()=>{setActive(true)}}


                                >Оформить заказ

                                </button>
                            <br/>

                            <span className={'text-muted'} style={{fontSize:15,cursor:'pointer'}} onClick={()=>{tableToExcel('table','fsda','1')}} >Вывести в Excel</span>
                        </div>
                    </div>

                    <div className="cart__container" >

                        <div className="page__position">
                            <ul className="position__list">
                                <li className="position__item">
                                    <a href="/" className="position__link">Главная</a></li>
                                <li className="position__item"><a> > </a></li>
                                <li className="position__item"><a href="#" className="position__link">Оформление
                                    заказов</a></li>
                            </ul>
                        </div>
                        <div className="page__title">Оформление заказов</div>
                        <div className="cart__block"  id={'table'}>
                            <div className="cart__title">
                                Товары в заказе
                            </div>
                            <div className="cart__list">
                                {/*{% for office in offices %}*/}
                                {loading?null:user.services?.map((service)=>{

                                    return(<div className="cart__item">
                                        <div className="cart__img"><img src={service.premise.bs_img[0]}
                                                                        alt=""/>
                                        </div>
                                        <div className="cart__info-item">
                                            <div className="info-item__name">
                                                <span>{service.premise.name}</span>
                                            </div>
                                            <div className="bc__location">
                                                <a href={`https://2gis.kz/almaty/search/${service.premise.geo[0]},${service.premise.geo[1]}`}>2GIS</a>
                                            </div>
                                            <div className="bc__contract">
                                                <p>Количество Помещении: {service.premiseNumber}</p>
                                                <p>Цена за помещение: <b>{service.premise.price}</b></p>
                                            </div>

                                            {/*<div className="bc__contract">*/}
                                            {/*    <a href="#">Договор аренды</a>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="cart__item-sum">

                                        </div>
                                        <div className="cart__sale-info">
                                            <div className="item__shop-info">
                                                <span className={'delete-button'}><AiOutlineMinusCircle onClick={() => {deleteService(service)}} style={{float:'right', fontSize:20,margin:'0 10px'}}/></span>
                                                <span>{service.premiseNumber*service.premise.price}</span>₸
                                            </div>
                                        </div>
                                    </div>)}
                                    )}

                                {loading?null:user.products?.map((product)=>
                                    <div className="cart__item">
                                    <div className="cart__img"><img src={product.product.product_img} alt=""/></div>
                                    <div className="cart__info-item">
                                        <div className="info-item__name">
                                            {product.product.name}
                                        </div>
                                        <div className="bc__contract">
                                            <p>Количество: <b>{product.number}</b></p>
                                            <p>Цена за товар: <b>{product.product.price}</b></p>
                                        </div>
                                        <div className="bc__contract">
                                            <a href="#">Гарантийный талон</a>
                                        </div>

                                        <div className="bc__choose">
                                            <Link to={"/products/tech/Компьютеры"}>Выбрать другое обрудование</Link>
                                        </div>
                                    </div>
                                    <div className="cart__item-sum">

                                    </div>
                                    <div className="cart__sale-info">
                                        <div className="item__shop-info">
                                            <span className={'delete-button'} onClick={()=>{deleteProduct(product)}}><AiOutlineMinusCircle style={{float:'right', fontSize:20,margin:'0 10px'}}/></span>
                                            <span>{product.product.price*product.number}</span>₸
                                        </div>
                                    </div>
                                </div>)

                                }



                            </div>
                        </div>
                    </div>

                </div>
            </section></>
    )
}