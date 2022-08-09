import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import PropTypes from "prop-types";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Header.scss";





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

HeaderLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};





const Header = () => {
    React.useEffect(() => {
        $(".header-hamburger").on("click", () => {
            $(".header-list").toggleClass("header-mobile-hidden");
        });

        $(".header-list-item").on("click", () => {
            $(".header-list").addClass("header-mobile-hidden");
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