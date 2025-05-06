import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import hasValidRole from "../../helpers/hasValidRole.js";

function Overview() {

    const [users, setUsers] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const roles = localStorage.getItem('roles') || [];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async() => {
            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                let response;
                if (token) {
                    response = await axios.get('http://localhost:8080/api/v1/users', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                }

                setUsers(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }

        fetchUsers()
    }, []);

    return (
        <section className={"container"}>
            <article className={"overview"}>
                <div className={"button-create"}>
                    <h1>Books</h1>
                    {hasValidRole(roles) && (
                        <button
                            type={"button"}
                            onClick={() => navigate('/signup')}
                        >Register an Account
                        </button>
                    )}
                </div>
                <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Bio</th>
                        <th>Location</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.name}</td>
                                <td>{user.bio}</td>
                                <td>{user.location}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        type={"button"}
                                        onClick={() => navigate(`/api/v1/users/${user.username}`)}

                                    >Details
                                    </button>

                                    {hasValidRole(roles) && (
                                        <>
                                            <button
                                                type={"button"}
                                                onClick={() => navigate(`/api/v1/users/update/${user.username}`)}
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