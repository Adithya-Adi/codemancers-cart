import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalItems: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { _id, title, price, image } = action.payload;
      state.products.push({ productId: _id, title, price, quantity: 1, image });
      state.totalItems += 1;
      state.totalAmount += price * 1;
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const removedItem = state.products.find(item => item.productId === productId);
      if (removedItem) {
        state.totalItems -= removedItem.quantity;
        state.totalAmount -= removedItem.price * removedItem.quantity;
        state.products = state.products.filter(item => item.productId !== productId);
      }
    },
    addQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.products.find(item => item.productId === productId);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += item.price;
      }
    },
    subQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.products.find(item => item.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalAmount -= item.price;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

// Selectors
export const selectProducts = (state) => state.cart.products;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export const {
  addProduct,
  removeProduct,
  addQuantity,
  subQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
