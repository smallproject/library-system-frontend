import React, {useContext} from 'react';
import "./Navbar.css";
import {Link} from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import {LanguageContext} from "../../context/LanguageContext/LanguageContext.jsx";


const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const {language, setLanguage} = useContext(LanguageContext);
    const selectLanguage = (e) => { setLanguage(e.target.value) }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }



    return (
        <nav className={"navbar navigation"}>
            <div className={"navbar-logo"}>
                <h1>Library System Libro</h1>
            </div>
            <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                <Link to={"/"}>Home</Link>
                <Link to={"/catalog"}>Catalog</Link>
                <Link to={"/about"}>About Us</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/login"}>Login</Link>
            </div>

            <br/>
            <div className={"navbar-toggle"} onClick={toggleNavbar}>
                {isOpen ? <FaTimes/> : <FaBars/>}
            </div>
            <div className={"language-toggle"}>
                <select value={language} onChange={selectLanguage}>
                    <option value="nl">NL</option>
                    <option value="en">EN</option>
                </select>
            </div>
        </nav>
    );
}

export default Navbar;