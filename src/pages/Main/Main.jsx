import React from 'react';
import "./main.css"

function Main() {
    return (
        <section className={"container"}>
            <article className="container home-container">
                <h1>Welcome to the Library System</h1>
                <p>Explore, borrow, and manage books easily with our online platform.</p>
                <div className="home-actions">
                    <button className="home-button" onClick={() => (window.location.href = "/about")}>
                        Learn More
                    </button>
                    <button className="home-button" onClick={() => (window.location.href = "/contact")}>
                        Contact Us
                    </button>
                </div>
            </article>
        </section>
    );
}

export default Main;