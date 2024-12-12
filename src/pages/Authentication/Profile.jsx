import {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "./Profile.css";
import imageSource from "/src/assets/2289_SkVNQSBGQU1PIDEwMjgtMTE5.jpg";

function Profile() {

    const [profileData, setProfileData] = useState({});
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [address, setaddress] = useState({});
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


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
                fetchAddress(response?.data.id);
                fetchProfilePhoto(response?.data.id);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }


        const fetchAddress = async (userId) => {
            toggleIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/addresses/${userId}`, {
                        headers: {
                            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                        }
                    });
                }

                setaddress(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }

        const fetchProfilePhoto = async (userId) => {
            toggleIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/users/photo/${userId}`, {
                        headers: {
                            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                        }
                    });

                    if (response.data.ok) {
                        console.log(response.data);
                        const blob = await response.data.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setProfilePhoto(imageUrl);
                    } else {
                    console.error('Failed to fetch image');
                }
                }

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
                        src={profilePhoto ? profilePhoto : imageSource}
                        alt="profile image"
                        className={"profile-picture"}
                    />
                    <h1 className={"profile-name"}>{profileData?.name}</h1>
                    <p className={"profile-bio"}>{profileData?.bio}</p>
                </div>
                <button type={"button"} onClick={() => navigate('/profile/uploadimage')}>Change Photo</button>


                <br/>
                <br/>
                <div className={"profile-details"}>
                    <h3>Gegevens</h3>
                    <p><strong>Gebruikersnaam:</strong> hardcoded-test</p>
                    <p><strong>Email:</strong> hardcoded@test.com</p>
                    <p>
                        <strong>Email:</strong>
                        <a href={`mailto:${profileData?.email}`} className={"profile-email"}>
                            {profileData?.email}
                        </a>
                    </p>
                    <p>
                        <strong>Location:</strong> {profileData?.location}
                    </p>
                    <p>
                        <strong>Street:</strong> {address?.street}
                    </p>
                    <p>
                        <strong>House No:</strong> {address?.houseNo}
                    </p>
                    <p>
                        <strong>Post Code:</strong> {address?.postCode}
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
                <button type={"button"} onClick={() => navigate("/profile/update")}>Update</button>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>

                {isLoading && <p>Loading...</p>}
                {error && <p>Er is iets misgegaan: {error.message}</p>}
            </article>
        </section>
    );
}

export default Profile;