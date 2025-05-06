import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {getFullname} from "../../helpers/textHelper.js";
import getResponseForCase from "../../helpers/getResponseForCase.js";
import BookTile from "../../components/BookTile/BookTile.jsx";
import hasValidRole from "../../helpers/hasValidRole.js";

function CardView() {
    const {id} = useParams();
    const [author, setAuthor] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deleteAuthor, setDeleteAuthor] = React.useState(false);
    const navigate = useNavigate();

    const roles = localStorage.getItem('roles') || [];

    useEffect(() => {
        const fetchAuthor = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/authors/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                } else {
                    response = await axios.get(`http://localhost:8080/api/v1/authors/${id}`);
                }
                setAuthor(response.data);

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
        if (typeof author === 'object' && author !== null && author !== undefined) {
            return Object.entries(author)
                .filter(([key]) => key !== "id")
                .filter(([key]) => key !== "bookOutputDtos")
                .map(([key, value]) => (
                    <li key={key} className={"data-info-item"}>
                        <span className={"data-info-label"}>{getResponseForCase(key)}</span>
                        <span className={"data-info-value"}>{value}</span>
                    </li>
                ));
        }

        return <p>No valid data to display</p>;
    };

    const deleteObject = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/v1/authors/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            setDeleteAuthor(true);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = () => {

        const userConfirmed = confirm("Are you sure you want to delete this author?");
        if (userConfirmed) {
            deleteObject();
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <section className={"container"}>
            <article className={"plain-text-container card"}>
                <div className={"author-tile-image"}>
                    <img
                        src="../../../src/assets/vecteezy_profile-of-a-young-man-with-dreadlocks-gazing-upwards_51947644.jpeg"
                        alt="book-image"/>
                </div>
                <div className={"column-detail"}>
                    <h1>
                        {author && (
                            getFullname(author.firstName, author.middleName, author.lastName)
                        )}
                    </h1>
                    {deleteAuthor && <p className={"confirm-info"}>Author has been deleted</p>}
                    {author ? (
                        <ul className={"data-info-list"}>
                            <li className={"data-info-item"}><span className={"link-return-overview"}><a
                                href={"#!"}
                                onClick={handleGoBack}>Go back</a></span></li>

                            {hasValidRole(roles) && (
                                <span className={"buttons"}>
                            {!deleteAuthor ? (
                                <>
                                    <button type={"button"} onClick={() => navigate(`/api/v1/authors/update/${id}`)}>
                                        Edit
                                    </button>
                                    <button type={"button"} onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button type={"button"} onClick={() => navigate("/api/v1/authors")}>
                                    Return to overview
                                </button>
                            )}
                        </span>
                            )}

                            {renderObjectInfo()}

                            <br/>
                            <br/>
                            <br/>
                            <div className={"container column-tiles"}>
                                {author.bookOutputDtos.map(entry => {
                                    return (
                                        <BookTile
                                            key={entry.id}
                                            details={entry}
                                        />
                                    )
                                })}
                            </div>
                        </ul>
                    ) : (
                        !loading && <p>No data available</p>
                    )}

                    {loading && <p>Loading...</p>}
                    {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
                </div>
            </article>
        </section>
    );
}

export default CardView;