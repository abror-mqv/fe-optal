'use client'

import React, { useState } from 'react'
import './BoxContent.scss'
import BoxProductCard from './BoxProductCard'
import { Avatar } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Link from 'next/link';
import QuickAuthModal from '@/app/components/ux-kit/QuickAuthModal/QuickAuthModal';
import ClientAllowModal from '@/app/components/ux-kit/ClientAllowModal/ClientAllowModal';
import Razdel from './Razdel'

function BoxContent({ data, box_name, box_description, box_avatar, supplier_id }) {
    const [openQAModal, setOpenQAModal] = useState(false)
    const [openCAModal, setOpenCAModal] = useState(false)


    const handleCLoseCAModal = () => {
        setOpenCAModal(false)
    }
    const handleCloseQAModal = () => {
        setOpenQAModal(false)
    }
    const handleOpenQAModal = (id) => {
        setOpenQAModal(true)
        console.log("toggled QA MODAL")
        localStorage.setItem("PRODUCT_ADD_TO_CART_ID", id),
            localStorage.setItem("BEFORE_REGISTRATION_PAGE", window.location.href)
    }
    const handleOpenCAModal = () => {
        setOpenCAModal(true)
    }
    return (
        <div className='Category'>
            <Link href={`/box/${supplier_id}`} className='BoxInfo'>
                <div className='topInfo'>
                    <div className='profile_picture'>
                        <img src={box_avatar} alt="" />


                    </div>
                    <h1>

                        {box_name}
                    </h1>
                </div>
                <div className='bottomInfo'>
                    <p>
                        {box_description}
                    </p>
                </div>
            </Link>

            <div className='main_feed'>

                {
                    data.map((razdel, index) => {
                        return (
                            <Razdel key={index} razdel={razdel} handleOpenQAModal={handleOpenQAModal} setCAError={handleOpenCAModal} />
                        )
                    })
                }






            </div>

            <QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Корзина доступна только после авторизации" />
            <ClientAllowModal open={openCAModal} handleClose={handleCLoseCAModal} isAddToCartAction={true} />
        </div>
    )
}

export default BoxContent