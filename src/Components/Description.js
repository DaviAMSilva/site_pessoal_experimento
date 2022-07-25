import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Description = () => {
    return (
        <div id="description-wrapper">
            <div id="description">
                <div id="code-dots">
                    <FontAwesomeIcon icon="circle" color="#ff5f5a" />
                    <FontAwesomeIcon icon="circle" color="#ffbe2e" />
                    <FontAwesomeIcon icon="circle" color="#2aca44" />
                </div>
                <span className="code-sidebar">1</span>
                <span className="code-line"><span className="code-keyword">Hello World</span>;</span>
                <br />
                <span className="code-sidebar">2</span>
                <span className="code-line">meu_nome = <h1 className="code-string username">&quot;Davi<span className="show-am-hover">AM</span>Silva&quot;</h1>;</span>
                <br />
                <span className="code-sidebar">3</span>
                <span className="code-line code-comment">&#47;&#47; Cientista da Computação</span>
            </div>
        </div>
    )
};

export default Description;