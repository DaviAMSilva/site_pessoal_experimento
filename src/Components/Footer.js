import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import React from 'react';
import "./Footer.scss";
import LanguageContext from "../contexts/Language";





const IconLink = ({ icon, text, href, title, classPrefix }) => {
    return (
        <li className={`${classPrefix}-item`}>
            <a className={`${classPrefix}-link`} href={href} target="_blank" rel="noopener noreferrer" title={title}>
                {icon ? <FontAwesomeIcon icon={icon} /> : null} <span className={`${classPrefix}-text`}>{text}</span>
            </a>
        </li>
    )
};

IconLink.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    href: PropTypes.string.isRequired,
    classPrefix: PropTypes.string.isRequired
};





const Footer = () => {
    let lang = React.useContext(LanguageContext);

    return (
        <footer id="footer">
            <nav id="footer-nav">
                <div className="tools-wrapper">
                    <span className="tools-made-with">{lang.footer.developed_with}</span>
                    <ul className="tools-list">
                        <IconLink classPrefix="tools" title="JavaScript" icon="fa-brands fa-js" href="https://developer.mozilla.org/pt-BR/JavaScript" />
                        <IconLink classPrefix="tools" title="React.js" icon="fa-brands fa-react" href="https://reactjs.org/" />
                        <IconLink classPrefix="tools" title="Node.js" icon="fa-brands fa-node" href="https://nodejs.org/" />
                        <IconLink classPrefix="tools" title="HTML5" icon="fa-brands fa-html5" href="https://html.spec.whatwg.org/" />
                        <IconLink classPrefix="tools" title="Sass" icon="fa-brands fa-sass" href="https://sass-lang.com/" />
                        <IconLink classPrefix="tools" title="jQuery" text="jQuery" href="https://jquery.com/" />
                        <IconLink classPrefix="tools" title="p5.js" text="p5.js" href="https://www.p5js.org/" />
                    </ul>
                </div>
                <div className="contacts-wrapper">
                    <ul className="contacts-list">
                        <IconLink classPrefix="contacts" icon="fa-brands fa-github" text="Github" href="https://www.github.com/daviamsilva" />
                        <IconLink classPrefix="contacts" icon="fa-brands fa-linkedin" text="LinkedIn" href="https://www.linkedin.com/in/daviamsilva/" />
                    </ul>
                </div>
            </nav>
        </footer>
    )
};





export default Footer;