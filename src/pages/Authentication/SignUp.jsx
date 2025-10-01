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
        <div className="container py-5">
            {isAuth ? (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="mb-4">Registreren</h2>

                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    id="username"
                                    name="username"
                                    value={formUser.username}
                                    onChange={handleChange}
                                />
                                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    value={formUser.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formUser.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                            </div>

                            <fieldset className="mb-4">
                                <legend className="fs-6">Select Roles</legend>
                                {Object.entries(roles).map(([role, checked]) => (
                                    <div className="form-check" key={role}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={role}
                                            id={role}
                                            checked={checked}
                                            onChange={handleRoleChange}
                                        />
                                        <label className="form-check-label" htmlFor={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>

                            <button type="submit" className="btn btn-primary w-100">Signup</button>
                        </form>

                        <p className="mt-3">
                            Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.
                        </p>
                    </div>
                </div>


            ): (
                <div className="text-center">
                    <h1 className="mb-3">Register Your Membership</h1>
                    <p>To register as a member, please visit your nearest library point.</p>
                    <p>Our friendly staff will assist you with the registration process and provide all the information
                        you need.</p>
                    <p className="mt-4">For more information, contact us at: <strong>support@librarysystem.com</strong>
                    </p>
                </div>
            )}
        </div>
    );
}

export default SignUp;