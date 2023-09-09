import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Cart from "../Cart/Cart";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";
import headerStyles from "./Header.module.scss";
import mealImg from "../../assets/meals.jpg";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext);

    const numOfCartItems = cartContext.items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);

    const modalToggleHandler = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (cartContext.items === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartContext.items]);

    return (
        <header className={headerStyles["header"]}>
            <div className={headerStyles["header__bar"]}>
                <h1 className={headerStyles["header__headline"]}>ReactMeals</h1>
                <Button
                    badge={numOfCartItems}
                    icon={CartIcon}
                    onClick={modalToggleHandler}
                    bump={buttonIsHighlighted ? true : false}
                >
                    Your cart
                </Button>
            </div>
            <div className={headerStyles["header__image"]}>
                <img src={mealImg} alt='Food' title='Food' />
            </div>
            {isModalOpen && (
                <Modal toggleModalClose={modalToggleHandler}>
                    <Cart closeCart={modalToggleHandler} />
                </Modal>
            )}
        </header>
    );
};

export default Header;
