import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import getResponseForCase from "../../helpers/getResponseForCase.js";

function CardView() {
    const {id} = useParams();
    const [reservation, setReservation] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({});
    const navigate = useNavigate();


    useEffect(() => {

        const fetchReservation = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/reservations/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                setReservation(response.data);

                setFormData({
                    userId: response.data?.userId || '',
                    bookId: response.data?.bookId || '',
                    reservationDate: response.data?.reservationDate || '',
                    expiryDate: response.data?.expiryDate || '',
                    status: response.data?.status || '',
                    pickupLocation: response.data?.pickupLocation || '',
                    notes: response.data?.notes || '',
                    reservationCode: response.data?.reservationCode || '',
                    createAt: response.data?.createAt || '',
                    updateAt: response.data?.updateAt || '',
                });

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
            await axios.put(`http://localhost:8080/api/v1/reservations/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            navigate('/api/v1/reservations');

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
            <article className={"plain-text-container column-detail"}>
            <h1>{reservation?.title}</h1>
                {reservation ? (
                    <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><a href={"#!"} onClick={handleGoBack}>Go back</a></span></li>

                        {renderObjectInfo()}
                        <li className={"buttons-update"}>
                            <button
                                type={"submit"}
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