import {Link} from "react-router-dom";
import './error.css'
export const Error404 = () => {
    return (
        <div className={'centering box'}>
            <div className="box__ghost">
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>

                <div className="box__ghost-container">
                    <div className="box__ghost-eyes">
                        <div className="box__eye-left"></div>
                        <div className="box__eye-right"></div>
                    </div>
                    <div className="box__ghost-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="box__ghost-shadow"></div>
            </div>

            <div className="box__description">
                <div className="box__description-container">
                    <div className="box__description-title">Упс!</div>
                    <div className="box__description-text">Такой Страницы не существует(</div>
                </div>
<br/>
                <Link to={'/products/premises'} className="btn btn-primary">Назад</Link>

            </div>


        </div>
    )
}