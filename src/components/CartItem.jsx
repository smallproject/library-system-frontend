import {useEffect} from 'react';
import"../pages/Features/Cart.css"
import imageSource from "../assets/colorful-doodle-sun-clouds-and-ocean-waves-fantastic-surreal-s-2D2AH5N.jpg"
import getTodayDate from "../helpers/getExpiryDate.js";

function CartItem({book, onRemove, onQuantityChange}) {
    useEffect(() => {
        function setQuantity() {
            onQuantityChange(book.id, 0);
        }
        setQuantity();
    }, []);

    return (
        <article className={"cart-item"}>
            <img src={book.thumbnail|| imageSource} alt={book.title} className="book-thumbnail"/>
            <div className="book-details">
                <h4>{book.title}</h4>
                <p>{book.isbn}</p>
                <p>Author: {book.author}</p>
                <p>Reservation Date: {getTodayDate()}</p>
            </div>
            <div className="book-actions">
                <input
                    type="number"
                    min="1"
                    max="1"
                    value={book.quantity||1}
                    onChange={(e) => onQuantityChange(book.id, e.target.value)}
                    required
                />
                <button type={"button"} onClick={() => onRemove(book.id)}>Remove</button>
            </div>
        </article>
    );
}

export default CartItem;