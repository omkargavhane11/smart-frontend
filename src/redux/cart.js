import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total = Number(state.total) + Number(action.payload.price * action.payload.order_quantity);
        },
        removeProduct: (state, action) => {
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload._id), 1
            );
            state.quantity -= 1;
            state.total = Number(state.total) - Number(action.payload.price * action.payload.order_quantity);
        },
        emptyCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
})

export const { addProduct, removeProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;