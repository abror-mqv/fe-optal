import axios from 'axios';
// import { setCart } from '../redux/cartSlice'; // Импортируйте действие из слайса корзины
import { setCart } from '../slices/CartSlice';
import { BACK_URL } from '@/app/VAR';


export const fetchCart = async (dispatch) => {
  try {
    const token = localStorage.getItem('TOKEN'); // Получаем токен из localStorage
    if (!token) {
      console.error("Пользователь не авторизован");
      return;
    }

    const response = await axios.get(`${BACK_URL}/api/customers/cart/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const cartData = response.data;
    console.log("CART HERE:  ", cartData)
    dispatch(setCart(cartData));
    console.log("Корзина успешно загружена:", cartData);
  } catch (error) {
    console.error("Ошибка при загрузке корзины:", error);
  }
};



