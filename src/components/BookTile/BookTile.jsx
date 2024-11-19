import React from 'react';
import "./BookTile.css"
import formatDateToYear from "../../helpers/formatDateToYear.js";
import {Link} from "react-router-dom";
import ratingToStars from "../../helpers/ratingToStars.js";

function BookTile({details}) {
    const {key, id, title, genre, isbn, descriptionsummary, publicationDate, rating} = details;
    // console.log("this is key ")
    // console.log(key)
    // console.log("this is book")
    return (
        <article key={key} className={"book-tile"}>
            <div className={"tile-image"}>
                <img src="src/assets/colorful-doodle-sun-clouds-and-ocean-waves-fantastic-surreal-s-2D2AH5N.jpg" alt="book-image"/>
            </div>
            <div className={"tile-details"}>
                <p><strong>{}</strong></p>
                <h2><Link to={`/api/v1/books/${id}`}>{title}</Link></h2>
                <p>{genre}</p>
                <p>{isbn}</p>
                <p>
                    {descriptionsummary}
                </p>
                <p>{formatDateToYear(publicationDate)}</p>
                <p>{ratingToStars(rating)}</p>
            </div>
            <div className={"book-status"}>
                <button>Reserve</button>
                <button>Available</button>
            </div>
        </article>
    );
}

export default BookTile;