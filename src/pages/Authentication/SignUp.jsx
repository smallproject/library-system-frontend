import {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import "./Profile.css"
import mapRolesToArray from "../../helpers/mapRolesToArray.js";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

function SignUp() {

    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const {isAuth} = useContext(AuthContext);

    const [formUser, setFormUser] = useState({
        username: "",
        password: "",
        roles: "",
    });

    const [roles, setRoles] = useState({
        admin: false,
        user: true,
        libraryStaff: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        formUser.roles = mapRolesToArray(roles);

        try {
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:8080/api/v1/users",
                formUser,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

        } catch (e) {
            setErrors(e);
            console.error(e);
        }

        setErrors({});
        setSuccessMessage("Signup successful!");
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormUser({
            ...formUser,
            [name]: value
        });
    }


    const handleRoleChange = (e) => {
        const {name, checked} = e.target;
        setRoles({...roles, [name]: checked});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formUser.username.trim()) newErrors.username = "Username is required";
        if (!formUser.password) newErrors.password = "Password is required.";
        if (formUser.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        if (formUser.password !== formUser.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match.";

        return newErrors;
    }

    return (
        <section className={"container"}>
            {isAuth ? (
                <article className={"container signup-container"}>
                    <h2>Registreren</h2>

                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group"}>
                            <label htmlFor="username"> Username</label>
                            <input
                                type="text"
                                id={"username"}
                                name={"username"}
                                value={formUser.username}
                                onChange={handleChange}
                                className={errors?.username ? "input-error" : ""}
                            />
                            {errors?.username && <p className={"error-message"}>{errors.username}</p>}
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="password"> Password</label>
                            <input
                                type="password"
                                id={"password"}
                                name={"password"}
                                value={formUser.password}
                                onChange={handleChange}
                                className={errors?.password ? "input-error" : ""}
                            />
                            {errors?.password && <p className={"error-message"}>{errors.password}</p>}
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id={"confirmPassword"}
                                name={"confirmPassword"}
                                value={formUser.confirmPassword}
                                onChange={handleChange}
                                className={errors?.confirmPassword ? "input-error" : ""}
                            />
                            {errors?.confirmPassword && <p className={"error-message"}>{errors.confirmPassword}</p>}
                        </div>


                        <div className={"roles"}>
                            <h4>Select Roles</h4>
                            <div className="role-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="admin"
                                        checked={roles.admin}
                                        onChange={handleRoleChange}
                                    />
                                    Admin
                                </label>
                            </div>
                            <div className="role-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="user"
                                        checked={roles.user}
                                    />
                                    User
                                </label>
                            </div>
                            <div className="role-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="libraryStaff"
                                        checked={roles.libraryStaff}
                                        onChange={handleRoleChange}
                                    />
                                    Library Staff
                                </label>
                            </div>
                        </div>

                        <button type={"submit"} className={"submit-button"}>
                            Signup
                        </button>
                    </form>
                    <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
                </article>
            ) : (
                <article className="container contact-library-container">
                    <div className="contact-library-card">
                        <h1 className="contact-title">Register Your Membership</h1>
                        <p className="contact-message">
                            To register as a member, please visit your nearest library point.
                        </p>
                        <p className="contact-details">
                            Our friendly staff will assist you with the registration process and provide all the
                            information you need.
                        </p>
                        <div className="contact-footer">
                            <p>For more information, contact us at: <strong>support@librarysystem.com</strong></p>
                        </div>
                    </div>
                </article>
            )}
        </section>
    );
}

export default SignUp;