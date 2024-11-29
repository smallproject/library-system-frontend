import "/src/App.css";
import {useState} from "react";

function Contact() {

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
        <section className={"container"}>
            <article className={"plain-text-container"}>
                <h1>Contact Us</h1>
                <p>If you have any questions or suggestions, feel free to reach out!</p>

                <p>Email: info@librarysystemtest.com</p>
                <p>Phone: +316-5467-4564</p>


                <br/>
                <br/>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        Send Message
                    </button>
                </form>



                <div className="opening-hours">
                    <h2>Our Opening Hours</h2>
                    <ul>
                        <li><strong>Monday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Tuesday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Wednesday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Thursday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Friday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Saturday:</strong> 10:00 AM - 3:00 PM</li>
                        <li><strong>Sunday:</strong> Closed</li>
                    </ul>
                </div>
            </article>
        </section>
    );
}

export default Contact;