import "/src/App.css";
import {useContext, useState} from "react";
import {LanguageContext} from "../context/LanguageContext.jsx";
import content from "../content/content.json";

function Contact() {
    const {language} = useContext(LanguageContext);
    const {title, description, description2, description3} = content[language].contact;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = "Library Contact Form";
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
        const mailtoLink = `mailto:info@librarysystemtest.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        setFormData({ name: "", email: "", message: "" });

        alert("Thank you for reaching out! We'll get back to you soon.");
    };

    return (
        <section className="container py-5">
            <div className="row justify-content-center">

                <div className="col-lg-8">
                    <article className="mb-4">
                        <h1 className="mb-3 text-primary">{title}</h1>
                        <p>{description}</p>
                        <p>{description2}</p>
                        <p>{description3}</p>

                        <div className="mt-4">
                            <p><strong>Email:</strong> info@librarysystemtest.com</p>
                            <p><strong>Phone:</strong> +316-5467-4564</p>
                        </div>
                    </article>

                    <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                        <h4 className="mb-3">Send Us a Message</h4>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Your Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>


                    <div className="mt-4 mb-5">
                        <h4 className="mb-4">Our Opening Hours</h4>
                        <ul className="list-group text-start">
                            <li className="list-group-item"><strong>Monday:</strong> 9:00 AM - 6:00 PM</li>
                            <li className="list-group-item"><strong>Tuesday:</strong> 9:00 AM - 6:00 PM</li>
                            <li className="list-group-item"><strong>Wednesday:</strong> 9:00 AM - 6:00 PM</li>
                            <li className="list-group-item"><strong>Thursday:</strong> 9:00 AM - 6:00 PM</li>
                            <li className="list-group-item"><strong>Friday:</strong> 9:00 AM - 6:00 PM</li>
                            <li className="list-group-item"><strong>Saturday:</strong> 10:00 AM - 3:00 PM</li>
                            <li className="list-group-item"><strong>Sunday:</strong> Closed</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;