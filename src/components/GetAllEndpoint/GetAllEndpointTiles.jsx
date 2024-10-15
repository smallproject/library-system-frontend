import React, {useEffect} from 'react';
import "./GetAllEndpointTiles.css"
import axios from "axios";
import * as path from "node:path";

function GetAllEndpointTiles({title, url}) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const renderTile = () => {
        if (typeof data === 'object' && data !== null && data !== undefined) {
            return data.map((entry, index) => (
                <div key={index} className="entry-tile">
                    {/*<p>{entry.id}</p>*/}
                    {/*<p>{entry.firstName}</p>*/}
                    <ul>{renderInfoDetail(entry)}</ul>
                </div>
            ))
        }
        return <p>No valid data to display</p>
    };

    const renderInfoDetail = (entry) => {
        if (typeof entry === 'object' && entry !== null && entry !== undefined) {
            return Object.entries(entry).map(([key, value]) => (
                <li key={key}>
                    <p>
                        <strong>{key} </strong>
                        {value}
                    </p>
                </li>
            ));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            {data ? (
                <div>
                    <p>There is data</p>
                    <div className="container">
                    {renderTile()}
                    </div>
                </div>

            ) : (
                !loading && <p>No data available</p>
            )}
        </>
    );
}

export default GetAllEndpointTiles;