import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import "./Home.scss";
import LanguageContext from "../contexts/Language";

const Home = () => {
    let lang = React.useContext(LanguageContext);
    
    return (
        <div id="home-wrapper">
            <div id="home">
                <div id="code-dots">
                    <FontAwesomeIcon icon="circle" color="#ff5f5a" />
                    <FontAwesomeIcon icon="circle" color="#ffbe2e" />
                    <FontAwesomeIcon icon="circle" color="#2aca44" />
                </div>
                <span className="code-sidebar">1</span>
                <span className="code-line"><span className="code-keyword">{lang.pages.home.line1}</span>;</span>
                <br />
                <span className="code-sidebar">2</span>
                <span className="code-line">{lang.pages.home.line2} = <h1 className="code-string username">&quot;Davi<span className="show-am-hover">AM</span>Silva&quot;</h1>;</span>
                <br />
                <span className="code-sidebar">3</span>
                <span className="code-line code-comment">&#47;&#47; {lang.pages.home.line3}</span>
            </div>
        </div>
    )
};

export default Home;