
import React from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import Login from '../pages/login/index'
import RedirectPage from '@/pages/404/index';
import NoFoundPage from '@/pages/403/index';
import NoMatch from '@/pages/nomatch/index';
import ErrorBoundary from "@/components/Errorhandler/ErrorBoundary";



const routers = [
    {
        path: "/",
        element: <ErrorBoundary>
            <BasicLayout />
        </ErrorBoundary>,
        children: [],
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
    },
];

export default routers;
