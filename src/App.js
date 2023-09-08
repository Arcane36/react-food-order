import Header from "./components/Layout/Header";
import MealsList from "./components/Meals/MealsList";

const App = () => {
    const dummy_meals = [
        {
            name: "Svíčková",
            price: 180,
            description: "Moooc dobrá svíčková",
        },
        {
            name: "Svíčková",
            price: 180,
            description: "Moooc dobrá svíčková",
        },
        {
            name: "Svíčková",
            price: 180,
            description: "Moooc dobrá svíčková",
        },
    ];

    return (
        <>
            <Header />
            <MealsList meals={dummy_meals} />
        </>
    );
};

export default App;
