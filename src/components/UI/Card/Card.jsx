import './card.css';
export const Card = ({children,style,className, onClick}) => {
    return (
        <div className={`${className} card `} style={style} onClick={onClick}>{children}</div>
    )
}
//