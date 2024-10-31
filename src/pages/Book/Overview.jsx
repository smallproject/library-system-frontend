import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Overview() {

    const [books, setBooks] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // Get roles from localStage and parse them
    const roles = JSON.parse(localStorage.getItem('role')) || [];

    useEffect(() => {
        async function fetchBooks() {

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

                console.log(response);
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
        <section>
            <article className={"overview container"}>
                <table>
                    <thead>
                    <button
                        onClick={() => navigate('/api/v1/books/create')}
                    >Create</button>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => {
                        return (
                            <tr key={book.id}>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/api/v1/books/${book.id}`)}

                                    >Details
                                    </button>

                                    {(roles.includes("ROLE_ADMIN") || roles.includes("LIBRARY_STAFF")) && (
                                        <>
                                            <button
                                                onClick={() => navigate(`/api/v1/books/update/${book.id}`)}
                                            >Edit</button>
                                            <button>Delete</button>
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