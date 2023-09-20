import React, { useEffect, useState } from "react";
import MealsSummary from "./MealsDescription";
import MealsListLitem from "./MealsListItem";

import styles from "./MealsList.module.scss";

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "https://react-starwars-60e15-default-rtdb.firebaseio.com/food-app/meals.json"
            );
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();
            const meals = [];

            for (const key in data) {
                meals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }

            setMeals(meals);
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setMeals(fetchData());
    }, []);

    return (
        <>
            <MealsSummary />

            {error ? (
                <p className={`${styles["meals--error"]} ${styles["meals"]}`}>{error}</p>
            ) : isLoading ? (
                <p className={`${styles["meals"]}`}>Loading...</p>
            ) : (
                <div className={styles["meals"]}>
                    {meals.length > 0 ? (
                        <ul className={styles["meals__list"]}>
                            {meals.map((meal, index) => (
                                <MealsListLitem
                                    key={index}
                                    id={meal.name + "-" + index}
                                    name={meal.name}
                                    description={meal.description}
                                    price={meal.price}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>There are no meals!</p>
                    )}
                </div>
            )}
        </>
    );
};

export default MealsList;
