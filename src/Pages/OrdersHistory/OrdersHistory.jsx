import './ordersHistory.css'
import 'react-alice-carousel/lib/alice-carousel.css';
import {SignContainer} from "../../components/UI/SignContainer";
import {Link} from "react-router-dom";
import {FcDocument} from "react-icons/fc";
import {useMemo} from "react";

export const OrdersHistory = () => {
    let item={};
    useMemo(()=>{item=JSON.parse(localStorage.getItem('items'));console.log(localStorage.getItem('items'))},[])

    return (
<><div className="container">
    <SignContainer>
        <div className="sign__form">
            <div className="page__position">
                <ul className="position__list">
                    <li className="position__item"><Link to="/" className="position__link">Главная</Link></li>
                    <li className="position__item">></li>
                    <li className="position__item">
                        <Link to="/history" className="position__link">
                        История Заказов
                    </Link>
                    </li>
                </ul>
            </div>
            <div className="sign-form">
                <div className="sign__title">
                    История Заказов
                </div>
                <table className="table table-bordered  my-2">
                    <thead>
                    <tr >
                        <th scope="col">Заказ №</th>
                        <th scope="col">Дата добавелния</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Сумма заказа</th>
                        <th scope="col">Действия</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>{new Date(item?.createdAt).toLocaleString("ru-US")} </td>
                        <td>Ожидание доставки</td>
                        <td>{item?.total} ₸</td>
                        <td><a href={'https://firebasestorage.googleapis.com/v0/b/ses-kz.appspot.com/o/Чек.docx?alt=media&token=8d748c2d-1fb6-4b9a-b1c1-0bb8886adb8c'}><FcDocument style={{fontSize:'20px'}}/><span className={'mx-2'}>Просмотр чека</span></a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </SignContainer>
</div></>

)
}