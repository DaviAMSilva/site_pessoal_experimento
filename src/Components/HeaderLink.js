import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





const HeaderLink = (props) => {
    return (
        <a className="header-link header-mobile-hidden" href={props.href}>
            <FontAwesomeIcon icon={props.icon} />
            <span className="header-text">{props.text}</span>
        </a>
    )
}

HeaderLink.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string
}

HeaderLink.defaultProps = {
    href: "#",
    icon: "circle-question",
    text: "Link"
}





export default HeaderLink