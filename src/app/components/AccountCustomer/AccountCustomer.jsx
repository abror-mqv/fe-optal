'use client'

import React, { useEffect, useState } from 'react'
import '@/app/styles/components/_account_customer.scss'
import { Avatar, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Currency from './Currency';

import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import Link from 'next/link';
import BackPage from '../ui-kit/BackPage/BackPage';
import QuickAuthModal from '../ux-kit/QuickAuthModal/QuickAuthModal';
import ClientAllowModal from '../ux-kit/ClientAllowModal/ClientAllowModal';


function AccountCustomer() {
    const [phone, setPhone] = useState("")
    const [first_name, setFirstName] = useState("")
    const [orders_count, setOrdersCount] = useState(0)

    const [openQAModal, setOpenQAModal] = useState(false)
    const [openCAModal, setOpenCAModal] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("TOKEN")) {
            setOpenQAModal(true)
        } else if (localStorage.getItem("USER_TYPE") == "FACTORY") {
            setOpenCAModal(true)
        }
    }, [])

    const handleCloseQAModal = () => {
        // setOpenQAModal(false)
    }

    const handleCloseCAModal = () => {
        // setOpenCAModal(false)
    }


    useEffect(() => {
        console.log(`Token ${localStorage.getItem("TOKEN")}`)
        axios.get(`${BACK_URL}/api/customers/cart/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
    }, [])


    useEffect(() => {
        console.log(`Token ${localStorage.getItem("TOKEN")}`)
        axios.get(`${BACK_URL}/api/customers/get-user-info`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        }).then((res) => {
            console.log(res.data)
            setFirstName(res.data.first_name)
            setPhone(res.data.username)
            setOrdersCount(res.data.orders_count)
            localStorage.setItem("city", res.data.city)
        }).catch((err) => {
            console.log(err)
        });
    }, [])


    const backs = [
        {
            url: '/',
            label: 'На главную'
        }
    ]

    return (
        <div className='AccountCustomer'>

            <nav className='navigation'>

                <div className='profile'>
                    <BackPage backs={backs} />
                    <Avatar style={{
                        border: '1px solid #CD0000'
                    }} />
                    <p>
                        {first_name}
                    </p>
                </div>
                <div className='notifications'>
                    <Badge badgeContent={1} color="error">
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>
            </nav>
            <main className='options'>
                <Link href="/account-customer/orders" className='option'>
                    <p className='option_title'>
                        Текущие заказы
                    </p>
                    <p>
                        {
                            orders_count == 0 ? "(пусто)" : orders_count
                        }
                    </p>
                </Link>
                <div className='option'>
                    <p className='option_title'>
                        Избранное
                    </p>
                    <p>
                        (пусто)
                    </p>
                </div>
                <div className='option'>
                    <p className='option_title'>
                        История покупок
                    </p>
                    <p>
                        (пусто)
                    </p>
                </div>
                <Currency />
                <div className='option'>
                    <p className='option_title'>
                        Ваши отзывы
                    </p>
                    <p>
                        (пусто)

                    </p>
                </div>
                <div className='option'>
                    <p className='option_title'>
                        Написать в поддержку
                    </p>
                    <p>

                    </p>
                </div>
            </main>
            <QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Личный кабинет доступен только после авторизации" />
            <ClientAllowModal open={openCAModal} handleClose={handleCloseCAModal} isAddToCartAction={false} />
        </div>
    )
}

export default AccountCustomer