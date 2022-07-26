import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import "../Styles/App.scss";
import Background from "./Background";
import Description from "./Description";
import Header from "./Header";



// Adicionando os ícones do FontAwesome
library.add(fas);



function App() {
    return (
        <>
            <Header />
            <Description />
            <Background />
        </>
    );
}

export default App;