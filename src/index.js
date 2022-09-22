import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Background from "./components/Background";
import Footer from './components/Footer';
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./styles/Global.scss";
import Languages from "./languages.json";
import LanguageContext from "./contexts/Language";





// Adicionando os ícones do FontAwesome
library.add(fas, fab);



const App = () => {
    const [lang, setLang] = React.useState(Languages.pt);
    const [langIndex, setLangIndex] = React.useState(0);

    // Lista dos código dos idiomas disponíveis
    const langList = ["en", "pt"];

    function changeLang() {
        // Troca para a próxima língua
        setLangIndex((langIndex + 1) % langList.length);
        setLang(Languages[langList[langIndex]]);
    }

    return (
        <LanguageContext.Provider value={lang}>
            <BrowserRouter>
                <Header changeLang={changeLang} />
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
        </LanguageContext.Provider>
    )
};



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);