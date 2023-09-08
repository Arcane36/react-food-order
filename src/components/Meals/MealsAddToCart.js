import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./MealsAddToCart.module.scss";

export const MealsAddToCart = ({ id, onSubmit }) => {
    return (
        <form className={styles["addToCart"]} onSubmit={onSubmit}>
            <Input id={id} label='Amount' type='number' min={0} defaultValue={1} />
            <Button type='submit' small={true}>
                + Add
            </Button>
        </form>
    );
};
