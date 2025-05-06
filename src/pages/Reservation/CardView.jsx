import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import getResponseForCase from "../../helpers/getResponseForCase.js";
import imageSource from "../../../src/assets/colorful-doodle-sun-clouds-and-ocean-waves-fantastic-surreal-s-2D2AH5N.jpg";
import hasValidRole from "../../helpers/hasValidRole.js";

function CardView() {
    const {id} = useParams();
    const [reservation, setReservation] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deleteReservation, setDeleteReservation] = React.useState(false);
    const navigate = useNavigate();

    const roles = localStorage.getItem('roles') || [];

    useEffect(() => {
        const fetchReservation = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/reservations/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                }
                setReservation(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchReservation()
    }, []);


    const renderObjectInfo = () => {
        if(typeof reservation === 'object' && reservation !== null && reservation !== undefined) {
            return Object.entries(reservation)
                .filter(([key]) => key !== "id")
                .filter(([key]) => key !== "userReviewOutputDtos")
                .filter(([key]) => key !== "inventoryOutputDtos")
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
            await axios.delete(`http://localhost:8080/api/v1/reservations/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setDeleteReservation(true);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = () => {

        const userConfirmed = confirm("Are you sure you want to delete this reservation?");
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
                <div className={"book-tile-image"}>
                    <img src={imageSource}
                         alt="book-image"/>
                </div>
                <div className={"column-detail"}>

                    <h1>{reservation?.title}</h1>
                    {deleteReservation && <p className={"confirm-info"}>Inventory has been deleted</p>}
                    {reservation ? (
                        <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><a
                            href={"#!"}
                            onClick={handleGoBack}>Go back</a></span>
                        </li>

                            {hasValidRole(roles) && (
                            <span className={"buttons"}>
                            {!deleteReservation ? (
                                <>
                                    <button type={"button"} onClick={() => navigate(`/api/v1/reservations/update/${id}`)}>
                                        Edit
                                    </button>
                                    <button type={"button"} onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button type={"button"} onClick={() => navigate("/api/v1/reservations")}>
                                    Return to overview
                                </button>
                            )}
                        </span>
                        )}

                        {renderObjectInfo()}
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