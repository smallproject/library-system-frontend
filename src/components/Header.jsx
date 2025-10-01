// import Navbar from "./Navbar/Navbar.jsx";
import {Link} from "react-router-dom";
import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SearchForm from "./SearchBar/index.jsx";

function Header(props) {
    return (
        <div className="container py-5">
            <header className="text-center mb-5">
                <h1 className="display-3 fw-bold text-primary">Library System Libro</h1>
                <p className="fs-5 text-secondary">Empowering schools with smarter library workflows and seamless member management</p>
            </header>

            {/*<Navbar {...props} />*/}
            <SearchForm/>


            <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded mb-5 shadow-sm">
                <div className="container-fluid">

                    {/* Brand */}
                    <Link className="navbar-brand fw-semibold" to="/">
                        Dashboard
                    </Link>


                     {/*Toggler*/}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    {/* Collapseable issue creating separate component*/}
                    {/*<div className="d-flex ms-auto">*/}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/*<ul className="navbar-nav flex-row gap-3">*/}
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/catalog">Catalog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    {/*<div className="collapse navbar-collapse" id="navbarNav">*/}
                    {/*    <ul className="navbar-nav ms-auto">*/}
                    {/*        <li className="nav-item"><a className="nav-link" href="/students">Students</a></li>*/}
                    {/*        <li className="nav-item"><a className="nav-link" href="/teachers">Teachers</a></li>*/}
                    {/*        <li className="nav-item"><a className="nav-link" href="/classes">Classes</a></li>*/}
                    {/*        <li className="nav-item"><a className="nav-link" href="/attendance">Attendance</a></li>*/}
                    {/*        <li className="nav-item"><a className="nav-link" href="/reports">Reports</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </nav>
        </div>

    )
        ;
}

export default Header;