import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {getFullname} from "../../helpers/textHelper.js";
import hasValidRole from "../../helpers/hasValidRole.js";

function Overview() {

    const [authors, setAuthors] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const roles = localStorage.getItem('roles') || [];

    useEffect(() => {
        async function fetchAuthors() {

            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                let response;
                if (token) {
                    response = await axios.get('http://localhost:8080/api/v1/authors', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                } else {
                    response = await axios.get('http://localhost:8080/api/v1/authors', {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                }

                setAuthors(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }
        fetchAuthors()
    }, []);

    return (
        <section className={"container"}>
            <article className={"overview"}>
                <div className={"button-create"}>
                    <h1>Authors</h1>
                    {hasValidRole(roles) && (
                        <button
                            type={"button"}
                            onClick={() => navigate('/api/v1/authors/create')}
                        >Create
                        </button>
                    )}
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Nationality</th>
                        <th>Date of Birth</th>
                        <th>Date of Death</th>
                        <th>Active Years</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authors.map(author => {
                        return (
                            <tr key={author.id}>
                                <td>{getFullname(author.firstName, author.middleName, author.lastName)}</td>
                                <td>{author.nationality}</td>
                                <td>{author.dateOfBirth}</td>
                                <td>{author.dateOfDeath}</td>
                                <td>{author.activeYears}</td>
                                <td>
                                    <button
                                        type={"button"}
                                        onClick={() => navigate(`/api/v1/authors/${author.id}`)}
                                    >Details
                                    </button>

                                    {hasValidRole(roles) && (
                                        <>
                                            <button
                                                type={"button"}
                                                onClick={() => navigate(`/api/v1/authors/update/${author.id}`)}
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