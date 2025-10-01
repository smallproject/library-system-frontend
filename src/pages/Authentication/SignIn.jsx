import {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import decode from "../../helpers/decodeTokenAndDeclare.js"
// import "./Profile.css"

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
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Library Login</h2>
                            <p className="text-muted text-center mb-4">
                                Welcome back! Log in to manage your loans and explore our collection.
                            </p>

                            {errors && typeof errors === "string" && (
                                <div className="alert alert-danger">{errors}</div>
                            )}


                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors?.userName ? 'is-invalid' : ''}`}
                                        id="userName"
                                        name="userName"
                                        value={formUser.userName}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.userName && (
                                        <div className="invalid-feedback">{errors.userName}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={formUser.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>

                            <p className="mt-4 text-center">
                                Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default SignIn;