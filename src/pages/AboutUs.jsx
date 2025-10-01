// import "/src/App.css"
import content from "../content/content.json";
import {useContext} from "react";
import {LanguageContext} from "../context/LanguageContext.jsx";

function AboutUs() {
    const {language} = useContext(LanguageContext);
    const {title, description, description2, description3} = content[language].about;

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <article className="bg-light p-4 rounded shadow-sm">
                        <h1 className="mb-4 text-primary">{title}</h1>
                        <p className="mb-3">{description}</p>
                        <p className="mb-3">{description2}</p>
                        <p className="mb-0">{description3}</p>
                    </article>
                </div>

            </div>

        </section>
    );
}

export default AboutUs;