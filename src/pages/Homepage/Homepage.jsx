// import "./Homepage.css";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import content from "../../content/content.json";

function Homepage() {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {language} = useContext(LanguageContext);
    const {title, subtitle, description, description2} = content[language].homepage;
    const {learnmore,contactus } = content[language].titles;

    return (
        <section className={`py-5 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} `}>
            <div className="container text-center">
                <h1 className="mb-3">{title}</h1>
                <p className="lead mb-4">{subtitle}</p>
            </div>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button className="btn btn-primary" onClick={() => (window.location.href = "/about")}>
                    {learnmore}
                </button>
                <button className="btn btn-outline-primary" onClick={() => (window.location.href = "/contact")}>
                    {contactus}
                </button>
            </div>

        </section>
    );
}

export default Homepage;