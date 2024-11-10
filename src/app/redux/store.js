import { configureStore } from '@reduxjs/toolkit';
import addproductReducer from './slices/AddProductSlice';
import cartReducer from '../redux/slices/CartSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: addproductReducer,
  },

})