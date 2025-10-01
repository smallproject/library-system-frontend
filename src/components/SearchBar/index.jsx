// SearchForm.jsx
import React from 'react';

function SearchForm({ search, searchBtn, handleChange, handleSearchNavigate }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchNavigate();
    };

    return (
        <div className="bg-light p-3 rounded shadow-sm me-1">
            <form className="d-flex me-4" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder={search}
                    name="title"
                    onChange={handleChange}
                />
                <button className="btn btn-outline-primary" type="submit">
                    {/*{searchBtn}*/}
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchForm;
