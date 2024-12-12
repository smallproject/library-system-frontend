import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import getResponseForCase from "../../helpers/getResponseForCase.js";
import hasValidRole from "../../helpers/hasValidRole.js";

function CardView() {
    const {id} = useParams();
    const [user, setUser] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deleteUser, setDeleteUser] = React.useState(false);
    const navigate = useNavigate();

    const roles = localStorage.getItem('roles') || [];

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                }

                setUser(response.data);
                fetchAddress(response.data?.id);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }


        const fetchAddress = async (userId) => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/addresses/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                setAddress(response.data);

            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchUser()
    }, []);


    const renderObjectInfo = () => {
        if(typeof user === 'object' && user !== null && user !== undefined) {
            return Object.entries(user)
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

    const renderAddressInfo = () => {
        if(typeof address === 'object' && address !== null && address !== undefined) {
            return Object.entries(address)
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
            await axios.delete(`http://localhost:8080/api/v1/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setDeleteUser(true);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = () => {

        const userConfirmed = confirm("Are you sure you want to delete this user?");
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
                    <img src="../../../src/assets/2289_SkVNQSBGQU1PIDEwMjgtMTE5.jpg"
                         alt="book-image"/>
                </div>
                <div className={"column-detail"}>

                    <h1>{user?.title}</h1>
                    {deleteUser && <p className={"confirm-info"}>User has been deleted</p>}
                    {user ? (
                        <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><a
                            href={"#!"}
                            onClick={handleGoBack}>Go back</a></span>
                        </li>

                            {hasValidRole(roles) && (
                            <span className={"buttons"}>
                            {!deleteUser ? (
                                <>
                                    <button type={"button"} onClick={() => navigate(`/api/v1/users/update/${id}`)}>
                                        Edit
                                    </button>
                                    <button type={"button"} onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button type={"button"} onClick={() => navigate("/api/v1/users")}>
                                    Return to overview
                                </button>
                            )}
                        </span>
                        )}

                        {renderObjectInfo()}
                        {renderAddressInfo()}
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