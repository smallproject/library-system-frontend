import "/src/App.css"
import {LanguageContext} from "../context/LanguageContext/LanguageContext.jsx";
import {useContext} from "react";
import content from "../content/content.json";

function NotFound() {
    const {language} = useContext(LanguageContext);
    const {title, description} = content[language].notfound;

    return (
        <section className={"notfound"}>
            <h1>{title}</h1>
            <p>
                {description}
            </p>
        </section>
    );
}

export default NotFound;