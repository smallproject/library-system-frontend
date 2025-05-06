import "./Card.css";
import "../../App.css";
import React, {useState} from "react";
import axios from "axios";

function CardCreateView() {
    const [createAuthor, setCreateAuthor] = React.useState(false);

    const [formAuthor, setFormAuthor] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        dateOfDeath: "",
        bio: "",
        website: "",
        email: "",
        awards: "",
        activeYears: "",
        profilePictureUrl: "",
        bookOutputDtos: []
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:8080/api/v1/authors",
                formAuthor,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            alert("Author is created successfully!");
            setCreateAuthor(true);
        } catch (e) {
            console.error(e);
            alert("Failed to create the author.");
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormAuthor({
            ...formAuthor,
            [name]: value
        });
    };

    return (
        <section className={"container"}>
            <article className={"plain-text-container create-container container"}>
                <h2 className={"header"}>Create a new Author</h2>
                <form onSubmit={handleSubmit} className={"form-container"}>
                    {createAuthor && <p className={"confirm-info-create"}>Author has been created</p>}
                    <div className={"inputGroup"}>
                        <label htmlFor="firstName" className={"label"}>
                            First name:
                        </label>
                        <input
                            type="text"
                            id={"firstName"}
                            name={"firstName"}
                            value={formAuthor.firstName}
                            onChange={handleChange}
                            placeholder={"Enter first name"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="middleName" className={"label"}>
                            Middle name:
                        </label>
                        <input
                            type="text"
                            id={"middleName"}
                            name={"middleName"}
                            value={formAuthor.middleName}
                            onChange={handleChange}
                            placeholder={"Enter middle name"}
                            required
                            className={"input"}
                        />
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor="lastName" className={"label"}>
                            Last name:
                        </label>
                        <input
                            type="text"
                            id={"lastName"}
                            name={"lastName"}
                            value={formAuthor.lastName}
                            onChange={handleChange}
                            placeholder={"Enter last name"}
                            required
                            className={"input"}
                        />

                    </div>


                    <div className={"inputGroup"}>
                        <label htmlFor="dateOfBirth" className={"label"}>
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id={"dateOfBirth"}
                            name={"dateOfBirth"}
                            value={formAuthor.dateOfBirth}
                            onChange={handleChange}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="nationality" className={"label"}>
                            Nationality:
                        </label>
                        <input
                            type="text"
                            id={"nationality"}
                            name={"nationality"}
                            value={formAuthor.nationality}
                            onChange={handleChange}
                            placeholder={"Enter nationality"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="dateOfDeath" className={"label"}>
                            Date of death:
                        </label>
                        <input
                            type="date"
                            id={"dateOfDeath"}
                            name={"dateOfDeath"}
                            value={formAuthor.dateOfDeath}
                            onChange={handleChange}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="bio" className={"label"}>
                            Biography:
                        </label>
                        <textarea
                            id={"bio"}
                            name={"bio"}
                            value={formAuthor.bio}
                            onChange={handleChange}
                            placeholder={"Enter biography"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="website" className={"label"}>
                            Website Url:
                        </label>
                        <input
                            type="text"
                            id={"website"}
                            name={"website"}
                            value={formAuthor.website}
                            onChange={handleChange}
                            placeholder={"Enter website URL"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="email" className={"label"}>
                            Email:
                        </label>
                        <input
                            type={"email"}
                            id={"email"}
                            name={"email"}
                            value={formAuthor.email}
                            onChange={handleChange}
                            placeholder={"Enter email address"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="awards" className={"label"}>
                            Awards:
                        </label>
                        <input
                            type="text"
                            id={"awards"}
                            name={"awards"}
                            value={formAuthor.awards}
                            onChange={handleChange}
                            placeholder={"Enter awards"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="activeYears" className={"label"}>
                            Active Years:
                        </label>
                        <input
                            type="text"
                            id={"activeYears"}
                            name={"activeYears"}
                            value={formAuthor.activeYears}
                            onChange={handleChange}
                            placeholder={"Enter active Years"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="profilePictureUrl" className={"label"}>
                            Profile Picture Url:
                        </label>
                        <input
                            type="text"
                            id={"profilePictureUrl"}
                            name={"profilePictureUrl"}
                            value={formAuthor.profilePictureUrl}
                            onChange={handleChange}
                            placeholder={"Enter profile picture Url"}
                            required
                            className={"input"}
                        />
                    </div>

                    <button type={"submit"}>
                        Create Author
                    </button>
                </form>
            </article>
        </section>
    );
}

export default CardCreateView;