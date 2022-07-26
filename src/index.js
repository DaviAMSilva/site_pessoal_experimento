import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Background from "./Components/Background";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import "./Styles/Global.scss";





// Adicionando os ícones do FontAwesome
library.add(fas);




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Header />
        <div id="content">
            <Routes>
                <Route path="/" element={
                    <>
                        <Home />
                        <Background />
                    </>
                } />
            </Routes>
        </div>
    </BrowserRouter>
);