import React from "react";
import MealsSummary from "./MealsDescription";

import styles from "./MealsList.module.scss";
import MealsListLitem from "./MealsListItem";

const MealsList = ({ meals }) => {
    return (
        <>
            <MealsSummary />

            <div className={styles["meals"]}>
                <ul className={styles["meals__list"]}>
                    {meals.map((meal, index) => (
                        <MealsListLitem
                            key={index}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MealsList;
