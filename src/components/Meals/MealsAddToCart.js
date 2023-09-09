import { useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "./MealsAddToCart.module.scss";

export const MealsAddToCart = ({ id, onAddToCart }) => {
    const inputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = +inputRef.current.value;
        if (enteredAmount < 1) {
            return;
        }

        onAddToCart(enteredAmount);
    };

    return (
        <form className={styles["addToCart"]} onSubmit={submitHandler}>
            <Input id={id} label='Amount' type='number' min={0} defaultValue={1} ref={inputRef} />
            <Button button={true} small={true}>
                + Add
            </Button>
        </form>
    );
};
