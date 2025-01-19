import React from 'react'
import OrderCard from '../../ui-kit/OrderCard/OrderCard'
import "./OneOrder.scss"
import { Chip } from '@mui/material'



function OneOrder({ data }) {
    return (
        <div className='OneOrder'>
            <div className='OrderInfo'>
                <p><span>ID заказа:</span> <Chip label={data.id} /></p>
                <p><span>Дата заказа:</span><span><Chip variant="outlined" label={data.created_at} /> <Chip label="GMT +0" /></span></p>
                <p><span>Статус заказа:</span> <Chip label={data.status} /></p>
            </div>

            <div className='productsList'>
                {
                    data.snapshot.map((el, index) => {
                        return (
                            <OrderCard key={index} el={el} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OneOrder