import {useEffect, useState} from "react";
import Filter from "../../components/Filter";
import {usePost} from "../../components/useSortedPosts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDocData} from "../../hooks/useDocData";
import {db, getDocs} from "../../API/Firebase";
import {collection} from "firebase/firestore";
import React from "react";
import {ContentLoader} from "../../components/UI/Loader/ContentLoader";

export const Tech = () => {
    const navigate=useNavigate();
    const params=useParams();
    const [products,setProducts]=useState([]);
    const [load,setLoad]=useState(false);
    useEffect(()=>{
        async function getData() {
        setLoad(true)
        const dataColl = await getDocs(collection(db, "Catalog", params.name, params.name));
        setProducts(dataColl.docs.map((p) => ({...p.data(), id: p.id})));
setLoad(false)
    } getData();},[])
    const [catalog]=useDocData('Catalog','all');
    const [filter, setFilter]=useState({input:'',sort:'',priceRange:{from:'',to:''}})
    const searchedAndSortedPosts=usePost(products,filter);
    return (
        <>

            <nav className="container p-3 navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Каталог:
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {catalog.map((c)=> <li className="nav-item active"><Link className="nav-link" to={`/products/tech/${c.name}`}>{c.name}</Link></li>)}
                    </ul>
                    <form >
                        <Filter filter={filter} setFilter={setFilter} setPosts={setProducts}/>

                    </form>
                </div>
            </nav>

            <br/>
            <section>
                <div className="container">
                    <div className="office__list">
                        {load?<ContentLoader className={'d-flex justify-content-center'}/>:<> <section>
                            <div className="">

                                {params.name==='Компьютеры'?
                                    <div className={'product-filter'} >
                                        <div className="filter-item">

                                            <select  onChange={(event) => { setFilter({...filter, sort:event.target.value}) }} className={'form-select'}>
                                                <option value = {''} >Сортировка</option>
                                                <option value = {'name'}>по названию</option>
                                                <option value = {'price'}>по цене(сначала дешевые)</option>
                                                <option value = {'priceUp'}>по цене(сначала дорогие)</option>
                                            </select>
                                        </div>
                                        <div className="filter-item">
                                            <h6><b>Цена</b></h6>
                                            <label htmlFor="customRange" className="price-input">
                                                <input type="number" placeholder={"От"} className={'form-control'}
                                                       onChange={(e) => { setFilter({...filter, priceRange: {
                                                               from:e.target.value,
                                                               to:filter.priceRange.to
                                                           }}) }}/>-
                                                <input type="number" placeholder={"До"} className={'form-control'}
                                                       onChange={(e) => { setFilter({...filter, priceRange: {
                                                               from:filter.priceRange.from,
                                                               to:e.target.value
                                                           }}) }}/>
                                            </label>
                                        </div>
                                        <div className="filter-item">
                                            <h6><b>Тип</b></h6>
                                            <select className={'form-select'}>
                                                <option value = {'name'}>Игровые</option>
                                                <option value = {'price'}>Бюджетные</option>
                                                <option value = {'priceUp'}>Ультрабуки</option>
                                            </select>
                                        </div>
                                        <div className="filter-item">
                                            <h6><b>Разрешение</b></h6>
                                            <label htmlFor="range" className="price-input">
                                                <input type="number" placeholder={"1920"} className={'form-control'}/>x
                                                <input type="number" placeholder={"1080"} className={'form-control'}/>
                                            </label>

                                        </div>
                                        <div className="filter-item">
                                            <h6><b>Процессор</b></h6>
                                            <select  onChange={(event) => { setFilter({...filter, sort:event.target.value}) }} className={'form-select'}>
                                                <option value = {''} >Intel</option>
                                                <option value = {'name'}>AMD</option>
                                                <option value = {'price'}>по цене(сначала дешевые)</option>
                                                <option value = {'priceUp'}>по цене(сначала дорогие)</option>
                                            </select>
                                        </div>
                                        <div className="filter-item">
                                            <h6><b>Видеокарта</b></h6>
                                            <select  onChange={(event) => { setFilter({...filter, sort:event.target.value}) }} className={'form-select'}>
                                                <option value = {'name'}>AMD</option>
                                                <option value = {''} >NVidia</option>

                                                <option value = {'price'}>Intel</option>
                                                <option value = {'priceUp'}>Apple</option>
                                            </select>

                                        </div>
                                        {/*<button className={'btn btn-outline-warning'} style={{float:'right'}}>Показать</button>*/}
                                    </div>:null}
                            </div>
                        </section>{searchedAndSortedPosts.map((office) =>
                            <div className="office__item" onClick={() => {
                                navigate(`/products/tech/${params.name}/${office.id}`)
                            }}>
                                <div className="office__img">
                                    <img style={{width: "300px", height: "177px"}} src={office.product_img[0]} alt=""/>
                                </div>
                                <div className="office__info">
                                    <h5 className="office__cab"><b>{office.name}</b></h5>
                                    <div className="office__price"><b>{office.price}</b> тг</div>
                                    <div className="office__choose">
                                        <form>
                                            <input type="text" name="office_id" value="{{ office.id }}" hidden/>
                                            <button type='submit' className="btn btn-primary">Выбрать</button>
                                        </form>
                                    </div>
                                </div>
                            </div>)}</>
                        }


                    </div>
                </div>
            </section></>
    )
}