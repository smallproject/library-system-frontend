import React from 'react';
import "./Navbar.css";
import {Link} from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className={"navbar navigation"}>
            <div className={"navbar-logo"}>
                <h1>Library System Biblio</h1>
            </div>
            <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                <Link to={"/"}>Home</Link>
                <Link to={"/catalog"}>Catalog</Link>
                <Link to={"/about"}>About Us</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/login"}>Login</Link>
            </div>

            <div className={"navbar-toggle"} onClick={toggleNavbar}>
                {isOpen ? <FaTimes/> : <FaBars/>}
            </div>
        </nav>
    );
}

export default Navbar;