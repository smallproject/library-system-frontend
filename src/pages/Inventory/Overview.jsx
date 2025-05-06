import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import hasValidRole from "../../helpers/hasValidRole.js";

function Overview() {

    const [inventories, setInventories] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const roles = localStorage.getItem('roles') || [];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventories = async () => {

            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                let response;
                if (token) {
                    response = await axios.get('http://localhost:8080/api/v1/inventories', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                }

                setInventories(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }

        fetchInventories()
    }, []);

    return (
        <section className={"container"}>
            <article className={"overview"}>
                <div className={"button-create"}>
                    <h1>Book Inventory</h1>
                    {hasValidRole(roles) && (
                        <button
                            type={"button"}
                            onClick={() => navigate('/api/v1/inventories/create')}
                        >Create
                        </button>
                    )}
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Condition</th>
                        <th>Borrowed Status</th>
                        <th>Reserve Status</th>
                        <th>Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventories.map(inventory => {
                        return (
                            <tr key={inventory.id}>
                                <td>{inventory.isbn}</td>
                                <td>{inventory.condition}</td>
                                <td>{inventory.borrowedStatus}</td>
                                <td>{inventory.reserveStatus}</td>
                                <td>{inventory.notes}</td>
                                <td>
                                    <button
                                        type={"button"}
                                        onClick={() => navigate(`/api/v1/inventories/${inventory.id}`)}

                                    >Details
                                    </button>

                                    {hasValidRole(roles) && (
                                        <>
                                            <button
                                                type={"button"}
                                                onClick={() => navigate(`/api/v1/inventories/update/${inventory.id}`)}
                                            >Edit
                                            </button>
                                            <button type={"button"}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {isLoading && <p>Loading...</p>}
                {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            </article>
        </section>
    );
}

export default Overview;