import './Admin.css'
import {UsersList} from "./UsersList";
import {AddBusnessCenter} from "./AddBusnessCenter";
import {AddProduct} from "./AddProduct";
import ManageUsers from "../../components/ManageUsers";

export const Admin = () => {
    return (
        <div style={{background:'white', padding:10,marginTop:10}}>
            <div className={'container'}>
                <div className="d-flex gap-5">

                        <AddBusnessCenter/>
                        <div className="border border-1"/>
                        <AddProduct/>

                    <hr/>





                </div>
                <br/>
                <UsersList/>
            </div>
        </div>

    );
};