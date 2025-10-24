
import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useRoutes } from "react-router";
import { useLocation, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ErrorBoundary from "@/components/Errorhandler/ErrorBoundary";
import { Skeleton, Spin } from 'antd';
import components from './components'; // 动态lazy导入函数
import routers from './baseRouter';
import { login, setmenus , setbuttons ,setasyncfiles} from "@/store/reducers/global";
import { extractMenusAndButtons } from "@/utils/utils"
import { userApi } from "@/services/admin";

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

const MainRoute = () => {
    const location = useLocation();
    const [isLoading, setLoading] = useState(true);
    const [routes, setRoutes] = useState(routers);
    const asyncfiles = useSelector((state) => state.global.asyncfiles);

    // 从后端更新menus
    const fetchMenus = async (dispatch) => {
        if(location.pathname == "/login"){
            setLoading(false) 
            return
        }
        const [err,result] =await userApi.getAllmenu()

        if(err){
            console.log(err,"err")
            setLoading(false) 
        }
        if(result){
            const { treeMenus, buttonList , flatFiles } = extractMenusAndButtons(result.data);
            dispatch(setmenus(treeMenus));
            dispatch(setbuttons(buttonList));
            dispatch(setasyncfiles(flatFiles));
            setLoading(false) 
        }
    };

    const dispatch = useDispatch()

    const routeElement = useRoutes(routes);

    // 动态生成路由配置
    // const generateRoutes = useCallback((menus) => {
    //     return menus.map(({path='',filepath,children}) => {
    //         const route = {
    //             path,
    //             element:filepath?lazyComponent(components[filepath]):React.createElement(),
    //         };
    //         return route;
    //     });
    // }, [menus]);


    useEffect(() => {
        if (asyncfiles.length > 0) {
            // 扁平化菜单
            const asyncrouter = asyncfiles.map((item) => {
                const Comp = components[item.filepath];
                if (!Comp) {
                    // 可以给一个兜底组件或直接跳过
                    console.error(`组件未找到: ${item.filepath}`);
                    return null;
                }
                return {
                    path: item.path,
                    element: lazyComponent(Comp),
                };
            }).filter(Boolean);
            
            const updatedRoutes = [...routers];

            updatedRoutes[0].children = asyncrouter;

            setRoutes(updatedRoutes);
            setLoading(false);
            return
        }


        fetchMenus(dispatch);

    }, [asyncfiles,dispatch]);

    if (isLoading) {
        return <Spin />;
    }

    return routeElement ;
};

export default MainRoute;