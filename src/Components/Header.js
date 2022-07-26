import React from "react";
import "../Styles/Header.scss";
import HeaderLink from "./HeaderLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";





const Header = () => {
    React.useEffect(() => {
        $(".header-hamburger").on("click", () => {
            $(".header-link").toggleClass("header-mobile-hidden");
        });
    }, []);

    return (
        <header id="header">
            <a className="header-hamburger">
                <FontAwesomeIcon icon="bars"></FontAwesomeIcon>
            </a>
            <HeaderLink href="/sobre" icon="address-card" text="Sobre" />
            <HeaderLink href="/projetos" icon="code" text="Projetos" />
            <HeaderLink href="/contato" icon="envelope" text="Contato" />
        </header>
    )
}





export default Header