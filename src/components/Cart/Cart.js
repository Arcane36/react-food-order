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

    const cartHasItems = cartContext.items.length > 0;

    const addMoreHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 });
    };

    const removeHandler = (id) => {
        cartContext.removeItem(id);
    };

    return (
        <div className={styles["cart"]}>
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
            <div className={styles["cart__buttons"]}>
                <Button onClick={closeCart} small={true} alt={true}>
                    Close
                </Button>
                {cartHasItems && <Button small={true}>Order</Button>}
            </div>
        </div>
    );
};

export default Cart;
