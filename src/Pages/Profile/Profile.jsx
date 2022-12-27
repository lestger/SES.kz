import {SignContainer} from "../../components/UI/SignContainer";
import {Link} from "react-router-dom";
import {FaUserSecret} from "react-icons/fa";
import {Card} from "../../components/UI/Card/Card";
import {
    AiOutlineFileAdd,
    AiOutlineFileSearch,
    AiOutlineHeart,
    AiOutlineHome,
    AiOutlineQuestionCircle
} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {TiDocumentText} from "react-icons/ti";
import {useState} from "react";
import Modalwindow from "../../components/UI/ModalWindow/Modalwindow";
import {useDocData} from "../../hooks/useDocData";




export const Profile = () => {
    const [active,setActive]=useState(false);
    const [pass,setPass]=useState(false);

    const [text,setText]=useState('');

    const [user]=useDocData('users')
    return (
        <>
            <Modalwindow active={active} setActive={setActive}>
                <h5>Name: {user.username}</h5>
                <h6><i>Email: {user.email}</i></h6>
            </Modalwindow>

            <Modalwindow active={pass} setActive={setPass}>
                <div>
                    Старый Пароль:
                    <input type="text" className={'form-control'}/>
                </div>
                <div>
                    Новый Пароль:
                    <input type="text" className={'form-control'}/>
                </div>
                <button className={'btn btn-primary my-2'}>Применить</button>
            </Modalwindow>
            <SignContainer>
                <div className="sign__form">
                    <div className="page__position">
                        <ul className="position__list">
                            <li className="position__item"><Link to="/" className="position__link">Главная</Link></li>
                            <li className="position__item">></li>
                            <li className="position__item"><Link to="/profile" className="position__link">Мой кабинет</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sign-form">
                        <div className="sign__title">
                            Личный кабинет
                        </div>
                        <div className="d-flex gap-2 m-3">
                            <Card onClick={()=>{setActive(true)}}><FaUserSecret/>Личные Данные</Card>
                            <Card onClick={()=>{setPass(true)}}><RiLockPasswordLine/>Изменить Пароль</Card>
                            {/*<Link to={'/AddProduct'}><Card><AiOutlineFileAdd />Добавить Продукт</Card></Link>*/}
                            <Link to={'/favorites'}><Card><AiOutlineHeart style={{width:80,height:80}}/>Избранное</Card></Link>
                            <Link to={'/history'}> <Card><AiOutlineFileSearch />История Заказов</Card></Link>
                            <Card><TiDocumentText style={{width:80,height:80}}/>Документы</Card>
                            <Card><AiOutlineQuestionCircle/>Помощь</Card>


                        </div>
                    </div>
                </div>
            </SignContainer>
        </>
    )
}