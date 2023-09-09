import { MealsAddToCart } from "./MealsAddToCart";
import CartContext from "../../store/cart-context";

import styles from "./MealsListItem.module.scss";
import { useContext } from "react";

const MealsListLitem = ({ name, description, price, id }) => {
    const cartContext = useContext(CartContext);

    let formatOptions = {
        style: "currency",
        currency: "CZK",
        minimumFractionDigits: 2,
    };
    const formattedPrice = new Intl.NumberFormat("cs-CZ", formatOptions);

    const onAddToCart = (amount) => {
        cartContext.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price,
        });
    };

    return (
        <li className={styles["meal-list-item"]}>
            <div>
                <h3>{name}</h3>
                <div className={styles["meal-list-item__description"]}>{description}</div>
                <div className={styles["meal-list-item__price"]}>{formattedPrice.format(price)}</div>
            </div>
            <MealsAddToCart id={id} onAddToCart={onAddToCart} />
        </li>
    );
};

export default MealsListLitem;
