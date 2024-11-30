import React, {useEffect} from 'react';
import BookTile from "../../components/BookTile/BookTile.jsx";
import "../../App.css"
import "./SearchBooks.css"
import axios from "axios";
import {sortTitle, sortRating, sortPublicationYear} from "../../helpers/getSorting.js";

function SearchBooks() {
    const [books, setBooks] = React.useState(null);
    const [loading, toggleIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [sorting, setSorting] = React.useState(null);
    const [searchFilter, setSearchFilter] = React.useState(null);

    useEffect(() => {
        async function fetchBooks() {
            const token = localStorage.getItem('token');
            toggleIsLoading(true);

            try {
                let response;
                if (token) {
                    response = await axios.get('http://localhost:8080/api/v1/books/search', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                } else {
                    response = await axios.get('http://localhost:8080/api/v1/books/search', {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                }
                setBooks(response.data);
                console.log(response.data)
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                toggleIsLoading(false);
            }
        }
        fetchBooks()
    }, []);


    function handleSearch() {

    }

    const selectSorting = (e) => {
        if (e.target.value === "title") {
            console.log("title")
            setBooks(sortTitle(books))
        }

        if (e.target.value === "rating") {
            console.log("rating")
            setBooks(sortRating(books))
        }

        if (e.target.value === "publicationyear") {
            console.log("publicationyear")
            setBooks(sortPublicationYear(books))
        }

        setSorting(e.target.value)
    }
    const selectSearchFilter = (e) => {

        setSearchFilter(e.target.value)
    }
    return (
        <section className={"container search-page"}>
            <div className={"search-header"}>
                <select className={"search-option"} value={searchFilter} onChange={selectSearchFilter}>
                    <option value="all">All Items</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
                <input
                    className={"search-input"}
                    type="text"
                    placeholder={"Search on title or author"}
                    aria-label={"Search input"}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className={"search-body container"}>
                <div className={"column-filter"}>

                </div>
                <div className={"column-tiles"}>
                    <div>
                        <h3>Sort by:</h3>
                        <select className={"sorting-option"} value={sorting} onChange={selectSorting}>
                            <option value="publicationyear">Publication Year</option>
                            <option value="title">Title</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                    {books?.map(book => {
                        return (
                            <BookTile
                                key={book.id}
                                details={book}
                            />
                        )
                        })}
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error:... er is iets mis gegaan: {error.message}</p>}
            {!books && !loading && <p>No data available</p>}
        </section>
    );
}

export default SearchBooks;