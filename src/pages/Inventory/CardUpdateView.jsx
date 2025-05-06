import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import getResponseForCase from "../../helpers/getResponseForCase.js";

function CardView() {
    const {id} = useParams();
    const [inventory, setInventory] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({});
    const navigate = useNavigate();


    useEffect(() => {

        const fetchInventory = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/inventories/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                setInventory(response.data);

                setFormData({
                    isbn: response.data?.isbn || '',
                    location: response.data?.location || '',
                    condition: response.data?.condition || '',
                    acquisitionMethod: response.data?.acquisitionMethod || '',
                    supplier: response.data?.supplier || '',
                    lastInventoryCheck: response.data?.lastInventoryCheck || '',
                    borrowCount: response.data?.borrowCount || '',
                    borrowedStatus: response.data?.borrowedStatus || '',
                    reserveStatus: response.data?.reserveStatus || '',
                    replacementCost: response.data?.replacementCost || '',
                    edition: response.data?.edition || '',
                    publisher: response.data?.publisher || '',
                    notes: response.data?.notes || '',
                    barcode: response.data?.barcode || '',
                    ISBN: response.data?.ISBN || '',
                    restockDate: response.data?.restockDate || '',
                    timesLost: response.data?.timesLost || '',
                    circulationStatus: response.data?.circulationStatus || '',
                    purchaseDate: response.data?.purchaseDate || '',
                });

            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchInventory()
    }, []);


    const renderObjectInfo = () => {
        if(typeof inventory === 'object' && inventory !== null && inventory !== undefined) {
            return Object.entries(inventory)
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
        console.log("Formdata to submit: ",formData);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/api/v1/inventories/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Updated response: ",response);
            navigate('/api/v1/inventories');
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
            <h1>{inventory?.title}</h1>
                {inventory ? (

                    <ul className={"data-info-list"}>
                        <li className={"data-info-item"}><span className={"link-return-overview"}><a href={"#!"} onClick={handleGoBack}>Go back</a></span></li>

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