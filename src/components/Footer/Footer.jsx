import {useContext} from 'react';
import "./Footer.css";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {ThemeContext} from "../../context/ThemeContext.jsx";

function Footer() {
    const {language, setLanguage} = useContext(LanguageContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const selectLanguage = (e) => {
        setLanguage(e.target.value)
    }
    return (
        <>
            <footer className={"container footer btm-banner"}>


                <div className={"language-toggle"}>
                    <label htmlFor="">Language</label>
                    <select value={language} onChange={selectLanguage}>
                        <option value="nl">Nederlands</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div>
                    <p>The current theme is {theme}</p>
                    <button type={"button"} onClick={toggleTheme}>
                        Toggle Theme
                    </button>
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