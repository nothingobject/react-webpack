
import React from 'react'
import Backend from '@/pages/backend/index'
import Admin from '@/pages/admin/index'
import Home from '@/pages/home/index'
import Login from '../pages/login/index'
import NoFoundPage from '@/pages/notfound/index';

const routers = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/backend",
                element: <Backend />,
            }
        ],

    },
    {
        path: "/login",
        element: <Login />,
    }, {
        path: "*",
        element: <NoFoundPage />,
    }
];

export default routers;
