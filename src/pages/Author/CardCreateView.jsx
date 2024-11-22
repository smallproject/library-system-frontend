import "./Card.css"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function CardCreateView() {
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuth) {
        navigate("/signin");
        return null;
    }

    return (
        <section>
            <article>
                <h2>Create a new book</h2>
            </article>
        </section>
    );
}

export default CardCreateView;