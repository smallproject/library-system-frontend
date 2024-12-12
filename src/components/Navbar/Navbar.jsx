import React, {useContext, useState} from 'react';
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {FaBars, FaTimes} from 'react-icons/fa';
import {ReservationContext} from "../../context/ReservationProvider.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import profileLogo
    from "../../assets/DALL·E 2024-11-20 13.15.57 - A clean and modern logo icon for a personal profile, featuring a minimalist user silhouette or avatar shape. The design includes smooth, rounded edges.webp";
import RightPane from "../RightPane/RightPane.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import content from "../../content/content.json";


function Navbar() {
    const {isAuth, logout} = useContext(AuthContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const {language} = useContext(LanguageContext);
    const {search, searchBtn, login,logOutbtn} = content[language].titles;

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const {reservationList} = useContext(ReservationContext);

    const [searchParams, setSearchParams] = useState({
        title: '',
        author: 'George Orwell',
    });

    const handleSearchNavigate = () => {
        navigate('/search', {state: searchParams});
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSearchParams({...searchParams, [name]: value});
    }

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
                                {logOutbtn}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                onClick={() => navigate('/signin')}
                            >
                                {login}
                            </button>
                        </div>
                    )}

                </div>
                <div className={"row-1-content container"}>
                    <input
                        className={"search-bar"}
                        type="text"
                        placeholder={search}
                        id={"title"}
                        name={"title"}
                        onChange={handleChange}
                    />
                    <button
                        className={"search-button"}
                        type={"button"}
                        onClick={handleSearchNavigate}
                    >
                        {searchBtn}
                    </button>
                </div>

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
                    ) : (
                        <></>
                    )}

                    <Link to={"/reserve"}>
                        <div className={"reservation-icon"}>
                        <span className="icon">
                        📚
                        </span>
                            {reservationList.length > 0 && (
                                <span className="counter-badge">{reservationList.length}</span>
                            )}
                        </div>
                    </Link>
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