
import React from 'react'
import { BrowserRouter, Routes, Route ,useRoutes} from "react-router";

// import Login from '../pages/login/index'
// import Backend from '../pages/backend/index'
// import Admin from '../pages/admin/index'
// import Home from '../pages/home/index'
// import NoFoundPage from '../pages/notfound/index';
import routers from './routerConfig';

// const MainRoute = (props) =>{

//     console.log("routers", JSON.stringify(routers));

//     return (
//         <Routes>
//             <Route path="/" element={<Home />}>
//                 <Route path="/backend" element={<Backend/>}/>
//                 <Route path="/admin" element={<Admin/>}/>
//             </Route>
//             <Route path="/login" element={<Login/>}/>
//             <Route path="*" element={<NoFoundPage/>}/>
            
//         </Routes>
    
//     )        
// }
const MainRoute = (props) => {
    const element = useRoutes(routers);
    return element;
}

export default MainRoute;