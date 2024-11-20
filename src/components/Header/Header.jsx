import React from 'react';
import Navbar from "../Navbar/Navbar.jsx";
import "./Header.css"

function Header(props) {
    return (
        <header className={"container"}>
            <Navbar {...props} />
        </header>
    );
}

export default Header;