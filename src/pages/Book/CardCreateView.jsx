import "./Card.css"
import React from "react";
import getTodayDate from "../../helpers/getTodayDate.js";
import axios from "axios";

function CardCreateView() {
    const [formBook, setFormBook] = React.useState({
        title: "",
        author: "",
        summary: ""
    });

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
                        <label htmlFor="publicationdate" className={"label"}>
                            Publication Date:
                        </label>
                        <input
                            type="date"
                            id={"publicationdate"}
                            name={"publicationdate"}
                            value={formBook.publicationdate}
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
                        <label htmlFor="pagecount" className={"label"}>
                            Page Count:
                        </label>
                        <input
                            type="number"
                            id={"pagecount"}
                            name={"pagecount"}
                            value={formBook.pagecount}
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
                        <label htmlFor="coverimageurl" className={"label"}>
                            Cover Image URL:
                        </label>
                        <input
                            type="text"
                            id={"coverimageurl"}
                            name={"coverimageurl"}
                            value={formBook.coverimageurl}
                            onChange={handleChange}
                            placeholder={"Enter Cover Image URL"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="summary" className={"label"}>
                            Summary:
                        </label>
                        <textarea
                            id={"summary"}
                            name={"summary"}
                            value={formBook.summary}
                            onChange={handleChange}
                            placeholder={"Enter summary"}
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
                        <label htmlFor="copiesavailable" className={"label"}>
                            Copies Available:
                        </label>
                        <input
                            type="number"
                            id={"copiesavailable"}
                            name={"copiesavailable"}
                            value={formBook.copiesavailable}
                            onChange={handleChange}
                            placeholder={"Enter Copies Available"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="dateadded" className={"label"}>
                            Date Added:
                        </label>
                        <input
                            type="date"
                            id={"dateadded"}
                            name={"dateadded"}
                            value={formBook.dateadded || getTodayDate()}
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