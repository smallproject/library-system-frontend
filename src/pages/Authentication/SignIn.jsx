import {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import decode from "../../helpers/decodeTokenAndDeclare.js"
import "./Profile.css"

function SignIn() {
    const {login} = useContext(AuthContext);
    const [formUser, setFormUser] = useState({
        userName: "",
        password: ""
    });
    const [errors, setErrors] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (!formUser.userName || !formUser.password) {
            setErrors("Please fill in all fields.");
            return;
        }

        setErrors("");
        try {
            const response = await axios.post('http://localhost:8080/api/v1/login', formUser);
            const authHeader = response.headers['authorization']

            if (authHeader) {
                const token = authHeader.split(" ")[1];

                decode(token);
                login(token);
            } else {
                throw new Error("No Authorization Header found.");
            }

        } catch (e) {
            setErrors(e);
            console.error("Login failed:", e?.response ? e?.response?.data : e?.message);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormUser({...formUser, [name]: value});
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formUser.userName.trim()) newErrors.userName = "Username is required";
        if (!formUser.password) newErrors.password = "Password is required.";

        return newErrors;
    }

    return (
        <section className={"container plain-text-container center"}>
            <article className={"container signup-container"}>
                <h1>Inloggen</h1>
                <br/>
                <p>Welcome back! Please log in to access your library account, manage your loans, and explore our collection.</p>

                <br/>
                <br/>
                {errors && <p className="error-message">Login failed. Please check your username and password and try again.
                    {errors.message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={"form-group"}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id={"userName"}
                            name={"userName"}
                            value={formUser.userName}
                            onChange={handleChange}
                            className={errors?.userName ? "input-error" : ""}
                        />
                        {errors?.userName && <p className={"error-message"}>{errors?.userName}</p>}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="passwored">Password</label>
                        <input
                            type="password"
                            id={"password"}
                            name={"password"}
                            value={formUser.password}
                            onChange={handleChange}
                            className={errors?.password ? "input-error" : ""}
                        />
                        {errors?.password && <p className={"error-message"}>{errors?.password}</p>}
                    </div>
                    <button type={"submit"} className={"login-btn"}>Login</button>
                </form>

                <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
            </article>
        </section>
    );
}

export default SignIn;