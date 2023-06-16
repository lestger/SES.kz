import {useState} from "react";
import Filter from "../../components/Filter";
import {usePost} from "../../hooks/useSortedPosts";
import './premises.css'
import {useDocData} from "../../hooks/useDocData";
import {BusnessCentersList} from "../../components/busnessCenterList/BusnessCentersList";
import {Link} from "react-router-dom";
import React from "react";

export const Premises = () => {

    const [products,loader,setProducts]=useDocData('b_center','all');

    const [filter, setFilter]=useState({input:'',sort:'',priceRange:{from:'',to:''},roomQuantity:'',maxFloor:'',address:'',size:''})
    const searchedAndSortedPosts=usePost(products,filter);

    return (  <>
            <section>
                <div className="container">
                    <Filter filter={filter} setFilter={setFilter} setPosts={setProducts}/>
                    <div className={'bc-filter'} >
                        <div className="filter-item">

                            <select  onChange={(event) => { setFilter({...filter, sort:event.target.value}) }} className={'form-select'}>
                                <option value = {''} >Сортировка</option>
                                <option value = {'name'}>по названию</option>
                                <option value = {'price'}>по цене(сначала дешевые)</option>
                                <option value = {'priceUp'}>по цене(сначала дорогие)</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <h6><b>Средняя Цена помещении</b></h6>
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
                            <h6><b>Кол-во Помещении</b></h6>
                            <input type="number" className={'form-control'} placeholder={"50"}
                                   onChange={(e) => { setFilter({...filter, roomQuantity:e.target.value}) }}  />
                        </div>
                        <div className="filter-item">
                            <h6><b>Макс. Кол-во этажей</b></h6>
                            <input type="number" className={'form-control'} placeholder={"9"}
                                   onChange={(e) => { setFilter({...filter, maxFloor:e.target.value}) }} />
                        </div>
                        <div className="filter-item">
                            <h6><b>Адрес</b></h6>

                            <input type="text" className={'form-control'} placeholder={"Ул. Абылай Хана 29"}
                                   onChange={(e) => { setFilter({...filter, address:e.target.value}) }}/>
                            <Link to={'/map'}><span className={'text-muted'} style={{fontSize:15}}>Показать на карте</span></Link>
                        </div>
                        <div className="filter-item">
                            <h6><b>Средний размер помещения (м&sup2;)</b></h6>
                            <input type="number" className={'form-control'} placeholder={"50"}
                                   onChange={(e) => { setFilter({...filter, size:e.target.value}) }}/>
                        </div>
                        {/*<button className={'btn btn-outline-warning'} style={{float:'right'}}>Показать</button>*/}
                    </div>

            </div>
            </section>
            <br/>
            <section className={'bc-container '}><div/>
                <BusnessCentersList posts={searchedAndSortedPosts} loader={loader}/>
            </section>

            </>
    )
}