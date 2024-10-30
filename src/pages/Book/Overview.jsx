import "./Overview.css"
import {useEffect, useState} from 'react';
import axios from "axios";

function Overview() {

    const [books, setBooks] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchBooks() {

            const token = localStorage.getItem('token');

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
            }
        }
        fetchBooks()
    }, []);

    return (
        <>
            <article className={"overview container"}>
                <table>
                    <thead>
                    <button>Create</button>
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
                                    <button>Details</button>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </article>
        </>
    );
}

export default Overview;