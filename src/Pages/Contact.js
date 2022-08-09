import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import "./Contact.scss";





const ContactIconLink = ({ icon, text, title, href }) => {
    return (
        <li className="contact-item">
            <a className="contact-link" title={title} href={href} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon} />
                <span className="contact-text">{" " + text}</span>
            </a>
        </li>
    )
};

ContactIconLink.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};





const ContactSection = ({ children, extraClasses, text, ...props }) => {
    return (
        <div className={"contact-section " + extraClasses}>
            <h2 className="contact-title">{text}</h2>
            <ul className="contact-list">
                {children}
            </ul>
        </div>
    )
};

ContactSection.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    text: PropTypes.string.isRequired
};





const Contact = () => {
    return (
        <div id="contact-wrapper">
            <ContactSection extraClasses="main-contacts" text="Contato">
                <>
                    <ContactIconLink icon="fa-brands fa-linkedin" title="/in/daviamsilva" text="/in/daviamsilva" href="https://www.linkedin.com/in/daviamsilva/" />
                    <ContactIconLink icon="fa-solid fa-envelope" title="daviamsilva@hotmail.com" text="daviamsilva@hotmail.com" href="mailto:daviamsilva@hotmail.com" />
                </>
            </ContactSection>
            <ContactSection extraClasses="secondary-contacts" text="Links">
                <>
                    <ContactIconLink icon="fa-brands fa-github" title="github.com/daviamsilva" text="Github" href="https://www.github.com/daviamsilva" />
                    <ContactIconLink icon="fa-solid fa-house-user" title="daviamsilva.github.io" text="github.io" href="http://daviamsilva.github.io" />
                    <ContactIconLink icon="fa-solid fa-code" title="openprocessing.org/user/174304" text="OpenProcessing" href="https://openprocessing.org/user/174304" />
                    <ContactIconLink icon="fa-solid fa-graduation-cap" title="codinstruct-pi4.herokuapp.com" text="codinStruct" href="http://codinstruct-pi4.herokuapp.com/" />
                    <ContactIconLink icon="fa-solid fa-gamepad" title="Arcade Mania" text="Arcade Mania" href="https://github.com/DaviAMSilva/Arcade_Mania" />
                </>
            </ContactSection>
            <h2 className="contact-name">Davi Augusto Moreira da Silva</h2>
        </div>
    )
};





export default Contact;