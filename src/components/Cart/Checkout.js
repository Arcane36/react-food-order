import { useRef, useState } from "react";
import Button from "../UI/Button";
import styles from "./Checkout.module.scss";

const isEmpty = (value) => {
    return value.trim() === "";
};

const isFiveChars = (value) => {
    return value.trim().length === 5;
};

const Checkout = ({ onClose, onConfirm }) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredStreetIsValid,
            postalCode: enteredPostalIsValid,
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity,
        });
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles["checkout"]}>
            <div
                className={`${styles["checkout__group"]} ${
                    formInputsValidity.name ? "" : styles["checkout__group--invalid"]
                } `}
            >
                <label htmlFor='name'>Your name</label>
                <input id='name' type='text' ref={nameInputRef} />
                {!formInputsValidity.name && <div>Please enter a valid name</div>}
            </div>
            <div
                className={`${styles["checkout__group"]} ${
                    formInputsValidity.street ? "" : styles["checkout__group--invalid"]
                } `}
            >
                <label htmlFor='street'>Street</label>
                <input id='street' type='text' ref={streetInputRef} />
                {!formInputsValidity.street && <div>Please enter a valid street</div>}
            </div>
            <div
                className={`${styles["checkout__group"]} ${
                    formInputsValidity.postalCode ? "" : styles["checkout__group--invalid"]
                } `}
            >
                <label htmlFor='postal'>Postal code</label>
                <input id='postal' type='text' ref={postalInputRef} />
                {!formInputsValidity.postalCode && <div>Please enter a valid postal code</div>}
            </div>
            <div
                className={`${styles["checkout__group"]} ${
                    formInputsValidity.city ? "" : styles["checkout__group--invalid"]
                } `}
            >
                <label htmlFor='city'>City</label>
                <input id='city' type='text' ref={cityInputRef} />
                {!formInputsValidity.city && <div>Please enter a valid city</div>}
            </div>
            <div className={styles["checkout__actions"]}>
                <Button alt={true} small={true} onClick={onClose}>
                    Cancel
                </Button>
                <Button button={true} small={true}>
                    Confirm
                </Button>
            </div>
        </form>
    );
};

export default Checkout;
