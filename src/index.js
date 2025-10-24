import React from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MainRoute from "./router/index";

import store from '@/store'
import { Provider } from 'react-redux'
import App from '@/pages/home/index'

import "./global.less" // 加载全局less
import "@/utils/errormonitor/index.js"; // 错误sdk


const root = createRoot(document.getElementById("root"));
console.log("当前环境：", process.env.NODE_ENV);

// injectError()

if(root){
    root.render (
            <Provider store={store}>
                <BrowserRouter>
                    <MainRoute />
                </BrowserRouter>
            </Provider>
    );
}




