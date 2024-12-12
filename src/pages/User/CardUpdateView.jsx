import "./Card.css"
import "../../App.css"
import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import getResponseForCase from "../../helpers/getResponseForCase.js";
import removeKeys from "../../helpers/removeKeys.js";

function CardView() {
    const {id} = useParams();
    const [user, setUser] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        roles: '',
        name: '',
        bio: '',
        location: '',
        email: '',
    });
    const [formAddressData, setFormAddressData] = React.useState({
        id: '',
        street: '',
        houseNo: '',
        postCode: '',
    });
    const navigate = useNavigate();


    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                setUser(response.data);

                setFormData({
                    username: response.data?.username || '',
                    password: response.data?.password || '',
                    roles: response.data?.roles || '',
                    name: response.data?.name || '',
                    bio: response.data?.bio || '',
                    location: response.data?.location || '',
                    email: response.data?.email || '',
                });

                fetchAddress(response.data?.id)
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

                setFormAddressData({
                    id: response.data?.id || '',
                    street: response.data?.street || '',
                    houseNo: response.data?.houseNo || '',
                    postCode: response.data?.postCode || '',
                });

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
        if (typeof user === 'object' && user !== null && user !== undefined) {
            return Object.entries(user)
                .filter(([key]) => key !== "id")
                .map(([key]) => (
                    <li key={key} className={"data-info-item"}>
                        <span className={"data-info-label"}>{getResponseForCase(key)}</span>
                        <input type={"text"} className={"data-info-update-value"} name={key} value={formData[key]}
                               onChange={handleChange} required/>
                    </li>
                ));
        }


        return <p>No valid data to display</p>;
    };

    const renderAddressInfo = () => {
        if (typeof address === 'object' && address !== null && address !== undefined) {
            return Object.entries(address)
                .filter(([key]) => key !== "id")
                .map(([key]) => (
                    <li key={key} className={"data-info-item"}>
                        <span className={"data-info-label"}>{getResponseForCase(key)}</span>
                        <input type={"text"} className={"data-info-update-value"} name={key}
                               value={formAddressData[key]} onChange={handleChange}/>
                    </li>
                ));
        }


        return <p>No valid data to display</p>;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setFormAddressData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        console.log(`http://localhost:8080/api/v1/users/profile/${user.username}`);
        const cleanedData = removeKeys(formData || {}, ['username', 'password', 'roles']);

        console.log(cleanedData);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/v1/users/profile/${user.username}`,
                cleanedData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            navigate('/api/v1/users');

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
                <h1>{user?.title}</h1>
                {user ? (
                    <form onSubmit={handleSubmit}>
                        <ul className={"data-info-list"}>
                            <li className={"data-info-item"}><span className={"link-return-overview"}><a href={"#!"}
                                                                                                         onClick={handleGoBack}>Go back</a></span>
                            </li>

                            {renderObjectInfo()}
                            {renderAddressInfo()}
                            <li className={"buttons-update"}>
                                <button type={"submit"}>
                                    Update
                                </button>
                            </li>
                        </ul>
                    </form>
                ) : (
                    !loading && <p>No data available</p>
                )}

            </article>
            {loading && <p>Loading...</p>}
            {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
        </section>
    );
}

export default CardView;