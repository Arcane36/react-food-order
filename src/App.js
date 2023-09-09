import Header from "./components/Layout/Header";
import MealsList from "./components/Meals/MealsList";
import { CartContextProvider } from "./store/cart-context";

const App = () => {
    const dummy_meals = [
        {
            id: "a1",
            name: "Svíčková",
            price: 180,
            description: "Moooc dobrá svíčková",
        },
        {
            id: "a2",
            name: "Pizza",
            price: 165,
            description: "Moooc dobrá pizza",
        },
        {
            id: "a3",
            name: "Sushi",
            price: 200,
            description: "Moooc dobré sushi",
        },
    ];

    return (
        <CartContextProvider>
            <Header />
            <MealsList meals={dummy_meals} />
        </CartContextProvider>
    );
};

export default App;
