import "./Card.css"
import "../../App.css"
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import getResponseForCase from "../../helpers/getResponseForCase.js";
import BookReviewTile from "../../components/BookReviewTile/BookReviewTile.jsx";
import ReviewForm from "../../components/BookReviewTile/ReviewForm.jsx";
import {ReservationContext} from "../../context/ReservationProvider.jsx";
import imageSource from "../../../src/assets/colorful-doodle-sun-clouds-and-ocean-waves-fantastic-surreal-s-2D2AH5N.jpg";
import hasValidRole from "../../helpers/hasValidRole.js";

function CardView() {
    const {id} = useParams();
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deleteBook, setDeleteBook] = React.useState(false);
    const navigate = useNavigate();
    const [bookReviews, setBookReviews] = useState(null);

    const roles = localStorage.getItem('roles') || [];
    const {addToReservation, reservationList} = useContext(ReservationContext);
    const [isDisabled, toggleIsDisabled] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/books/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                } else {
                    response = await axios.get(`http://localhost:8080/api/v1/books/${id}`);
                }
                setBook(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        const fetchReviews = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                let response;
                if (token) {
                    response = await axios.get(`http://localhost:8080/api/v1/userreviews/books/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                } else {
                    response = await axios.get(`http://localhost:8080/api/v1/userreviews/books/${id}`);
                }
                setBookReviews(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews()
        fetchBook()
    }, []);


    const renderObjectInfo = () => {
        if (typeof book === 'object' && book !== null && book !== undefined) {
            return Object.entries(book)
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
            await axios.delete(`http://localhost:8080/api/v1/books/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setDeleteBook(true);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = () => {

        const userConfirmed = confirm("Are you sure you want to delete this book?");
        if (userConfirmed) {
            deleteObject();
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    const handleReserve = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/books/${id}`);
            if (response) {

                const exists = reservationList.some(item => item.isbn === response.data.isbn);
                if (!exists) {
                    addToReservation(response.data);
                }
                toggleIsDisabled(true);
            } else {
                throw new Error("Book not found.")
            }
        } catch (e) {
            setErrors(e);
            console.error(e);
        }

    }

    return (
        <section className={"container"}>
            <article className={"plain-text-container card"}>
                <div className={"book-tile-image"}>
                    <img
                        src={imageSource}
                        alt="book-image"/>
                </div>
                <div className={"column-detail"}>

                    <h1>{book?.title}</h1>
                    {deleteBook && <p className={"confirm-info"}>Book has been deleted</p>}
                    {book ? (
                        <ul className={"data-info-list container"}>
                            <li className={"data-info-item"}><span className={"link-return-overview"}><a
                                href={"#!"}
                                onClick={handleGoBack}>Go back</a></span>
                            </li>

                            <button
                                type={"button"}
                                onClick={handleReserve}
                                disabled={isDisabled}>
                                Reserve
                            </button>
                            {hasValidRole(roles) && (
                                <span className={"buttons"}>
                            {!deleteBook ? (
                                <>
                                    <button type={"button"} onClick={() => navigate(`/api/v1/books/update/${id}`)}>
                                        Edit
                                    </button>
                                    <button type={"button"} onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button type={"button"} onClick={() => navigate("/api/v1/books")}>
                                    Return to overview
                                </button>
                            )}

                        </span>
                            )}
                            {renderObjectInfo()}

                            <br/>
                            <br/>
                            <div className={"container"}>

                                {bookReviews?.map(review => {
                                    return (
                                        <BookReviewTile
                                            key={review.id}
                                            details={review}
                                        />
                                    )
                                })}
                            </div>
                            <br/>
                            <br/>
                            <div className={"container reviews-container"}>
                                <h2>Submit a Book Review</h2>
                                <br/>
                                <ReviewForm bookId={id}/>
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