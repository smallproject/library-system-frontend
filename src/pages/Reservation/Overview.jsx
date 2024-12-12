import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import hasValidRole from "../../helpers/hasValidRole.js";

function Overview() {

    const [reservations, setReservations] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const roles = localStorage.getItem('roles') || [];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async() => {

            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                let response;
                if (token) {
                    response = await axios.get('http://localhost:8080/api/v1/reservations', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                }

                setReservations(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }

        fetchReservations()
    }, []);

    return (
        <section className={"container"}>
            <article className={"overview"}>
                <div className={"button-create"}>
                    <h1>Reservations</h1>
                    {hasValidRole(roles) && (
                        <button
                            type={"button"}
                            onClick={() => navigate('/api/v1/reservations/create')}
                        >Create
                        </button>
                    )}
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Book</th>
                        <th>Reservation Date</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Pickup Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.map(reservation => {
                        return (
                            <tr key={reservation.id}>
                                <td>{reservation.userId}</td>
                                <td>{reservation.bookId}</td>
                                <td>{reservation.reservationDate}</td>
                                <td>{reservation.status}</td>
                                <td>{reservation.notes}</td>
                                <td>{reservation.pickupLocation}</td>
                                <td>
                                    <button
                                        type={"button"}
                                        onClick={() => navigate(`/api/v1/reservations/${reservation.id}`)}

                                    >Details
                                    </button>

                                    {hasValidRole(roles) && (
                                        <>
                                            <button
                                                type={"button"}
                                                onClick={() => navigate(`/api/v1/reservations/update/${reservation.id}`)}
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