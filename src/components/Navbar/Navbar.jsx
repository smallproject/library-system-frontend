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
        <>
            <nav className={"navbar"}>
                <div className={"navbar-logo"}>
                    <h1>Library System Biblio</h1>
                </div>
                <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                {/*<div className={`navbar-links `}>*/}
                    <Link to={"/"}>Home</Link>
                    <Link to={"/catalog"}>Catalog</Link>
                    <Link to={"/about"}>About Us</Link>
                    <Link to={"/contact"}>Contact</Link>
                    {/*<a href="#contact">Contact</a>*/}
                    {/*<a href="#login">Login</a>*/}
                    <Link to={"/login"}>Login</Link>
                </div>

                <div className={"navbar-toggle"} onClick={toggleNavbar}>
                    {isOpen ? <FaTimes/> : <FaBars/>}
                    {/*<FaTimes/>*/}
                </div>
            </nav>


            {/*<div className="navbar">*/}
            {/*    <ul>*/}
            {/*        <li><Link to={"/authors"}>AUTHORS</Link></li>*/}
            {/*        <li><Link to={"/books"}>BOOKS</Link></li>*/}
            {/*        <li><Link to={"/inventories"}>INVENTORIES</Link></li>*/}
            {/*        <li><Link to={"/userreviews"}>USER REVIEWS</Link></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </>
    );
}

export default Navbar;