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

import { updateItemQuantity, incrementLineQuantity, decrementLineQuantity } from '@/redux/slices/CartSlice';


function CartItem(props) {

    const lines_total = props.data.colors.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
    );
    const total_cost = props.data.line_sizes.length * lines_total * props.data.price


    return (
        <div className='CartItem'>
            <div className='image'>
                <img src={props.data.image} alt="" />
            </div>
            <div className='colors'>
                <div className='product_name'>
                    <p>
                        {props.data.name}
                    </p>
                </div>
                <div className='colors_list'>
                    {
                        props.data.colors.map(el => {
                            return (
                                <div className='one_color'>
                                    <div className='color_circle' style={{ backgroundColor: `#${el.color_hex}` }}>

                                    </div>
                                    <p className='color_name'>
                                        {el.color_name}
                                    </p>
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
                                    <Divider />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='sizes'>
                <p className='sizes_info'>
                    Размеры в одной линейке
                </p>
                <div className='sizes_list'>

                    {
                        props.data.line_sizes.map(el => {
                            return (<span className='size_bullet'>
                                {el}
                            </span>)
                        })
                    }
                </div>
                <div className='multiplier'>
                    x
                </div>
                <div className='lines'>
                    <span className='sizes_info'>Кол-во линеек</span>
                    <span>{
                        lines_total
                    } </span>

                </div>
                <div className='multiplier'>
                    x
                </div>
                <div className='one_clothe_price'>
                    <span className='sizes_info'>Цена за 1 ед. товара</span>
                    <span>{
                        props.data.price
                    }р</span>
                </div>
                <div className='total_cost'>
                    {
                        total_cost
                    } руб
                    
                </div>
            </div>
        </div>
    )
}

export default CartItem


