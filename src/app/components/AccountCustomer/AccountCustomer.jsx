import React from 'react'
import '@/app/styles/components/_account_customer.scss'
import { Avatar, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Currency from './Currency';
function AccountCustomer() {

    return (
        <div className='AccountCustomer'>
            <nav className='navigation'>
                <div className='profile'>
                    <Avatar />
                    <p>
                        Екатерина
                    </p>
                </div>
                <div className='notifications'>
                    <Badge badgeContent={1} color="error">
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>
            </nav>
            <main className='options'>
                <div className='option'>
                    <p className='option_title'>
                        Доставки
                    </p>
                    <p>
                        (пусто)
                    </p>
                </div>
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
                        Покупки
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
        </div>
    )
}

export default AccountCustomer