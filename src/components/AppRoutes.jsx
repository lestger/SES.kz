import {privateRoutes, publicRoutes} from "../routes/routes";
import {useContext} from "react";
import {AuthContext} from "./context/auth";
import {useDocData} from "../hooks/useDocData";
import {Route,Routes} from "react-router-dom";
import {Home} from "../Pages/Home/Home";
import {Admin} from "../Pages/admin/Admin";


export const AppRoutes = () => {
    const userIsLogin=useContext(AuthContext);
    const [curUserData,loading]=useDocData("users");
    return (
        <Routes>
            {userIsLogin?
                privateRoutes.map((route,index)=> <Route path={route.path} exact={route.exact} element={route.component} key={index}/>)
                :null}
            {publicRoutes.map((route, index) => <Route path={route.path} exact={route.exact} element={route.component}
                                                       key={index}/>)}
            <Route path={'/admin'} element={curUserData.admin? <Admin/>:<Home/>} />

            <Route path={'/'}  element={<Home/>}/>
        </Routes>
    )
}