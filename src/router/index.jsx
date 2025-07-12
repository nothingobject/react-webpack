
import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useRoutes } from "react-router";
import { useLocation, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ErrorBoundary from "@/components/Errorhandler/ErrorBoundary";
import { Skeleton, Spin } from 'antd';
import components from './components'; // 动态lazy导入函数
// import routers from './staticRouter.js';//纯静态路由配置，方便调试判断错误
import routers from './baseRouter';
import { getAdminMenus } from "@/services/index";
import RedirectPage from '@/pages/404/index';
import { login, setmenus } from "@/store/reducers/global";
import { flattenMenus } from "@/utils/utils"

// 解决懒加载第一次加载时的闪烁问题
const lazyComponent = (Component) => {

    return (
        <ErrorBoundary>
            <Suspense fallback={<Skeleton active />}>
                <Component />
            </Suspense>
        </ErrorBoundary>

    );
}


// 从后端更新menus
const fetchMenus = (dispatch) => {

    // 获取菜单
    getAdminMenus().then((list) => {
        dispatch(setmenus(list));
    });
};


const MainRoute = () => {
    const [isLoading, setLoading] = useState(true);
    const [routes, setRoutes] = useState(routers);
    const menus = useSelector((state) => state.global.menus);

    const dispatch = useDispatch()

    const routeElement = useRoutes(routes);

    // 动态生成路由配置
    const generateRoutes = useCallback((menus) => {
        return menus.map(({path='',filepath,children}) => {
            const route = {
                path,
                element:filepath?lazyComponent(components[filepath]):React.createElement(),
            };
            return route;
        });
    }, [menus]);


    useEffect(() => {
        if (menus.length > 0) {
            // 扁平化菜单
            const asyncrouter = generateRoutes(flattenMenus(menus))
            
            const updatedRoutes = [...routers];

            updatedRoutes[0].children = asyncrouter;

            setRoutes(updatedRoutes);
            setLoading(false);
            return
        }
        fetchMenus(dispatch);
    }, [menus,generateRoutes,dispatch]);

    if (isLoading) {
        return <Spin />;
    }

    return  routeElement ;
};

export default MainRoute;