import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import hasValidRole from "../../helpers/hasValidRole.js";

function Overview() {

    const [books, setBooks] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const roles = localStorage.getItem('roles') || [];
    const navigate = useNavigate();

    useEffect(() => {
         const fetchBooks = async() => {

            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                let response;
                if (token) {
                    response = await axios.get('http://localhost:8080/api/v1/books', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                } else {
                    response = await axios.get('http://localhost:8080/api/v1/books', {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                }

                setBooks(response.data);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }

        fetchBooks()
    }, []);

    return (
        <section className={"container"}>
            <article className={"overview"}>
                <div className={"button-create"}>
                    <h1>Books</h1>
                    {hasValidRole(roles) && (
                        <button
                            type={"button"}
                            onClick={() => navigate('/api/v1/books/create')}
                        >Create
                        </button>
                    )}
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Publication Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => {
                        return (
                            <tr key={book.id}>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.publicationDate}</td>
                                <td>
                                    <button
                                        type={"button"}
                                        onClick={() => navigate(`/api/v1/books/${book.id}`)}

                                    >Details
                                    </button>

                                    {hasValidRole(roles) && (
                                        <>
                                            <button
                                                type={"button"}
                                                onClick={() => navigate(`/api/v1/books/update/${book.id}`)}
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