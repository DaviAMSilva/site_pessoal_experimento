import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Background from "./Components/Background";
import Footer from './Components/Footer';
import Header from "./Components/Header";
import Home from "./Pages/Home";
import "./Styles/Global.scss";





// Adicionando os ícones do FontAwesome
library.add(fas, fab);




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
                <Route path="/sobre" element={
                    <div>Sobre</div>
                } />
                <Route path="/contato" element={
                    <div>Contato</div>
                } />
                <Route path="/projetos" element={
                    <div>Projetos</div>
                } />
            </Routes>
        </div>
        <Footer />
    </BrowserRouter>
);