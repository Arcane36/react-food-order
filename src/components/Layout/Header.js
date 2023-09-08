import Button from "../UI/Button";
import CartIcon from "../Cart/CartIcon";

import headerStyles from "./Header.module.scss";
import mealImg from "../../assets/meals.jpg";

const Header = () => {
    console.log(headerStyles);
    return (
        <header className={headerStyles["header"]}>
            <div className={headerStyles["header__bar"]}>
                <h1 className={headerStyles["header__headline"]}>ReactMeals</h1>
                <Button badge={5} icon={CartIcon}>
                    Your cart
                </Button>
            </div>
            <div className={headerStyles["header__image"]}>
                <img src={mealImg} alt='Food' title='Food' />
            </div>
        </header>
    );
};

export default Header;
