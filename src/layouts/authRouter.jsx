import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import {checkPermission} from '@/utils/checkPermission';


/**
 * 路由守卫组件
 * @param {*} props 
 * @returns 
 */
const AuthRouter = (props) => {
  const { children } = props;
  const location = useLocation();
  const currentUser = useSelector((state) => state.global.userInfo);
  
  // 白名单路由
  const whiteList = ['/login', '/register', '/404', '/403'];
  
  // 判断是否需要鉴权
  if (whiteList.includes(location.pathname)) {
    return children;
  }
  // 判断是否登录
  if (!currentUser || !currentUser.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // 判断是否有权限访问该路由
  const menus = useSelector((state) => state.global.menus);
  const hasPermission = checkPermission(location.pathname, menus);
  
  if (!hasPermission) {
    return <Navigate to="/403" replace />;
  }
  return children;
};
export default AuthRouter;