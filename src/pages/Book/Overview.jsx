import "./Overview.css"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Overview() {

    const [books, setBooks] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBooks() {

            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                const response = await axios.get('http://localhost:8080/api/v1/books', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
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
        <>
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
                                    <button
                                        onClick={() => navigate(`/api/v1/books/update/${book.id}`)}
                                    >Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {isLoading && <p>Loading...</p>}
                {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            </article>
        </>
    );
}

export default Overview;