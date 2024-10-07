import React from 'react';
import "./Navbar.css";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="navbar">
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li>About</li>
                </ul>
            </div>
            <div className="navbar">
                <ul>
                    <li><Link to={"/authors/2"}>AUTHORS</Link></li>
                    <li><Link to={"/books/"}>BOOKS</Link></li>
                    <li><Link to={"/inventories/"}>INVENTORIES</Link></li>
                    <li><Link to={"/userreviews/"}>USER REVIEWS</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;