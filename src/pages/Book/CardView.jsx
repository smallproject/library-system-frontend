import "./Card.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function CardView() {
    const {id} = useParams();
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deleteBook, setDeleteBook] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/books/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setBook(response.data);
                console.log(response.data)
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchBook()
    }, []);


    const renderObjectInfo = () => {
        if(typeof book === 'object' && book !== null && book !== undefined) {
            return Object.entries(book)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                    <li key={key} className={"data-info-item"}>
                        <span className={"data-info-label"}>{key}</span>
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
            console.log("Book deleted");
            setDeleteBook(true);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    function handleDelete() {

        const userConfirmed = confirm("Are you sure you want to delete this book?");
        if (userConfirmed) {
            deleteObject();
        }
    }

    return (
        <>
            <article className={"card"}>
                {deleteBook && <p className={"confirm-info"}>Book has been deleted</p>}
                {book ? (
                    <ul className={"data-info-list"}>
                        {!deleteBook ? (
                            <span className={"buttons"}>
                                <button
                                    onClick={() => navigate(`/api/v1/books/update/${id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </span>
                        ):(
                            <span className={"buttons"}>
                                <button onClick={() => navigate("/api/v1/books")}>
                                    Return to overview
                                </button>
                            </span>
                        )}
                        {renderObjectInfo()}
                    </ul>
                ) : (
                    !loading && <p>No data available</p>
                )}

                {loading && <p>Loading...</p>}
                {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            </article>
        </>
    );
}

export default CardView;