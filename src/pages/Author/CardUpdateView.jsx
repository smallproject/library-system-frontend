import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {getFullname} from "../../helpers/textHelper.js";
import getResponseForCase from "../../helpers/getResponseForCase.js";

function CardView() {
    const {id} = useParams();
    const [author, setAuthor] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({});

    useEffect(() => {

        const fetchAuthor = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/authors/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                setAuthor(response.data);

                setFormData({
                    firstName: response.data?.firstName || '',
                    middleName: response.data?.middleName || '',
                    lastName: response.data?.lastName || '',
                    dateOfBirth: response.data?.dateOfBirth || '',
                    nationality: response.data?.nationality || '',
                    dateOfDeath: response.data?.dateOfDeath || '',
                    bio: response.data?.bio || '',
                    website: response.data?.website || '',
                    email: response.data?.email || '',
                    awards: response.data?.awards || '',
                    activeYears: response.data?.activeYears || '',
                    profilePictureUrl: response.data?.profilePictureUrl || '',
                });

            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchAuthor()
    }, []);


    const renderObjectInfo = () => {
        if(typeof author === 'object' && author !== null && author !== undefined) {
            return Object.entries(author)
                .filter(([key]) => key !== "id")
                .filter(([key]) => key !== "bookOutputDtos")
                .map(([key]) => (
                    <li key={key} className={"data-info-item"}>
                        <span className={"data-info-label"}>{getResponseForCase(key)}</span>
                        <input type={"text"} className={"data-info-update-value"} name={key} value={formData[key]} onChange={handleChange}/>
                    </li>
                ));
        }


        return <p>No valid data to display</p>;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/v1/authors/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            navigate('/api/v1/authors');
        } catch (e) {
            console.error(e);
            setError(e);
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <section className={"container"}>
            <article className={"plain-text-container"}>
                <h1>
                    {author && (
                        getFullname(author.firstName, author.middleName, author.lastName)
                    )}
                </h1>
                {author ? (
                    <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><a
                            href={"#!"}
                            onClick={handleGoBack}>Go back</a></span></li>

                        {renderObjectInfo()}
                        <li className={"buttons-update"}>
                            <button
                                type={"button"}
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                        </li>
                    </ul>
                ) : (
                    !loading && <p>No data available</p>
                )}

                {loading && <p>Loading...</p>}
                {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            </article>
        </section>
    );
}

export default CardView;