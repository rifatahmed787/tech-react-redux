/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: 0;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // Product exists in the state, decrement its quantity
        state.products[existingProductIndex].quantity =
          state.products[existingProductIndex].quantity! - 1;

        if (state.products[existingProductIndex].quantity === 0) {
          // If quantity becomes zero, remove the product from the cart
          state.products.splice(existingProductIndex, 1);
        }
      } else {
        // Product doesn't exist in the state, add it with quantity 0
        state.products.push({ ...action.payload, quantity: 0 });
      }
      state.total -= action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
