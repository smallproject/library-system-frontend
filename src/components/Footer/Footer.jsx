import React from 'react';
import "./Footer.css";

function Footer(props) {
    return (
        <>
            <footer className={"footer"}>
                <div className={"footer-content"}>
                    <div className={"footer-section library-info"}>
                        <h4>Library System</h4>
                        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>

                    <div className={"footer-section contact-info"}>
                        <h4>Contact Us</h4>
                        <p>Email: info@librarysytemtest.com</p>
                        <p>Phone: +316-5467-4564</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;