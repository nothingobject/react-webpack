
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

// import Home from '@/pages/home/index'

import BasicLayout from '@/layouts/BasicLayout'
import Login from '../pages/login/index'
import RedirectPage from '@/pages/404/index';
import NoFoundPage from '@/pages/403/index';
import NoMatch from '@/pages/nomatch/index';

const Backend = LazyLoad('backend');

console.log(LazyLoad('backend'),"LazyLoad('backend')")
console.log(<Backend/>,"LazyLoad('backend')")

const Admin = LazyLoad('admin');
const Demo = LazyLoad('demo');
const Home = LazyLoad('home');
const List = LazyLoad('admin/list');
const Detail = LazyLoad("admin/detail");


// 解决懒加载第一次加载时的闪烁问题
const lazyComponent = (Component) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Skeleton active />}>
                <Component/>
            </Suspense>
        </ErrorBoundary>

    );
}


const routers = [
    {
        path: "/",
        element: <BasicLayout />,
        children: [
            {
                path: "/",
                element: lazyComponent(LazyLoad('home')),
            },
            // {
            //     path: "",
            //     element: <></>,
            //     children: [
            //         {
            //             path: "admin/list",
            //             element: lazyComponent(<List />),
            //         },
            //         {
            //             path: "admin/detail",
            //             element: lazyComponent(<Detail />),
            //         }
            //     ]
            // },
            // {
            //     path: "admin/list",
            //     element: lazyComponent(<List />),
            // },
            // {
            //     path: "admin/detail",
            //     element: lazyComponent(<Detail />),
            // },
            // {
            //     path: "403",
            //     element: lazyComponent(<NoFoundPage />),
            // },
            // {
            //     path: "backend",
            //     element: lazyComponent(<Backend />),
            // },
            // {
            //     path: "demo",
            //     element: lazyComponent(<Demo data={null} />),
            // }
            
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    // 找不到对应路径时的重定向
    {
        path: "*",
        element: <NoMatch />,
        handle: {
            crumb: () => "404"
        }
    }
];

export default routers;
