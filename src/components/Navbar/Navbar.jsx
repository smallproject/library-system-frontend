import React, {useContext} from 'react';
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {FaBars, FaTimes} from 'react-icons/fa';
import {ThemeContext} from "../../context/ThemeContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import profileLogo
    from "../../assets/DALL·E 2024-11-20 13.15.57 - A clean and modern logo icon for a personal profile, featuring a minimalist user silhouette or avatar shape. The design includes smooth, rounded edges.webp";
import RightPane from "../RightPane/RightPane.jsx";


function Navbar() {
    const {isAuth, logout} = useContext(AuthContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const {theme, toggleTheme} = useContext(ThemeContext);


    return (
        <nav className={"container navbar"}>
            <div className={"row-1"}>

                <div>

                    {isAuth ? (
                        <div>
                            <button
                                type="button"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                onClick={() => navigate('/signin')}
                            >
                                Log in
                            </button>
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    onClick={() => navigate('/signup')}*/}
                            {/*>*/}
                            {/*    Registreren*/}
                            {/*</button>*/}
                        </div>
                    )};

                </div>
                <div className={"row-1-content container"}>
                    {/*<Link to={"/api/v1/books"}>Books</Link>*/}
                    {/*<Link to={"/api/v1/authors"}>Authors</Link>*/}
                    {/*<Link to={"/api/v1/userreviews"}>User Reviews</Link>*/}
                    {/*<Link to={"/api/v1/inventories"}>Inventories</Link>*/}
                    <input className={"search-bar"} type="text" placeholder={"What are you looking for?"}/>
                    <button
                        className={"search-button"}
                        type={"button"}
                        onClick={() => navigate('/search')}
                    >
                        Search
                    </button>
                </div>

                {/*<div className={"theme-toggle"} style={{*/}
                {/*    backgroundColor: theme === 'light' ? '#ffffff' : '#333333',*/}
                {/*    color: theme === 'light' ? '#000000' : '#ffffff',*/}
                {/*    padding: '20px',*/}
                {/*    textAlign: 'center'*/}
                {/*}}>*/}
                {/*    <p>The current theme is {theme}</p>*/}
                {/*    <button onClick={toggleTheme}>*/}
                {/*        Toggle Theme*/}
                {/*    </button>*/}
                {/*</div>*/}

            </div>
            <div className={"row-2"}>

                <div className={"navbar-logo"}>
                    <Link to={"/"}><h1>Library System Libro</h1></Link>
                </div>
                <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                    <Link to={"/catalog"}>Catalog</Link>
                    <Link to={"/about"}>About Us</Link>
                    <Link to={"/contact"}>Contact</Link>
                    {isAuth ? (

                    <Link to={"/profile"}>
                        <div className={"logo-container"}>
                            <img src={profileLogo} alt="Profile Logo" className={"logo-style"}/>
                            <span className={"title"}>My Profile</span>
                        </div>
                    </Link>
                    ):(
                        <></>
                    )};
                </div>

                <div className={"navbar-toggle"} onClick={toggleNavbar}>
                    {isOpen ? <FaTimes/> : <FaBars/>}
                </div>
            </div>

            {isAuth ? (
                <RightPane/>
            ) : (
                <></>
            )}

        </nav>
    )
}

export default Navbar;