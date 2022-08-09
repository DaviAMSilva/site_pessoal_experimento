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
import Contact from "./Pages/Contact";
import "./Styles/Global.scss";





// Adicionando os ícones do FontAwesome
library.add(fas, fab);





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Header />
        <main id="content">
            <Routes>
                <Route path="/" element={
                    <>
                        <Background />
                        <Home />
                    </>
                } />
                <Route path="/sobre" element={
                    <div>Sobre</div>
                } />
                <Route path="/projetos" element={
                    <div>Projetos</div>
                } />
                <Route path="/contato" element={
                    <Contact />
                } />
                <Route path="*" element={
                    // Página 404 usando http.cat
                    <a href="https://http.cat" target="_blank" rel="noopener noreferrer">
                        <img src="https://http.cat/404" id="cat404" />
                    </a>
                } />
            </Routes>
        </main>
        <Footer />
    </BrowserRouter>
);