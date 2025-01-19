'use client'
import React, { useEffect, useState } from 'react'
import './Orders.scss'
import axios from 'axios'
import { BACK_URL } from '@/app/VAR'
import OrderCard from '../../ui-kit/OrderCard/OrderCard'
import OneOrder from './OneOrder'
import BackPage from '../../ui-kit/BackPage/BackPage'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


function Orders() {
    const [data, setData] = useState([])
    const [meta, setMeta] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            alert("Пользователь не авторизован");
            return;
        }
        axios.get(`${BACK_URL}/api/customers/orders/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data.orders)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const backs = [
        {
            url: '/account-customer',
            label: 'Личный кабинет'
        }
    ]

    return (
        <div className='OrdersPage'>
            <BackPage backs={backs} />
            <div className='InfoBlock'>
                <h1>Ваши активные заказы</h1>
            </div>
            <div className='List'>
                {
                    data.map((order, index) => {
                        return (
                            <p key={index}>
                                <OneOrder data={order} />
                            </p>
                        )
                    })
                }
                {data.length === 0 && <div className='EmptyList'>У вас пока нет заказов</div>}
            </div>
        </div>
    )
}

export default Orders