import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Header.scss";





// eslint-disable-next-line react/prop-types
const HeaderLink = ({ to, icon, children }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });

    return (
        <li className="header-list-item">
            <Link className={"header-link" + (isActive ? " active" : "")} to={to}>
                <FontAwesomeIcon icon={icon} />
                <span className="header-text">{children}</span>
            </Link>
        </li>
    )
};





const Header = () => {
    React.useEffect(() => {
        $(".header-hamburger").on("click", () => {
            $(".header-list").toggleClass("header-mobile-hidden");
        });
    }, []);

    return (
        <header id="header">
            <nav id="header-nav">
                <a className="header-hamburger">
                    <FontAwesomeIcon icon="bars"></FontAwesomeIcon>
                </a>
                <ul className="header-list header-mobile-hidden">
                    <HeaderLink to="/" icon="house">Home</HeaderLink>
                    <HeaderLink to="/sobre" icon="address-card">Sobre</HeaderLink>
                    <HeaderLink to="/projetos" icon="code">Projetos</HeaderLink>
                    <HeaderLink to="/contato" icon="envelope">Contato</HeaderLink>
                </ul>
            </nav>
        </header>
    )
};





export default Header;