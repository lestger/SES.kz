import React from 'react'
import {Link} from "react-router-dom";

export default function Filter({filter,setFilter}) {

    
  return (
    <div>

        <input type='text' className={'form-control'} style={{ marginLeft: '15%', width: '50%' }}
               onChange={(event) => { setFilter({...filter, input:event.target.value}) }}
               placeholder="Поиск..." />

    </div>
  )
}
