'use client'

import ProductCard from '@/app/components/product_card/ProductCard'
import { BACK_URL } from '@/app/VAR'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '@/app/styles/components/_feed.scss'
import QuickAuthModal from '@/app/components/ux-kit/QuickAuthModal/QuickAuthModal'
import ClientAllowModal from '@/app/components/ux-kit/ClientAllowModal/ClientAllowModal'

function Feed() {
    const [products, setProducts] = useState([])

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

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/promotions/1/products/`).then(res => {
            setProducts(res.data.products)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className='Feed'>
            <div className='list'>
                {
                    products.map((el, index) => {
                        return (
                            <ProductCard
                                name={el.name}
                                id={el.id}
                                price={el.price_with_commission}
                                rate={el.rate}
                                image={(el.color_variations[0]?.image) ? (el.color_variations[0].image) : null}
                                key={el.id}
                                color_variations={el.color_variations}
                                setAuthError={handleOpenQAModal}
                                setCAError={handleOpenCAModal}
                            />
                        )
                    })
                }
            </div>
            <QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Корзина доступна только после авторизации" />
            <ClientAllowModal open={openCAModal} handleClose={handleCLoseCAModal} isAddToCartAction={true} />
        </div>
    )
}

export default Feed