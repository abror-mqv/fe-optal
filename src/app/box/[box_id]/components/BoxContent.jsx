'use client'

import React, { useState } from 'react'
import './BoxContent.scss'
import BoxProductCard from './BoxProductCard'
import { Avatar } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Link from 'next/link';
import QuickAuthModal from '@/app/components/ux-kit/QuickAuthModal/QuickAuthModal';
import ClientAllowModal from '@/app/components/ux-kit/ClientAllowModal/ClientAllowModal';

function BoxContent({ data, box_name, box_description, supplier_id }) {
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
        localStorage.setItem("PRODUCT_ADD_TO_CART_ID", id)
    }
    const handleOpenCAModal = () => {
        setOpenCAModal(true)
    }
    return (
        <div className='Category'>
            <Link href={`/box/${supplier_id}`} className='BoxInfo'>
                <div className='topInfo'>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{box_name[0]}</Avatar>
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
                <div className='sub_feed'>
                    {data.map((el, index) => {
                        return (
                            <BoxProductCard
                                name={el.name}
                                id={el.id}
                                price={el.price}
                                rate={5}
                                image={(el.color_variations[0]?.image) ? (el.color_variations[0].image) : null}
                                key={index}
                                setAuthError={handleOpenQAModal}
                            />
                        )
                    })}
                </div>
            </div>

            <QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Корзина доступна только после авторизации" />
            <ClientAllowModal open={openCAModal} handleClose={handleCLoseCAModal} isAddToCartAction={true} />
        </div>
    )
}

export default BoxContent