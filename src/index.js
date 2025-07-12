import React,{Suspense} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MainRoute from "./router/index";
import { ErrorProvider } from "@/components/Errorhandler/ErrorContext";

import store from '@/store'
import { Provider } from 'react-redux'

import "./global.less"

const root = createRoot(document.getElementById("root"));
console.log("当前环境：", process.env.NODE_ENV);


if(root){
    root.render (
        <ErrorProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <MainRoute />
                </BrowserRouter>
            </Provider>
            
        </ErrorProvider>
    );
}




