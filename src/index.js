import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MainRoute from "./router/index";

import "./global.less"

const root = createRoot(document.getElementById("root"));

root.render (
    <HashRouter>
        <MainRoute />
    </HashRouter>
);