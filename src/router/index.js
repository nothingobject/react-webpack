
import React,{useEffect} from 'react'
import { BrowserRouter, Routes, Route ,useRoutes} from "react-router";
import { useLocation } from "react-router-dom";

import routers from './routerConfig';


function useRecordLastValidPath() {
  const location = useLocation();
  React.useEffect(() => {
    // 只记录有效页面（如不为 404 页）
    if (location.pathname !== "/404") {
      sessionStorage.setItem("lastValidPath", location.pathname);
    }
  }, [location.pathname]);
}

const MainRoute = (props) => {
    useRecordLastValidPath()
    const element = useRoutes(routers);
    return element;
}

export default MainRoute;