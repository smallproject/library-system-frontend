import formatDateToYear from "./formatDateToYear.js";

export function sortTitle([...books]) {
    const sortedBooks = [...books].sort((previousBook, currentBook) => {
        return previousBook.title.localeCompare(currentBook.title);
    });

    return sortedBooks;
}

export function sortRating([...books]) {
    const sortedBooks = [...books].sort((previousBook, currentBook) => {
        return currentBook.rating - previousBook.rating;
    });

    return sortedBooks;
}

export function sortPublicationYear([...books]) {
    const sortedBooks = [...books].sort((previousBook, currentBook) => {
        return formatDateToYear(currentBook.publicationDate) - formatDateToYear(previousBook.publicationDate);
    });

    return sortedBooks;
}