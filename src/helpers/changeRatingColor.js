function getRatingColor(rating) {
    if (rating >= 3 && rating <= 5) {
        return 'green';
    } else if (rating < 3) {
        return 'red';
    }
    return 'black';
}

export default getRatingColor;