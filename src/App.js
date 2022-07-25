import React from "react";
import Background from "./Components/Background";
import Description from "./Components/Description";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import "./App.css";



// Adicionando os ícones do FontAwesome
library.add(faCircle);



function App() {
    return (
        <>
            <Description />
            <Background />
        </>
    );
}

export default App;