import './loader.css'
export const ContentLoader = ({style,className}) => {
    return (
        <div className={className} style={style}>
        <div className={'content-loader'}/>
        </div>
    )
}