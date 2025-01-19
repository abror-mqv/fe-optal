"use client"

import React, { useState } from 'react'
import "../../styles/components/_cartItem.scss"
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Input } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { fetchCart } from '@/app/redux/api/cartApi';

import { updateItemQuantity, incrementLineQuantity, decrementLineQuantity } from '../../redux/slices/CartSlice';
import { BACK_URL } from '@/app/VAR';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';


function CartItem(props) {
    const dispatch = useDispatch()
    const lines_total = props.data.color_variations.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
    );
    const total_cost = props.data.sizes.length * lines_total * props.data.price

    const handleDeleteCartItem = async (productId) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("TOKEN");
            try {
                const response = await axios.delete(`${BACK_URL}/api/customers/cart`, {
                    data: { product_id: productId },

                    headers: {
                        Authorization: `Token ${token}`
                    }

                });

                if (response.status === 200) {
                    fetchCart(dispatch);
                    console.log(response.data.message);
                } else {
                    console.error('Unexpected response:', response);
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error deleting item:', error.response.data);
                } else {
                    console.error('Error deleting item:', error.message);
                }
            }
        }
    };

    return (
        <div className='CartItem'>
            <div className='delete'>
                <Button variant='contained' color='error' onClick={() => handleDeleteCartItem(props.data.product_id)}>
                    <DeleteForeverIcon />
                </Button>
            </div>
            <div className='image'>
                <img src={`${BACK_URL}${props.data.color_variations[0].image}`} alt="" />


            </div>
            <div className='colors'>
                <div className='product_name'>
                    <p>
                        {props.data.name}
                    </p>
                </div>
                <div className='colors_list'>
                    {
                        props.data.color_variations.map(el => {
                            return (
                                <div className='one_color' key={el.id}>
                                    <div className='one_color_left_wing'>
                                        <div className='color_circle' style={{ backgroundColor: `${el.color_hex}` }}>

                                        </div>
                                        <p className='color_name'>
                                            {el.color_name}
                                        </p>
                                    </div>

                                    <div className='quantity'>
                                        <Button style={{ borderRadius: "20px", padding: "0px 10px", minWidth: "0px" }} variant="outlined" onClick={() => props.onDecrement(props.data.product_id, el.id)}>
                                            -
                                        </Button>
                                        <span className='quantity_text'>
                                            {el.quantity}
                                        </span>
                                        <Button style={{ borderRadius: "20px", padding: "0px 10px", minWidth: "0px" }} variant="outlined" onClick={() => props.onIncrement(props.data.product_id, el.id)}>
                                            +
                                        </Button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='sizes'>
                {/* <p className='sizes_info'>
                    Размеры в одной линейке:
                </p> */}
                <div className='sizes_count'>
                    <div className='sizes_list'>

                        {
                            props.data.sizes.map(el => {
                                return (<span className='size_bullet' key={el.id}>
                                    {el}
                                </span>)
                            })
                        }
                    </div>
                    <p className='sizes_info'>
                        Размеры в одной линейке:
                    </p>
                    <span className='count'>
                        {
                            props.data.sizes.length
                        }
                    </span>

                </div>
                <div className='divider'>

                </div>
                <div className='multiplier'>

                </div>
                <div className='one_clothe_price'>
                    <span className='sizes_info'>Цена за 1 ед. товара:</span>
                    <span>
                        <CurrencyFormatter ammount={props.data.price} />
                    </span>
                </div>
                <div className='one_clothe_price'>
                    <span className='sizes_info'>Цена за 1 линейку ({props.data.sizes.length} размера) </span>
                    <span>{
                        props.data.price * props.data.sizes.length
                    }р</span>
                </div>
                <div className='lines'>
                    <span className='sizes_info'>Кол-во линеек:</span>
                    <span>{
                        lines_total
                    } </span>

                </div>
                <div className='multiplier'>

                </div>


                <div className='total_cost'>
                    <span>
                        Итого
                    </span>
                    <span>
                        <CurrencyFormatter amount={total_cost} />
                    </span>


                </div>
            </div>
        </div>
    )
}

export default CartItem


