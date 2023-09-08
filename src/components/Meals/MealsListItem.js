import { MealsAddToCart } from "./MealsAddToCart";
import styles from "./MealsListItem.module.scss";

const MealsListLitem = ({ name, description, price, id }) => {
    let formatOptions = {
        style: "currency",
        currency: "CZK",
        minimumFractionDigits: 2,
    };
    const formattedPrice = new Intl.NumberFormat("cs-CZ", formatOptions);

    return (
        <li className={styles["meal-list-item"]}>
            <div>
                <h3>{name}</h3>
                <div className={styles["meal-list-item__description"]}>{description}</div>
                <div className={styles["meal-list-item__price"]}>{formattedPrice.format(price)}</div>
            </div>
            <MealsAddToCart id={id} />
        </li>
    );
};

export default MealsListLitem;
