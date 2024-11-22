import "/src/App.css"
import content from "../content/content.json";
import {useContext} from "react";
import {LanguageContext} from "../context/LanguageContext.jsx";

function AboutUs() {
    const {language} = useContext(LanguageContext);
    const {title, description, description2, description3} = content[language].about;

    return (
        <section>
            <article className={"plain-text-container"}>
                <h1>{title}</h1>
                <br/>
                <p>
                    {description}
                </p>
                <br/>
                <p>
                    {description2}
                </p>
                <br/>
                <br/>
                <p>
                    {description3}
                </p>
            </article>
        </section>
    );
}

export default AboutUs;