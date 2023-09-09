import React, { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type === "REMOVE_ITEM") {
    } else return defaultCartState;
};

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
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

    return (
        <CartContext.Provider
            value={{
                items: cartState.items,
                totalAmount: cartState.totalAmount,
                addItem: addItemToCartHandler,
                removeItem: removeItemFromCartHandler,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
