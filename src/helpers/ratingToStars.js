function ratingToStars(rating, maxStars = 5) {
    if (rating < 0 || rating > maxStars) {
        throw new Error(`Rating must be between 0 and ${maxStars}`);
    }

    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Check if there’s a half star
    const emptyStars = maxStars - fullStars - halfStar; // Remaining empty stars

    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars) + (halfStar ? '½' : '');
}

export default ratingToStars;