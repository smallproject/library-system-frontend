import "./Card.css"
import "../../App.css"
import React, {useContext, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

function CardView() {
    const {id} = useParams();
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({});
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {

        if (!isAuth) {
            navigate("/signin");
            return null;
        }

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

                // initialize form data with book data on fetch
                setFormData({
                    isbn: response.data?.isbn || '',
                    title: response.data?.title || '',
                    publicationDate: response.data?.publicationDate || '',
                    genre: response.data?.genre || '',
                    pageCount: response.data?.pageCount || '',
                    language: response.data?.language || '',
                    coverImageUrl: response.data?.coverImageUrl || '',
                    descriptionSummary: response.data?.descriptionSummary || '',
                    rating: response.data?.rating || '',
                    copiesAvailable: response.data?.copiesAvailable || '',
                    dateAdded: response.data?.dateAdded || '',
                    status: response.data?.status || '',
                });

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
                .map(([key]) => (
                    <li key={key} className={"data-info-item"}>
                        <span className={"data-info-label"}>{key}</span>
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
        console.log("Formdata to submit: ",formData);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8080/api/v1/books/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Updated response: ",response);
            navigate('/api/v1/books');
        } catch (e) {
            console.error(e);
            setError(e);
        }
    }

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <section className={"container"}>
            <article className={"plain-text-container"}>
            <h1>{book?.title}</h1>
                {book ? (
                    <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><a href={"#!"} onClick={handleGoBack}>Go back</a></span></li>

                        {renderObjectInfo()}
                        <li className={"buttons-update"}>
                            <button
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