import {useContext, useState} from 'react';
import {ReservationContext} from "../../context/ReservationProvider.jsx";
import CartItem from "../../components/CartItem.jsx";
import CartSummary from "../../components/CartSummary.jsx";
import "./Cart.css";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import getTodayDate from "../../helpers/getTodayDate.js";
import getExpiryDate from "../../helpers/getExpiryDate.js";

function Cart() {
    const {reservationList, clearReservation} = useContext(ReservationContext)
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState(reservationList);

    const userIdLocal = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const [formReservation, setFormReservation] = useState({
        userId: userIdLocal,
        bookId: "",
        reservationDate: getTodayDate(),
        expiryDate: getExpiryDate(14),
        status: "being processed",
        pickupLocation: "Hoorn",
        notes: "pay at the cashier",
        reservationCode: "book-reserved",
        createAt: getTodayDate(),
        updateAt: getTodayDate()
    });
    const {isAuth} = useContext(AuthContext);

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, quantity) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? {...item, quantity: parseInt(quantity, 10) || 1} : item
        ));
    };

    const handleCheckout = async () => {
        if (!isAuth) {
            navigate('/signin');
            return;
        }

        if (!cartItems.length > 0) {
            alert("Cant reserve an empty cart!");
            return;
        }

        cartItems.forEach(item => {
            if (item.id) {
                formReservation.bookId = item.id;
            }
            console.log(formReservation);
            try {
                axios.post("http://localhost:8080/api/v1/reservations",
                    formReservation, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
            } catch (e) {
                console.error(e);
            }
        });


        alert("Reservation is confirmed!");
        clearReservation();
        navigate('/');
    };


    const handleClear = () => {
        localStorage.removeItem('reservation');
        clearReservation();
        navigate("/");
    }

    const totalItems = cartItems.reduce((sum, item) => sum + 1, 0);
    const totalFees = cartItems.reduce((sum, item) => sum + 1 * 10, 0);

    return (
        <section className={"container"}>
            <article className={"cart-page container"}>
                <h1>Shopping Cart</h1>
                <div className={"cart-content"}>

                    <div className={"cart-items"}>
                        {cartItems.map(book =>

                            <CartItem
                                key={book.id}
                                book={book}
                                onRemove={handleRemove}
                                onQuantityChange={handleQuantityChange}
                            />
                        )}
                        <button type={"button"} onClick={handleClear}>clear</button>
                    </div>

                    <CartSummary
                        totalItems={totalItems}
                        totalFees={totalFees}
                        onCheckout={handleCheckout}
                    />
                </div>

            </article>
        </section>
    );
}

export default Cart;