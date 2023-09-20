import React, { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        let updatedItems;

        const addedItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        if (addedItemIndex !== -1) {
            updatedItems = state.items.map((item) => {
                if (item.id === action.item.id) {
                    return { ...item, amount: item.amount++ };
                } else {
                    return item;
                }
            });
        } else {
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type === "REMOVE_ITEM") {
        const deletedItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[deletedItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[deletedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type === "CLEAR") {
        return defaultCartState;
    } else return defaultCartState;
};

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export const CartContextProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            item: item,
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            id: id,
        });
    };

    const clearCartHandler = () => {
        dispatchCartAction({
            type: "CLEAR",
        });
    };

    return (
        <CartContext.Provider
            value={{
                items: cartState.items,
                totalAmount: cartState.totalAmount,
                addItem: addItemToCartHandler,
                removeItem: removeItemFromCartHandler,
                clearCart: clearCartHandler,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
