import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../../App.css"
import "./Profile.css"
import {AuthContext} from "../../context/AuthContext.jsx";

function Profile() {

    const [profileData, setProfileData] = useState({});
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuth) {
        navigate("/signin");
        return null;
    }

    useEffect(() => {

        const fetchProfileData = async () => {
            toggleIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");
                const username = localStorage.getItem("username");

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/users/${username}`, {
                        headers: {
                            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                        }
                    });
                }

                setProfileData(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }
        fetchProfileData()
    }, []);

    return (
        <section className={"container"}>
            <article className={"container profile-container"}>

                <div className={"profile-header"}>
                    <img
                        src="/src/assets/DALL·E%202024-11-20%2013.15.57%20-%20A%20clean%20and%20modern%20logo%20icon%20for%20a%20personal%20profile,%20featuring%20a%20minimalist%20user%20silhouette%20or%20avatar%20shape.%20The%20design%20includes%20smooth,%20rounded%20edges.webp"
                        alt="profile image"
                        className={"profile-picture"}
                    />
                    <h1 className={"profile-name"}>{profileData?.name}</h1>
                    <p className={"profile-bio"}>{profileData?.bio}</p>
                </div>


                <br/>
                <br/>
                <div className={"profile-details"}>
                    <h3>Gegevens</h3>
                    <p><strong>Gebruikersnaam:</strong> hardcoded-test</p>
                    <p><strong>Email:</strong> hardcoded@test.com</p>
                    <p>
                        <strong>Location:</strong> {profileData?.location}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        <a href={`mailto:${profileData?.email}`} className={"profile-email"}>
                            {profileData?.email}
                        </a>
                    </p>
                </div>

                <br/>
                <br/>
                <div className={"profile-details"}>
                    <h3>Strikt geheime profiel-content</h3>
                    <p>
                        <strong>Username:</strong> {profileData?.username}
                    </p>
                    <p>
                        <strong>Password:</strong> {profileData?.password}
                    </p>
                    <p>
                        <strong>Roles:</strong>
                        {profileData.roles?.map((role, index) => (
                            <span key={index}>
                                {role}
                                {index < profileData.roles.length - 1 ? ", " : ""}
                            </span>))}
                    </p>
                </div>

                <br/>
                <br/>
                <br/>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>

                {isLoading && <p>Loading...</p>}
                {error && <p>Er is iets misgegaan: {error.message}</p>}
            </article>
        </section>
    );
}

export default Profile;