import {Link} from "react-router-dom";
import {Card} from "../../components/UI/Card/Card";
import './favorites.css';
import {FiTrash2} from "react-icons/fi";
import {AiOutlineMinusCircle} from "react-icons/ai";

export const Favorites = () => {
    return (

            <div className={'container'}>
                <div className="sign__title">
                    Избранное
                </div>
                <div className="page__position">
                    <ul className="position__list">
                        <li className="position__item"><Link to="/" className="position__link">Главная</Link></li>
                        <li className="position__item">></li>
                        <li className="position__item"><Link to="/profile" className="position__link">Мой кабинет</Link></li>
                        <li className="position__item">></li>
                        <li className="position__item"><Link to="/favorites" className="position__link">Избранное</Link></li>
                    </ul>
                </div>
                <div className="sign-form">

                    <div className="fav_container">

                        <Card className="fav_card"><img src="https://via.placeholder.com/150" alt=""/>
                            <div className="info_block">
                                <span><AiOutlineMinusCircle style={{float:'right', fontSize:20}}/></span>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum ea eaque, earum </h5>
                                <div className={'card_btns'}>
                                    <b>4561₸</b>
                                </div>
                            </div></Card>
                        <Card className="fav_card"><img src="https://via.placeholder.com/150" alt=""/>
                            <div className="info_block">
                                <span><AiOutlineMinusCircle style={{float:'right', fontSize:20}}/></span>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum ea eaque, earum </h5>
                                <div className={'card_btns'}>
                                    <b>4561₸</b>
                                </div>
                            </div></Card>
                        <Card className="fav_card"><img src="https://via.placeholder.com/150" alt=""/>
                            <div className="info_block">
                                <span><AiOutlineMinusCircle style={{float:'right', fontSize:20}}/></span>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum ea eaque, earum </h5>
                                <div className={'card_btns'}>
                                    <b>4561₸</b>
                                </div>
                            </div></Card>

                    </div>



                </div>
            </div>

    )
}