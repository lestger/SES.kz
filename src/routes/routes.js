import {Profile} from "../Pages/Profile/Profile";
import {OrdersHistory} from "../Pages/OrdersHistory/OrdersHistory";
import {Favorites} from "../Pages/Favorites/Favorites";
import {Cart} from "../Pages/Cart/Cart";
import {Login} from "../Pages/Login/Login";
import {RegisterCompany} from "../Pages/Register/RegisterCompany";
import {RegisterInvestor} from "../Pages/Register/RegisterInvestor";
import {ProductPage} from "../Pages/ProductPage/ProductPage";
import {Tech} from "../Pages/Tech/Tech";
import {Premises} from "../Pages/Premises/Premises";
import {SearchOnMap} from "../Pages/SearchOnMap";
import {PremiseItem} from "../Pages/PremiseItem/PremiseItem";
import {AddProduct} from "../Pages/admin/AddProduct";
import {AddProductProf} from "../Pages/AddProductProf";
import {ConsultPage} from "../Pages/ConsultPage/ConsultPage";

export  const privateRoutes=[
    {path:'/profile',component:<Profile/>,exact:false},
    {path:'/history',component:<OrdersHistory/>,exact:false},
    {path:'/favorites',component:<Favorites/>,exact:false},
    {path: '/AddProduct',component: <AddProductProf/>,exact: false},
    {path: '/consultPage',component: <ConsultPage/>,exact: false},

]
export  const publicRoutes=[
    {path:'/login',component:<Login/>,exact:false},
    {path:'/registration/company',component:<RegisterCompany/>,exact:true},
    {path:'/registration/investor',component:<RegisterInvestor/>, exact:true},
    {path:'/products/tech/:name/:id',component:<ProductPage/>, exact:true},
    {path:'/products/tech/:name',component:<Tech/>, exact:true},
    {path:'/products/tech',component:<Tech/>, exact:true},
    {path:'/map',component:<SearchOnMap/>, exact:false},
    {path:'/products/premises',component:<Premises/>, exact:true},
    {path:'/products/premises/:id',component:<PremiseItem/>, exact:true},
    {path:'/cart',component:<Cart/>, exact:false}

]

    // <Route path={'/admin'} element={<Admin/>}/>