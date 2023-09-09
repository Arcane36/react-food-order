import Button from "../UI/Button";
import styles from "./Cart.module.scss";

import CartContext from "../../store/cart-context";
import { useContext } from "react";

export const Cart = ({ closeCart }) => {
    const cartContext = useContext(CartContext);

    let formatOptions = {
        style: "currency",
        currency: "CZK",
        minimumFractionDigits: 2,
    };
    const formattedPrice = new Intl.NumberFormat("cs-CZ", formatOptions);
    return (
        <div className={styles["cart"]}>
            <ul className={styles["cart__items"]}>
                {cartContext.items.map((item, index) => (
                    <li key={index}>
                        <h3 className={styles["cart__headline"]}>{item.name}</h3>
                        <span className={styles["cart__price"]}>{formattedPrice.format(item.price)}</span>
                    </li>
                ))}
            </ul>
            <div className={styles["cart__total"]}>
                <span>Total amount</span>
                <span>{formattedPrice.format(cartContext.totalAmount)}</span>
            </div>
            <div className={styles["cart__buttons"]}>
                <Button onClick={closeCart} small={true} alt={true}>
                    Close
                </Button>
                <Button small={true}>Order</Button>
            </div>
        </div>
    );
};

export default Cart;
