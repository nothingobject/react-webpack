
import React, { lazy, Suspense } from 'react'
import { Skeleton } from 'antd';

// import Backend from '@/pages/backend/index'
// import Admin from '@/pages/admin/index'
// import Home from '@/pages/home/index'
// import Login from '../pages/login/index'

// import Demo from "@/pages/demo/index";

import ErrorBoundary from "@/components/Errorhandler/ErrorBoundary";

const LazyLoad = (component) => {
    return lazy(() => import(`@/pages/${component}/index`));
};

import Home from '@/pages/home/index'
import Login from '../pages/login/index'
import RedirectPage from '@/pages/404/index';
import NoFoundPage from '@/pages/403/index';

const Backend = LazyLoad('backend');
const Admin = LazyLoad('admin');
const Demo = LazyLoad('demo');


// 解决懒加载第一次加载时的闪烁问题
const lazyComponent = (element) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Skeleton active />}>
                {element}
            </Suspense>
        </ErrorBoundary>

    );

}


const routers = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "admin",
                element: lazyComponent(<Admin />),
            },
            {
                path: "backend",
                element: lazyComponent(<Backend />),
            },
            {
                path: "demo",
                element: lazyComponent(<Demo data={null} />),
            }
            
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    // 找不到对应路径时的重定向
    {
        path: "*",
        element: <RedirectPage />,
    },
];

export default routers;
