// src/redux/slices/cartSlice.js
import { BACK_URL } from '@/app/VAR';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  items: [], // Здесь будут храниться товары в корзине
};


export const saveCart = createAsyncThunk('cart/saveCart', async (cart) => {
  console.log("REquseted")
  const formattedCart = cart.map((item) => ({
      product_id: item.product_id,
      colors: item.colors.map((color) => ({
          color_id: color.id,
          quantity: color.quantity,
      })),
  }));

  const response = await axios.put(`${BACK_URL}/api/customers/cart/`, { cart: formattedCart });
  return response.data;
});


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      console.log(action.payload)
      console.log(123)
      state.items = action.payload;
      // state.total = action.payload.total;
    },
    addItem(state, action) {
      const { productId, color, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.productId === productId);

      if (existingProduct) {
        const existingColor = existingProduct.colors.find(c => c.color === color);

        if (existingColor) {
          // Обновляем количество существующей расцветки
          existingColor.quantity += quantity;
        } else {
          // Добавляем новую расцветку
          existingProduct.colors.push({ color, quantity });
        }
      } else {
        // Добавляем новый товар с первой расцветкой
        state.items.push({
          productId,
          colors: [{ color, quantity }],
        });
      }
    },
    updateItemQuantity(state, action) {
      const { productId, color, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.product_id === product_id);
      alert(123)
      if (existingProduct) {
        const existingColor = existingProduct.colors.find(c => c.id === color_id);

        if (existingColor) {
          // Обновляем количество для выбранной расцветки
          existingColor.quantity = quantity;
        }
      }
    },
    removeItem(state, action) {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
    clearCart(state) {
      state.items = [];
    },
    incrementLineQuantity(state, action) {
      const { product_id, color_id } = action.payload;
      const item = state.items.find(item => item.product_id === product_id);
      if (item) {
        const color = item.color_variations.find(color => color.id === color_id);
        console.log("COLOR ID", color)

        if (color.quantity >= 100) {
          alert("Слишком много(((")
        } else {
          color.quantity += 1;
        }

      }
    },
    decrementLineQuantity(state, action) {
      const { product_id, color_id } = action.payload;
      const item = state.items.find(item => item.product_id === product_id);
      if (item) {
        const color = item.color_variations.find(color => color.id === color_id);
        console.log("COLOR ID", color_id)

        if (color.quantity <= 0) {
          alert("Значение не может быть меньше 0")
        } else {
          color.quantity -= 1;
        }




      }
    },

  },
});

export const { testQuantity, addItem, updateItemQuantity, removeItem, clearCart, setCart, incrementLineQuantity, decrementLineQuantity } = cartSlice.actions;

export default cartSlice.reducer;