import React, {useContext} from 'react';
import "./Footer.css";
import {LanguageContext} from "../../context/LanguageContext.jsx";

function Footer() {
    const {language, setLanguage} = useContext(LanguageContext);
    const selectLanguage = (e) => {
        setLanguage(e.target.value)
    }
    return (
        <>
            <footer className={"container footer"}>


                <div className={"language-toggle"}>
                    <select value={language} onChange={selectLanguage}>
                        <option value="nl">NL</option>
                        <option value="en">EN</option>
                    </select>
                </div>
                <div className={"footer-content"}>
                    <div className={"footer-section library-info"}>
                        <h4>Library System</h4>
                        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>

                    <div className={"footer-section contact-info"}>
                        <h4>Contact Us</h4>
                        <p>Email: info@librarysytemtest.com</p>
                        <p>Phone: +316-5467-4564</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;