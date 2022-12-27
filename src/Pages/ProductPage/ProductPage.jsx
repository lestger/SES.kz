import {Link, useParams} from "react-router-dom";
import './ProductPage.css'
import AliceCarousel from "react-alice-carousel";
import React, {useEffect, useState} from "react";
import {arrayUnion, getDoc, updateDoc} from "firebase/firestore";
import {auth, db, doc} from "../../API/Firebase";
import {ContentLoader} from "../../components/UI/Loader/ContentLoader";
import {Footer} from "../../components/UI/Footer/Footer";
import {Alert} from "../../components/UI/Alert/Alert";
import Modal from "bootstrap/js/src/modal";
import Modalwindow from "../../components/UI/ModalWindow/Modalwindow";
import {Comments} from "../../components/Comments";

export const ProductPage = () => {
    const params=useParams();
    const [loading,setLoading]=useState(false);
    const [product,setProduct]=useState('');
    const handleDragStart= (e)=>{e.preventDefault()}
    useEffect(()=>{
        async function getData(){setLoading(true);
            await getDoc(doc(db, 'Catalog',params.name,params.name, params.id)).then((docSnap) => {
                    return  docSnap.exists ? setProduct(docSnap.data()): null;
                }
            );setLoading(false);}
        getData();
    },[]);
    const [active,setActive]=useState({show:false,data:''});
    const [modal,setModal]=useState(false);
    const [number,setNumber]=useState('');
   async function addProduct() {
       const arrayRef = doc(db, "users", auth.currentUser.uid);
       await updateDoc(arrayRef, {
           products: arrayUnion({product,number})
       });
       setActive({show: true, data: '  Добавлено в корзину'});

    }

    return (
        <div>

            {loading?<ContentLoader className={'d-flex justify-content-center'}/>: <main className="containers">

                {/*<div className="left-column">*/}
                    <AliceCarousel mouseTracking >
                        {product.product_img?.map((i,index)=><img src={i} key={index}  className={'carousel-items'} onDragStart={handleDragStart} role="presentation" />)}
                    </AliceCarousel>
                {/*</div>*/}

                <div className="right-column">
                    {/* Product Description */}
                    <div className="product-description">
                        {/*<span>Headphones</span>*/}
                        <h4>{product.name}</h4>
                        <p>
                            {product.description}
                        </p>
                    </div>
                    {/* Product Configuration */}
                    <div className="product-configuration">
                        {/* Product Color */}
                        <div className="product-color">
                            <span>Color</span>
                            <div className="color-choose">
                                <div>
                                    <input
                                        data-image="red"
                                        type="radio"
                                        id="red"
                                        name="color"
                                        defaultValue="red"
                                        defaultChecked=""
                                    />
                                    <label htmlFor="red">
                                        <span />
                                    </label>
                                </div>
                                <div>
                                    <input
                                        data-image="blue"
                                        type="radio"
                                        id="blue"
                                        name="color"
                                        defaultValue="blue"
                                    />
                                    <label htmlFor="blue">
                                        <span />
                                    </label>
                                </div>
                                <div>
                                    <input
                                        data-image="black"
                                        type="radio"
                                        id="black"
                                        name="color"
                                        defaultValue="black"
                                    />
                                    <label htmlFor="black">
                                        <span />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Cable Configuration */}

                        <div className="cable-config">
                            <span>Cable configuration</span>
                            <div className="cable-choose">
                                <button className={'btn btn-outline-primary mx-1'}>Straight</button>
                                <button className={'btn btn-outline-danger mx-1'}>Coiled</button>
                                <button className={'btn btn-outline-warning mx-1'}>Long-coiled</button>
                            </div>
                            <br/>
                        </div>
                    </div>
                    {/* Product Pricing */}
                    <div className="product-price">
                        <span>{product.price} KZT</span>

                        <div  className="cart-btn my-2" onClick={()=>{setModal(true)}}>
                            Добавить в корзину
                        </div>
                    </div>

                    <Modalwindow active={modal} setActive={setModal}>
                        <p>Кол-во товаров:</p>
                        <input type="number" className={'form-control'} value={number} onChange={(e)=>{setNumber(e.target.value)}}/><br/>
                        <Alert active={active}/>
                        <button className={'btn btn-primary'} onClick={addProduct}>Добавить в корзину</button>


                    </Modalwindow>

                </div>

            </main>}
<div className="content">
    <h3>Пользыватель </h3>
    <div>
        <h5>Компания: <b>{product.addedBy?.companyName}</b></h5>
        <p>Время добавляения:{new Date(product.addedBy?.createdAt).toLocaleString("ru-US")}</p>
    </div>
    <hr className={'my-5'}/>
    <Comments id={params.id} item={product}/>
</div>
        <Footer/>
        </div>
    )
}