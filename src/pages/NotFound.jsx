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
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-lg-6">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h1 className="display-4 text-danger">404</h1>
                            <h2 className="mb-3">{title}</h2>
                            <p className="text-muted mb-4">{description}</p>
                            <img
                                src="src/assets/vecteezy_the-page-not-found-error-404_8892186.jpg"
                                alt="Books Not Found Illustration"
                                className="img-fluid rounded mb-4"
                            />

                            <button className="btn btn-primary" onClick={handleGoBack}>
                                Go Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default NotFound;