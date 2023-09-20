import Header from "./components/Layout/Header";
import MealsList from "./components/Meals/MealsList";
import { CartContextProvider } from "./store/cart-context";

const App = () => {
    return (
        <CartContextProvider>
            <Header />

            <MealsList />
        </CartContextProvider>
    );
};

export default App;
