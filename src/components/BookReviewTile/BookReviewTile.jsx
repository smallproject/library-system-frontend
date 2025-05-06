import {useState} from 'react';
import "./BookReviewTile.css"
import formatDateToYear from "../../helpers/formatDateToYear.js";
import ratingToStars from "../../helpers/ratingToStars.js";
import getRatingColor from "../../helpers/changeRatingColor.js";
import ThumbsUpDown from "../ThumbsUpDown.jsx";

function BookReviewTile({details}) {
    const {key, reviewTitle, reviewText, reviewDate, rating, userRecommendation, readStatus, spoilerFlag} = details;
    const [errors] = useState(null);

    return (
        <article key={key} className={"bookReview-tile"}>
            <div className={"tile-image"}>
                <img src="/src/assets/2289_SkVNQSBGQU1PIDEwMjgtMTE5.jpg"
                     alt="book-image"/>
            </div>
            <div className={"tile-details"}>
                <div className={"title-review"}>

                    <div>
                        <h2>{reviewTitle}</h2>
                    </div>
                    <div>
                        <span
                            style={{color: getRatingColor(rating)}}
                        >
                            <p>{ratingToStars(rating)}</p>
                        </span>
                    </div>
                </div>
                <p>
                    {reviewText}
                </p>
                <p>{formatDateToYear(reviewDate)}</p>

                <p>{readStatus}</p>
                <p>{userRecommendation}</p>
                <p>User recommendation: {ThumbsUpDown()}</p>
                <p>{spoilerFlag}</p>
            </div>
            <div className={"book-status"}>
            </div>
            {errors && <p className={"error-message"}>Something went wrong....{errors.message}</p>}
        </article>);
}

export default BookReviewTile;