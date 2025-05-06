import "/src/App.css"
import {LanguageContext} from "../context/LanguageContext.jsx";
import {useContext} from "react";
import content from "../content/content.json";

function NotFound() {
    const {language} = useContext(LanguageContext);
    const {title, description} = content[language].notfound;

    const handleGoBack = () => {
        window.location.href = "/";
    };
    return (
        <section className={"container notfound-container"}>
            <article className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <h2 className="notfound-subtitle">Page Not Found</h2>
                <p className="notfound-message">
                    Oops! The page you are looking for doesn&#39;t exist. It might have been moved or deleted.
                </p>
                <img
                    src="src/assets/vecteezy_the-page-not-found-error-404_8892186.jpg"
                    alt="Books Not Found Illustration"
                    className="notfound-image"
                />
                <button className="notfound-button" onClick={handleGoBack}>
                    Go Back to Home
                </button>
            </article>
        </section>
    );
}

export default NotFound;