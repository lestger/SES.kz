import {AddBusnessCenter} from "./admin/AddBusnessCenter";
import {AddProduct} from "./admin/AddProduct";

export const AddProductProf = () => {
    return (
        <><div className="container">
            <div className="d-flex gap-5">

                <AddBusnessCenter/>
                <div className="border border-1"/>
                <AddProduct/>

                <hr/>





            </div>
        </div></>
    )
}