import './loader.css';
import Logo from "../../../img/logo/SES.kz.png";
export const MainLoader = ({style,className}) => {
    return (
        <div style={style} className={className}>
            <div className="loading-border"></div>
            <div className="loading d-flex justify-content-center align-items-center">
                <img src={Logo} alt=""/>
            </div>
        </div>
    )
}