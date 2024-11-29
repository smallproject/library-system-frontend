import React, {useState} from 'react';
import "./RightPane.css"
import {Link} from "react-router-dom";
import hasValidRole from "../../helpers/hasValidRole.js";

function RightPane() {
    const [isOpen, setIsOpen] = useState(false);
    const userRole = JSON.parse(localStorage.getItem('role'));

    const togglePane = () => {
        setIsOpen(prevState => !prevState);
    }

    return (
        <div>
            {hasValidRole(userRole) ? (

                <button onClick={togglePane} className="toggle-button-outside">
                    {isOpen ? "Close Panel" : "Open Panel"}
                </button>
            ) : (
                <></>
            )
            }

            <div className={`right-pane ${isOpen ? 'open' : 'closed'}`}>
                <div className="pane-content">

                    <button onClick={togglePane} className="toggle-button">
                        {isOpen ? "Close Panel" : "Open Panel"}
                    </button>
                    <br/>
                    <br/>
                    <h2>Dashboard</h2>
                    <ul>
                        <li>
                            <Link to="/api/v1/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/api/v1/authors">Authors</Link>
                        </li>
                        <li>
                            <Link to="/api/v1//users">Users</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RightPane;