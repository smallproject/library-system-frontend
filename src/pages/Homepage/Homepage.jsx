import "./Homepage.css";
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
        <section className={`global-theme ${theme === 'dark' ? 'dark-mode' : ''} `}>
            <article className={`global-theme container home-container ${theme === 'dark' ? 'dark-mode' : ''} `}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <div className="home-actions">
                    <button className="home-button" onClick={() => (window.location.href = "/about")}>
                        {learnmore}
                    </button>
                    <button className="home-button" onClick={() => (window.location.href = "/contact")}>
                        {contactus}
                    </button>
                </div>
            </article>

        </section>
    );
}

export default Homepage;