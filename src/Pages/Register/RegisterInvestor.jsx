import {SignContainer} from "../../components/UI/SignContainer";
import {SignForm} from "./SignForm";

export const RegisterInvestor = () => {

    return (
        <>
<SignContainer>
    <div className="sign__form">
    <div className="page__position">
        <ul className="position__list">
            <li className="position__item"><a href="#" className="position__link">Главная</a></li>
            <li className="position__item"><a> > </a></li>
            <li className="position__item"><a href="/profile" className="position__link">Мой кабинет</a></li>
            <li className="position__item"> > </li>
            <li className="position__item"><a className="position__link" href="">Регистрация инвестора</a>
            </li>
        </ul>
    </div>
    <SignForm/>
</div></SignContainer>




        </>
    )
}