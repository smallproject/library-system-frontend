import "/src/App.css";
import {useContext} from "react";
import {LanguageContext} from "../context/LanguageContext/LanguageContext.jsx";
import content from "../content/content.json"

function Catalog() {
    const {language} = useContext(LanguageContext);
    const {title, description, description2, description3} = content[language].catalog;
    return (
        <section>
            <article className={"catalog"}>
                <h1>{title}</h1>
                <br/>
                <p>
                    {description}
                </p>
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

export default Catalog;