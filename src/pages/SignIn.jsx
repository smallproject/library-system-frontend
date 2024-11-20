import {useContext} from 'react';
import {AuthContext} from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import decode from "../helpers/decodeTokenAndDeclare.js"

function SignIn() {
    const {login} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/login', {
                userName: "frans",
                password: "vlekkie"
            });
            console.log(response);

            const authHeader = response.headers['authorization']
            if (authHeader) {
                const token = authHeader.split(" ")[1];

                //helper function to decode the token
                decode(token);
                login(token);
            } else {
                throw new Error("Authorization header missing");
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section>
            <article className={"signin-page"}>
                <h1>Inloggen</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                    molestias qui quo unde?</p>

                <form onSubmit={handleSubmit}>
                    <p>*invoervelden*</p>
                    <button type={"submit"}>Inloggen</button>
                </form>

                <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
            </article>
        </section>
    );
}

export default SignIn;