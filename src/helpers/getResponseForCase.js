function GetResponseForCase(input) {
    switch (input) {
        // author
        case "firstName":
            return "First name";
        case "middleName":
            return "Middle name";
        case "lastname":
            return "Last name";
        case "dateOfBirth":
            return "Date of Birth";
        case "nationality":
            return "Nationality";
        case "dateOfDeath":
            return "Date of Death";
        case "bio":
            return "Bio"
        case "website":
            return "Website";
        case "email":
            return "Email";
        case "awards":
            return "Awards";
        case "activeYears":
            return "Active Years";
        case "profilePictureUrl":
            return "Profile Picture Url";

        //     books
        case "isbn":
            return "ISBN";
        case "title":
            return "Title";
        case "publicationDate":
            return "Publication Date";
        case "genre":
            return "Genre";
        case "pagecount":
            return "Page Count";
        case "language":
            return "Language";
        case "coverImageUrl":
            return "Cover Image URL";
        case "descriptionsummary":
            return "Description Summary";
        case "rating":
            return "Rating";
        case "copiesAvailable":
            return "Copies Available";
        case "dateAdded":
            return "Date Added";
        case "status":
            return "Status";


        default:
            return "Invalid";
    }
}

export default GetResponseForCase;