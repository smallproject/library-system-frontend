import { useState } from 'react';
import axios from "axios";

import getTodayDate from "../../helpers/getExpiryDate.js";

function ReviewForm (bookId) {
    const localId = localStorage.getItem('userId');

    const [formReviewData, setFormReviewData] = useState({
        userId: localId || null,
        bookId: bookId.bookId,
        rating: 3.0,
        reviewText: "Great book, highly recommend!",
        reviewTitle: "Fantastic Read",
        reviewDate: getTodayDate(),
        helpfulCount: 0,
        flagged: false,
        flaggedReason: null,
        responseCount: 0,
        updatedAt: new Date().toISOString(),
        userRecommendation: true,
        readStatus: "Finished",
        readDate: new Date().toISOString(),
        userLocation: "Netherlands",
        spoilerFlag: false,
        responseFromLibrarian: null,
        anonymousReview: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/userreviews",
                formReviewData);
            console.log(response);
            alert("Review is created successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to create the Review.");
        }
    };

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setFormReviewData({
            ...formReviewData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formReviewData?.userId||"anonymous"}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                    type="number"
                    step="any"
                    id="rating"
                    name="rating"
                    value={formReviewData?.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reviewTitle">Review Title</label>
                <input
                    type="text"
                    id="reviewTitle"
                    name="reviewTitle"
                    value={formReviewData?.reviewTitle}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reviewText">Review Text</label>
                <textarea
                    id="reviewText"
                    name="reviewText"
                    value={formReviewData?.reviewText}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="userLocation">Location</label>
                <input
                    type="text"
                    id="userLocation"
                    name="userLocation"
                    value={formReviewData?.userLocation}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="readStatus">Read Status</label>
                <select
                    id="readStatus"
                    name="readStatus"
                    value={formReviewData?.readStatus}
                    onChange={handleChange}
                >
                    <option value="Finished">Finished</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Want to Read">Want to Read</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="spoilerFlag">Contains Spoilers</label>
                <input
                    type="checkbox"
                    id="spoilerFlag"
                    name="spoilerFlag"
                    checked={formReviewData?.spoilerFlag}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="anonymousReview">Anonymous Review</label>
                <input
                    type="checkbox"
                    id="anonymousReview"
                    name="anonymousReview"
                    checked={formReviewData?.anonymousReview}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
