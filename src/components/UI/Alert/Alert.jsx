import {AiOutlineCheckCircle} from "react-icons/ai";
import React, {useState} from "react";

export const Alert = ({active}) => {

    return (
        <>{active.data&&<div className="transition alert alert-success d-flex justify-content-center "><AiOutlineCheckCircle style={{fontSize:25}}/>{active.data}</div>}</>
    )
}