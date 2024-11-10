'use client'

import React, { useEffect } from 'react'
import '../../styles/components/_cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';

import { incrementLineQuantity, decrementLineQuantity, testQuantity, setCart } from '../../redux/slices/CartSlice';
import { Button } from '@mui/material';
import ActionButton from '../buttons/ActionButton';


const products = [
  {
    product_id: 1,
    factory: "Швейпромакс",
    factory_logo: "https://bulak.kg/wp-content/uploads/2023/11/Bez-nazvaniya-1.png",
    name: "Блузка базовая DeFacto",
    description: "Lorem ipsum dolor sit amed. Lorem ipsum dolor sit amed sit amed dolor imagocos ",
    price: "350",
    image: "https://ir.ozone.ru/s3/multimedia-1-u/wc1000/7082871474.jpg",
    line_sizes: [
      38, 39, 40, 41, 41, 42, 43, 44
    ],
    colors: [
      {
        id: 1,
        color_hex: "A2D2DF",
        color_name: "Светлый синий",
        color_image: "https://basket-12.wbbasket.ru/vol1872/part187217/187217779/images/big/2.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 2,
        color_hex: "F6EFBD",
        color_name: "Пшеничный",
        color_image: "https://basket-15.wbbasket.ru/vol2383/part238377/238377705/images/big/1.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 3,
        color_hex: "E4C087",
        color_name: "Грязный",
        color_image: "https://basket-11.wbbasket.ru/vol1605/part160585/160585517/images/big/1.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 4,
        color_hex: "BC7C7C",
        color_name: "Золотой",
        color_image: "https://basket-15.wbbasket.ru/vol2383/part238378/238378566/images/big/1.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 5,
        color_hex: "789DBC",
        color_name: "Сизый",
        color_image: "https://basket-12.wbbasket.ru/vol1872/part187216/187216787/images/big/2.webp",
        in_stock: true,
        quantity: 0
      }
    ]
  },
  {
    product_id: 2,
    factory: "Швейпромакс",
    factory_logo: "https://bulak.kg/wp-content/uploads/2023/11/Bez-nazvaniya-1.png",
    name: "Блузка базовая DeFacto",
    description: "Lorem ipsum dolor sit amed. Lorem ipsum dolor sit amed sit amed dolor imagocos ",
    price: "350",
    image: "https://ir.ozone.ru/s3/multimedia-1-u/wc1000/7082871474.jpg",
    line_sizes: [
      38, 39, 40, 41, 41, 42, 43, 44
    ],
    colors: [
      {
        id: 1,
        color_hex: "A2D2DF",
        color_name: "Светлый синий",
        color_image: "https://basket-12.wbbasket.ru/vol1872/part187217/187217779/images/big/2.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 2,
        color_hex: "F6EFBD",
        color_name: "Пшеничный",
        color_image: "https://basket-15.wbbasket.ru/vol2383/part238377/238377705/images/big/1.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 3,
        color_hex: "E4C087",
        color_name: "Грязный",
        color_image: "https://basket-11.wbbasket.ru/vol1605/part160585/160585517/images/big/1.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 4,
        color_hex: "BC7C7C",
        color_name: "Золотой",
        color_image: "https://basket-15.wbbasket.ru/vol2383/part238378/238378566/images/big/1.webp",
        in_stock: true,
        quantity: 0
      },
      {
        id: 5,
        color_hex: "789DBC",
        color_name: "Сизый",
        color_image: "https://basket-12.wbbasket.ru/vol1872/part187216/187216787/images/big/2.webp",
        in_stock: true,
        quantity: 0
      }
    ]
  },
]


function Cart(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);


  const handleIncrement = (product_id, color_id) => {
    dispatch(incrementLineQuantity({ product_id, color_id }));
  };
  const handleDecrement = (product_id, color_id) => {
    dispatch(decrementLineQuantity({ product_id, color_id }));
  };



  useEffect(() => {
    const fetchCart = async () => {
      dispatch(setCart(products));
    };

    fetchCart();
  }, [dispatch]);

  const onTestQuantity = () => {
    dispatch(testQuantity())
  }

  var line_count = 0
  cart.map(el => {
    el.colors.map(el => {
      line_count = line_count + el.quantity
    })
  })

  var summary = 0
  cart.map(el => {
    var product_summary = 0
    el.colors.map(color => {
      product_summary = product_summary + (color.quantity * el.price * el.line_sizes.length)
    })
    summary = summary + product_summary
  })

  var sale_drop = summary * 0.01

  return (
    <div className='cart'>
      <div className='cart_items'>
        <div className='cart_info' onClick={() => {
          onTestQuantity()
        }}>
          Корзина
        </div>
        <div className='cart_items_list'>
          {
            cart.map(el => {

              return (
                <CartItem data={el}
                  key={el.id}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              )
            })
          }
        </div>
      </div>
      <div className='checkout'>
        <p className='chose_adress'>
          Выбрать адрес доставки
        </p>
        <p className='secondary_text'>
          <span>
            Товары ({line_count} линеек):
          </span>
          <span>
            {summary} р
          </span>
        </p>
        <p className='secondary_text'>

          <span>
            Моя скидка:
          </span>
          <span>
            {sale_drop} р
          </span>
        </p>
        <p className='summary'>

          <span>ИТОГО:</span>
          <span>{summary - sale_drop} р</span>
        </p>
        <ActionButton mode="checkout" className="checkout_button" />
      </div>
    </div>
  )
}

export default Cart