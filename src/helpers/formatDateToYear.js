function formatDateToYear(dateInput) {
    const date = new Date(dateInput); // Convert input to a Date object
    if (isNaN(date)) {
        throw new Error('Invalid date input');
    }
    return date.getFullYear().toString();
}

export default formatDateToYear;