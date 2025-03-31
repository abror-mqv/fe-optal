import ProductCard from '@/app/components/product_card/ProductCard'
import ClientAllowModal from '@/app/components/ux-kit/ClientAllowModal/ClientAllowModal'
import QuickAuthModal from '@/app/components/ux-kit/QuickAuthModal/QuickAuthModal'
import React, { useState } from 'react'

function MatchedProductsFeed({ products }) {
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
        <div className='MatchedProducts'>
            <div className='MatchedFeed'>
                {
                    products.map((product, index) => {
                        return (
                            <ProductCard
                                name={product.name}
                                id={product.id}
                                price={product.price_with_commission}
                                rate={product.rate}
                                color_variations={product.color_variations}
                                image={(product.color_variations[0]?.image) ? (product.color_variations[0].image) : null}
                                key={product.id}
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

export default MatchedProductsFeed