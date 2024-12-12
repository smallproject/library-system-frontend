import {useContext, useState} from 'react';
import "./BookTile.css"
import formatDateToYear from "../../helpers/formatDateToYear.js";
import {Link} from "react-router-dom";
import ratingToStars from "../../helpers/ratingToStars.js";
import axios from "axios";
import {ReservationContext} from "../../context/ReservationProvider.jsx"
import getRatingColor from "../../helpers/changeRatingColor.js";
import imageSrc from './colorful-doodle-sun-clouds-and-ocean-waves-fantastic-surreal-s-2D2AH5N.jpg';

function BookTile({details}) {
    const {key, id, title, genre, isbn, descriptionsummary, publicationDate, rating, image} = details;
    const [errors, setErrors] = useState(null);
    const {addToReservation, reservationList} = useContext(ReservationContext);
    const [isDisabled, toggleIsDisabled] = useState(false);

    const handleReserve = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/books/${id}`);
            if (response) {

                const exists = reservationList.some(item => item.isbn === response.data.isbn);
                if (!exists) {
                    addToReservation(response.data);
                }
                toggleIsDisabled(true);
            } else {
                throw new Error("Book not found.")
            }
        } catch (e) {
            setErrors(e);
            console.error(e);
        }

    }

    return (<article key={key} className={"bookReview-tile"}>
        <div className={"tile-image"}>
            <img src={imageSrc || image}
                 alt="book-image"/>
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
            <span
                style={{color: getRatingColor(rating)}}
            >                    
                <p>{ratingToStars(rating)}</p>
            </span>
        </div>
        <div className={"book-status"}>
            <button type={"button"} onClick={handleReserve} disabled={isDisabled}>Reserve</button>
            <button type={"button"} disabled>Available</button>
        </div>
        {errors && <p className={"error-message"}>Something went wrong....{errors.message}</p>}
    </article>);
}

export default BookTile;