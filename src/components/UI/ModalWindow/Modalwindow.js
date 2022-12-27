import React from 'react';
import './modal.css'

const Modalwindow = ({active,setActive,children}) => {

    function setter() {
        setActive(false)
    }

    return (
        <div className={active?'modal active':'modal'} onClick={setter} >
<div className={active?'modalContent active':'modalContent'} onClick={(e)=>{e.stopPropagation()}}>
    {children}
</div>
        </div>
    );
};

export default Modalwindow;