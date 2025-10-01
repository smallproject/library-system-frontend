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
                <div className="row mb-4">

                    {/*    Language Selector */}
                    <div className="col-md-3 mb-3 mb-md-0">
                        <label htmlFor="languageSelect" className="form-label fw-bold">Language</label>
                        <select
                            id="languageSelect" className="form-select"
                            value={language} onChange={selectLanguage}>
                            <option value="nl">Nederlands</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    {/*   Theme Toggle */}
                    <div className="col-md-3 mb-3 mb-md-0">
                        <p className="mb-1">The current theme is {theme}</p>
                        <button className="btn btn-outline-primary" type={"button"} onClick={toggleTheme}>
                            Toggle Theme
                        </button>
                    </div>

                    {/*   Contact Info */}
                    <div className="col-md-3 text-md-end">
                        <h5 className="fw-bold">Contact Us</h5>
                        <p className="mb-1">Email: info@librarysytemtest.com</p>
                        <p className="mb-0">Phone: +316-5467-4564</p>
                    </div>

                    {/* Opening Hours */}
                    <div className="col-md-3 mb-3 text-start">
                        <h5 className="fw-bold">Our Opening Hours</h5>
                        <ul className="list-unstyled mb-0">
                            <li><strong>Mon–Fri:</strong> 9:00–18:00</li>
                            <li><strong>Sat:</strong> 10:00–15:00</li>
                            <li><strong>Sun:</strong> Closed</li>
                        </ul>
                    </div>

                </div>


                {/*   Footer Bottom */}
                <div className="text-center border-top pt-3">
                    <p className="mb-0">&copy; {new Date().getFullYear()} Library System. All rights reserved.</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;