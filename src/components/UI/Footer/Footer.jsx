import {Link} from "react-router-dom";

export const Footer = () => {
    return (
         <footer>
            <div className="container">
                <div className="footer">
                    <div className="footer-content">
                        <h3>Компания</h3>
                        <ul>
                            <li><Link to={"#"}>Государственным организациям</Link></li>
                            <li><Link to={"#"}>Корпоративным клиентам</Link></li>
                            <li><Link to={"#"}>Инвесторам</Link></li>
                            <li><Link to={"/loginConsult"}>Консультантам</Link></li>
                        </ul>
                    </div>
                    <div className="footer-content">
                        <h3>Клиентам</h3>
                        <ul>
                            <li><Link to={"/profile"}>Личный Кабинет</Link></li>
                            <li><Link to={"#"}>Оплата</Link></li>
                            <li><Link to={"#"}>Доставка</Link></li>
                        </ul>
                    </div>
                    <div className="footer-content">
                        <h3>Помощь </h3>
                        <ul>
                            <li><Link to={"#"}>Как оформить заказ</Link></li>
                            <li><Link to={"#"}>Возврат товара</Link></li>
                            <li><Link to={"#"}>Сервис центры</Link></li>
                        </ul>
                    </div>
                    <div className="footer-content">
                        <h3>Контакты</h3>
                        <ul>
                            <li><img src="../img/footer-contacts/Vector.svg" alt=""/><Link to={"#"}>+ 7 708
                                702 06
                                26 </Link></li>
                            <li><img src="../img/footer-contacts/Vector-1.svg" alt=""/><Link to={"#"}>+ 7 708
                                708 70
                                06</Link></li>
                            <li><img src="../img/footer-contacts/Group.svg" alt=""/><Link to={"#"}>info@ses.kz</Link></li>
                            <li><img src="../img/footer-contacts/geo_ui-earth-west.svg" alt=""/><Link to={"#"}>050000,
                                Казахстан,
                                г. Алматы Манаса 34/1</Link></li>
                        </ul>
                    </div>
                    <div className="footer-content">
                        <h3>Оставайтесь на связи</h3>
                        <div className="social-media">
                            <Link to={"#"} className="footer-soc telegram"></Link>
                            <Link to={"#"} className="footer-soc instagram"></Link>
                            <Link to={"#"} className="footer-soc facebook"></Link>
                            <Link to={"#"} className="footer-soc youtube"></Link>
                            <Link to={"#"} className="footer-soc twitter"></Link>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="footer-footer">
                    <div className="f-f-items"><Link to={"#"}>© 2022 Smart Easy Solution</Link></div>
                    <div className="f-f-items"><Link to={"#"}>Политика конфиденциальности</Link></div>
                    <div className="f-f-items"><Link to={"#"}>Публичная оферта</Link></div>
                    <div className="f-f-items"><Link to={"#"}>Карта сайта</Link></div>
                </div>
            </div>
        </footer>
    )
}