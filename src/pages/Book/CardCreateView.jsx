import "./Card.css"
import {useState} from "react";
import getTodayDate from "../../helpers/getTodayDate.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import hasValidRole from "../../helpers/hasValidRole.js";

function CardCreateView() {
    const navigate = useNavigate();
    const roles = localStorage.getItem('role');

    const [formBook, setFormBook] = useState({
        isbn: "",
        title: "",
        publicationDate: "",
        genre: "",
        pageCount: "",
        language: "English",
        coverImageUrl: "",
        descriptionSummary: "",
        rating: "",
        copiesAvailable: "",
        dateAdded: getTodayDate(),
        status: "Available",
        author: "",
    });

    if (!hasValidRole(roles)) {
        navigate("/");
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("New Book created: ");
        console.log(formBook);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:8080/api/v1/books",
                formBook,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add the token here
                    },
                });
            console.log(response);
            alert("Book is created successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to create the book.");
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormBook({
            ...formBook,
            [name]: value
        });
    };

    return (
        <section className={"container"}>
            <article className={"container create-container"}>
                <h2 className={"header"}>Create a new book</h2>
                <form onSubmit={handleSubmit} className={"form-container"}>
                    <div className={"inputGroup"}>
                        <label htmlFor="isbn" className={"label"}>
                            ISBN:
                        </label>
                        <input
                            type="text"
                            id={"isbn"}
                            name={"isbn"}
                            value={formBook.isbn}
                            onChange={handleChange}
                            placeholder={"Enter ISBN"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="title" className={"label"}>
                            Title:
                        </label>
                        <input
                            type="text"
                            id={"title"}
                            name={"title"}
                            value={formBook.title}
                            onChange={handleChange}
                            placeholder={"Enter title"}
                            required
                            className={"input"}
                        />
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor="author" className={"label"}>
                            Author:
                        </label>
                        <input
                            type="text"
                            id={"author"}
                            name={"author"}
                            value={formBook.author}
                            onChange={handleChange}
                            placeholder={"Enter author"}
                            required
                            className={"input"}
                        />

                    </div>


                    <div className={"inputGroup"}>
                        <label htmlFor="publicationDate" className={"label"}>
                            Publication Date:
                        </label>
                        <input
                            type="date"
                            id={"publicationDate"}
                            name={"publicationDate"}
                            value={formBook.publicationDate}
                            onChange={handleChange}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="genre" className={"label"}>
                            Genre:
                        </label>
                        <input
                            type="text"
                            id={"genre"}
                            name={"genre"}
                            value={formBook.genre}
                            onChange={handleChange}
                            placeholder={"Enter genre"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="pageCount" className={"label"}>
                            Page Count:
                        </label>
                        <input
                            type="number"
                            id={"pageCount"}
                            name={"pageCount"}
                            value={formBook.pageCount}
                            onChange={handleChange}
                            placeholder={"Enter page count"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="language" className={"label"}>
                            Language:
                        </label>
                        <input
                            type="text"
                            id={"language"}
                            name={"language"}
                            value={formBook.language || "English"}
                            onChange={handleChange}
                            placeholder={"Enter language"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="coverImageUrl" className={"label"}>
                            Cover Image URL:
                        </label>
                        <input
                            type="text"
                            id={"coverImageUrl"}
                            name={"coverImageUrl"}
                            value={formBook.coverImageUrl}
                            onChange={handleChange}
                            placeholder={"Enter Cover Image URL"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="descriptionSummary" className={"label"}>
                            Description Summary:
                        </label>
                        <textarea
                            id={"descriptionSummary"}
                            name={"descriptionSummary"}
                            value={formBook.descriptionSummary}
                            onChange={handleChange}
                            placeholder={"Enter description summary"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="rating" className={"label"}>
                            Rating:
                        </label>
                        <input
                            type="number"
                            id={"rating"}
                            name={"rating"}
                            value={formBook.rating}
                            onChange={handleChange}
                            placeholder={"Enter rating"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="copiesAvailable" className={"label"}>
                            Copies Available:
                        </label>
                        <input
                            type="number"
                            id={"copiesAvailable"}
                            name={"copiesAvailable"}
                            value={formBook.copiesAvailable}
                            onChange={handleChange}
                            placeholder={"Enter Copies Available"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="dateAdded" className={"label"}>
                            Date Added:
                        </label>
                        <input
                            type="date"
                            id={"dateAdded"}
                            name={"dateAdded"}
                            value={formBook.dateAdded || getTodayDate()}
                            onChange={handleChange}
                            placeholder={"Enter Date Added"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="status" className={"label"}>
                            Status:
                        </label>
                        <input
                            type="text"
                            id={"status"}
                            name={"status"}
                            value={formBook.status || "Available"}
                            onChange={handleChange}
                            placeholder={"Enter Status"}
                            required
                            className={"input"}
                        />
                    </div>

                    <button type={"submit"}>
                        Create Book
                    </button>
                </form>
            </article>
        </section>
    );
}

export default CardCreateView;