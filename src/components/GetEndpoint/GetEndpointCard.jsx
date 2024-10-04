import "./GetEndpointCard.css"

import React, {useEffect} from 'react';
import axios from "axios";
import * as url from "node:url";

function GetEndpointCard({title, Url}) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(Url);
            setData(response.data);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        fetchData()
    }, []);

    const renderUserInfo = () => {
        if(typeof data === 'object' && data !== null && data !== undefined) {
            return Object.entries(data).map(([key, value]) => (
                <li key={key}>
                    <p>
                        <strong>{key} </strong>
                        {value}
                    </p>
                </li>
            ));
        }

        return <p>No valid data to display</p>;
    };

    return (
        <>
            <h1>{title}</h1>
            <h2>GET ENDPOINT CARD</h2>

            {/*<p>{url}</p>*/}

            {loading && <p>Loading...</p>}
            {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            {data ? (
                <ul>{renderUserInfo()}</ul>
            ) : (
                !loading && <p>No data available</p>
            )}
        </>
    );
}

export default GetEndpointCard;