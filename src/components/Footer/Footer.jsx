import {useContext} from 'react';
// import "./Footer.css";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {ThemeContext} from "../../context/ThemeContext.jsx";

function Footer() {
    const {language, setLanguage} = useContext(LanguageContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const selectLanguage = (e) => {
        setLanguage(e.target.value)
    }
    return (
        <footer className={"bg-light text-dark mt-5 py-4 border-top"}>
            <div className="container">
                <div className="row align-items-center mb-3">

                    {/*    Language Selector */}
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label htmlFor="languageSelect" className="form-label fw-bold">Language</label>
                        <select
                            id="languageSelect" className="form-select"
                            value={language} onChange={selectLanguage}>
                            <option value="nl">Nederlands</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    {/*   Theme Toggle */}
                    <div className="col-md-4 mb-3 mb-md-0">
                        <p className="mb-1">The current theme is {theme}</p>
                        <button className="btn btn-outline-primary" type={"button"} onClick={toggleTheme}>
                            Toggle Theme
                        </button>
                    </div>

                    {/*   Contact Info */}
                    <div className="col-md-4 text-md-end">
                        <h5 className="fw-bold">Contact Us</h5>
                        <p className="mb-1">Email: info@librarysytemtest.com</p>
                        <p className="mb-0">Phone: +316-5467-4564</p>
                    </div>

                    {/*   Footer Bottom */}
                    <div className="text-center pt-3 border-top">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Library System. All rights reserved.</p>
                    </div>

                </div>
            </div>

        </footer>
    );
}

export default Footer;