import "./Card.css"
import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function CardView() {
    const {id} = useParams();
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deleteBook, setDeleteBook] = React.useState(false);
    const navigate = useNavigate();

    // Get roles from localStage and parse them
    const roles = JSON.parse(localStorage.getItem('role')) || [];

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
                } else  {
                    response = await axios.get(`http://localhost:8080/api/v1/books/${id}`);
                }
                setBook(response.data);
                // console.log(response.data)
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
                .filter(([key]) => key !== "userReviewOutputDtos")
                .filter(([key]) => key !== "inventoryOutputDtos")
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
            // console.log("Book deleted");
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
                <h1>{book?.title}</h1>
                {deleteBook && <p className={"confirm-info"}>Book has been deleted</p>}
                {book ? (
                    <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><Link to={"/api/v1/books"}>Go back</Link></span></li>

                        {(roles.includes("ROLE_ADMIN") || roles.includes("LIBRARY_STAFF")) && (
                            <span className={"buttons"}>
                            {!deleteBook ? (
                                <>
                                    <button onClick={() => navigate(`/api/v1/books/update/${id}`)}>
                                        Edit
                                    </button>
                                    <button onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => navigate("/api/v1/books")}>
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
            </article>
        </>
    );
}

export default CardView;