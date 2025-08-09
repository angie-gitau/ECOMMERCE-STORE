import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    products: [],
    quantity: 0, // number of distinct products
    email: '',
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1; // counts unique products
      }
      

      state.email = action.payload.email;
      state.total = state.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p._id === id);

      if (product) {
        product.quantity = quantity;
        if (product.quantity <= 0) {
          // remove product if quantity is 0 or less
          state.products = state.products.filter((p) => p._id !== id);
          state.quantity = state.products.length;
        }
      }

      state.total = state.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (index !== -1) {
        state.products.splice(index, 1);
        state.quantity = state.products.length;
        state.total = state.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
