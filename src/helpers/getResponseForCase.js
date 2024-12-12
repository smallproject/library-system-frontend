function GetResponseForCase(input) {
    switch (input) {
        case "firstName":
            return "First name";
        case "middleName":
            return "Middle name";
        case "lastName":
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

        case "isbn":
            return "ISBN";
        case "title":
            return "Title";
        case "publicationDate":
            return "Publication Date";
        case "genre":
            return "Genre";
        case "pageCount":
            return "Page Count";
        case "language":
            return "Language";
        case "coverImageUrl":
            return "Cover Image URL";
        case "descriptionSummary":
            return "Description Summary";
        case "rating":
            return "Rating";
        case "copiesAvailable":
            return "Copies Available";
        case "dateAdded":
            return "Date Added";
        case "status":
            return "Status";

        case "location":
            return "Location";
        case "condition":
            return "Condition";
        case "acquisitionMethod":
            return "Acquisition Method";
        case "supplier":
            return "Supplier";
        case "lastInventoryCheck":
            return "Last Inventory Check";
        case "borrowCount":
            return "Borrow Count";
        case "borrowedStatus":
            return "Borrowed Status";
        case "reserveStatus":
            return "Reserve Status";
        case "replacementCost":
            return "Replacement Cost";
        case "edition":
            return "Edition";
        case "publisher":
            return "Publisher";
        case "notes":
            return "Notes";
        case "barcode":
            return "Barcode";
        case "restockDate":
            return "Restock Date";
        case "timesLost":
            return "Times Lost";
        case "circulationStatus":
            return "Circulation Status";
        case "purchaseDate":
            return "Purchase Date";

        case "username":
            return "Username";
        case "password":
            return "Password";
        case "roles":
            return "Roles";
        case "name":
            return "Fullname";

        case "userId":
            return "User";
        case "bookId":
            return "Book";
        case "reservationDate":
            return "Reservation Date";
        case "expiryDate":
            return "Expiry Date";
        case "pickupLocation":
            return "Pick-up Location";
        case "reservationCode":
            return "Reservation Code";
        case "createAt":
            return "Create At";
        case "updateAt":
            return "Update At";

        case "street":
            return "Street";
        case "houseNo":
            return "House No.";
        case "postCode":
            return "Post Code";


        default:
            return "Invalid";
    }
}

export default GetResponseForCase;