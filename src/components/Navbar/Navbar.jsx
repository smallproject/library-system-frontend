import React, {useContext} from 'react';
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {FaBars, FaTimes} from 'react-icons/fa';
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {ThemeContext} from "../../context/ThemeContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";


function Navbar() {
    const {isAuth, logout} = useContext(AuthContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const {language, setLanguage} = useContext(LanguageContext);
    const selectLanguage = (e) => {
        setLanguage(e.target.value)
    }
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const {theme, toggleTheme} = useContext(ThemeContext);


    return (
        <nav className={"container navbar"}>
            <div className={"row-1"}>
                <div>
                    <Link to={"/api/v1/books"}>Books</Link>
                    <Link to={"/api/v1/authors"}>Authors</Link>
                    <Link to={"/api/v1/userreviews"}>User Reviews</Link>
                    <Link to={"/api/v1/inventories"}>Inventories</Link>
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
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Registreren
                        </button>
                    </div>
                )};


                <div className={"language-toggle"}>
                    <select value={language} onChange={selectLanguage}>
                        <option value="nl">NL</option>
                        <option value="en">EN</option>
                    </select>
                </div>
            </div>
            <div className={"row-2"}>

                <div className={"navbar-logo"}>
                    <h1>Library System Libro</h1>
                </div>
                <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/catalog"}>Catalog</Link>
                    <Link to={"/about"}>About Us</Link>
                    <Link to={"/contact"}>Contact</Link>
                </div>

                <div className={"navbar-toggle"} onClick={toggleNavbar}>
                    {isOpen ? <FaTimes/> : <FaBars/>}
                </div>
            </div>

        </nav>
    )
}

export default Navbar;