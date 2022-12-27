import {Link} from "react-router-dom";

export const SignContainer = ({children,selected}) => {
    return (

            <section>
                <div className="container">
                    <div className="sign__container">
                        <div className="sign__nav">
                            <div className="sign__nav-item"><Link to="/profile" className="sign__nav-link">Личный кабинет</Link>
                            </div>
                            <div className="sign__nav-item"><Link to="" className="sign__nav-link">Изменить пароль</Link></div>
                            <div className="sign__nav-item"><Link to="/favorites" className="sign__nav-link">Избранное</Link></div>
                            <div className="sign__nav-item"><Link to="" className="sign__nav-link">История заказов</Link></div>
                            <div className="sign__nav-item"><Link to="" className="sign__nav-link">Документы</Link></div>
                            <div className="sign__nav-item"><Link to="" className="sign__nav-link">Помощь</Link></div>

                        </div>
                        {children}
                    </div>
                </div>
            </section>

    )
}