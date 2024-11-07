import { configureStore } from '@reduxjs/toolkit';
import addproductReducer from './slices/AddProductSlice';
import cartReducer from './slices/cartSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: addproductReducer,
  },
});