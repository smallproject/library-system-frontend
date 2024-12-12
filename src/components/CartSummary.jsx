import"../pages/Features/Cart.css"

function CartSummary({ totalItems, totalFees, onCheckout }) {
    return (
        <div className="cart-summary">
            <h3>Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Fees: ${totalFees.toFixed(2)}</p>
            <button type={"button"} onClick={onCheckout}>Checkout</button>
        </div>
    );
}

export default CartSummary;