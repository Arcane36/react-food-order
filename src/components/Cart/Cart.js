import Button from "../UI/Button";
import styles from "./Cart.module.scss";

import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import Checkout from "./Checkout";

export const Cart = ({ closeCart }) => {
    const cartContext = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    let formatOptions = {
        style: "currency",
        currency: "CZK",
        minimumFractionDigits: 2,
    };
    const formattedPrice = new Intl.NumberFormat("cs-CZ", formatOptions);

    const cartHasItems = cartContext.items.length > 0;

    const addMoreHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 });
    };

    const removeHandler = (id) => {
        cartContext.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(
                "https://react-starwars-60e15-default-rtdb.firebaseio.com/food-app/orders.json",
                {
                    method: "POST",
                    body: JSON.stringify({
                        user: userData,
                        orderedItems: cartContext.items,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Upload has failed");
            }

            cartContext.clearCart();
        } catch (error) {
            console.log(error.message);
        }
        setIsSubmitting(false);
        setDidSubmit(true);
    };

    const modalContent = (
        <>
            <ul className={styles["cart__items"]}>
                {cartContext.items.map((item, index) => (
                    <li key={index}>
                        <h3 className={styles["cart__headline"]}>{item.name}</h3>
                        <div>
                            <span className={styles["cart__amount"]}>{item.amount}x </span>
                            <span className={styles["cart__price"]}>{formattedPrice.format(item.price)}</span>
                        </div>
                        <span className={styles["cart__buttons"]}>
                            <Button small={true} onClick={() => removeHandler(item.id)}>
                                -
                            </Button>
                            <Button small={true} onClick={() => addMoreHandler(item, 1)}>
                                +
                            </Button>
                        </span>
                    </li>
                ))}
            </ul>
            <div className={styles["cart__total"]}>
                <span>Total amount</span>
                <span>{formattedPrice.format(cartContext.totalAmount)}</span>
            </div>

            {isCheckout && <Checkout onConfirm={submitOrderHandler} onClose={closeCart} />}

            {!isCheckout && (
                <div className={styles["cart__buttons"]}>
                    <Button onClick={closeCart} small={true} alt={true}>
                        Close
                    </Button>
                    {cartHasItems && (
                        <Button small={true} onClick={orderHandler}>
                            Order
                        </Button>
                    )}
                </div>
            )}
        </>
    );

    const isSubmittingModalContent = <p>Submitting data...</p>;
    const didSubmitModalContent = (
        <>
            <p>Successfully sent the order!</p>
            <div className={styles["cart__buttons"]}>
                <Button onClick={closeCart} small={true} alt={true}>
                    Close
                </Button>
            </div>
        </>
    );

    return (
        <div className={styles["cart"]}>
            {!isSubmitting && !didSubmit && modalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmit && didSubmitModalContent}
        </div>
    );
};

export default Cart;
