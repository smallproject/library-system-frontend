import {useState} from 'react';
import {Link, } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "./Profile.css";

function Profile() {

    const [profileData, setProfileData] = useState({
        name: "",
        bio: "",
        location: "",
        email: ""
    });

    const [isLoading, toggleIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const updateProfileData = async () => {
        toggleIsLoading(true);
        setErrors(null);

        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const response = await axios.post(`http://localhost:8080/api/v1/users/${username}/profile`,
                profileData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add the token here
                    },
                });
            console.log(response.data);
        } catch (e) {
            console.error(e);
            setErrors(e);
        } finally {
            toggleIsLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const username = localStorage.getItem('username');
        console.log(`http://localhost:8080/api/v1/users/${username}/profile`);
        console.log(profileData);
        updateProfileData();
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    }

    return (
        <section className={"container"}>
            <article className={"container profile-container"}>
                <h1>Update Data</h1>
                <form onSubmit={handleSubmit}>
                    <div className={"form-group"}>
                        <label htmlFor="name"> Name</label>
                        <input
                            type="text"
                            id={"name"}
                            name={"name"}
                            value={profileData.name}
                            onChange={handleChange}
                            className={errors?.name ? "input-error" : ""}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="bio"> Bio</label>
                        <textarea
                            id={"bio"}
                            name={"bio"}
                            value={profileData.bio}
                            onChange={handleChange}
                            className={errors?.bio ? "input-error" : ""}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="location"> Location</label>
                        <input
                            type="text"
                            id={"location"}
                            name={"location"}
                            value={profileData.location}
                            onChange={handleChange}
                            className={errors?.location ? "input-error" : ""}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="email"> Email</label>
                        <input
                            type="text"
                            id={"email"}
                            name={"email"}
                            value={profileData.email}
                            onChange={handleChange}
                            className={errors?.email ? "input-error" : ""}
                        />
                    </div>

                    <button onClick={"submit"}>Save</button>
                </form>

                <br/>
                <br/>
                <br/>
                <br/>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>

                {isLoading && <p>Loading...</p>}
                {errors && <p>Er is iets misgegaan: {errors.message}</p>}
            </article>
        </section>
    );
}

export default Profile;