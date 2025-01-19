import React, { useEffect, useState } from 'react'
import '../../styles/components/_feed.scss';
import ProductCard from '../product_card/ProductCard';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import QuickAuthModal from '../ux-kit/QuickAuthModal/QuickAuthModal';
import ClientAllowModal from '../ux-kit/ClientAllowModal/ClientAllowModal';

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
        axios.get(`${BACK_URL}/api/factories/latest-products`).then(res => {
            setProducts(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    return (
        <div className='Feed'>
            <div className='list'>


                {products.map(el => {
                    return (
                        <ProductCard
                            name={el.name}
                            id={el.id}
                            price={el.price}
                            rate={el.rate}
                            image={(el.color_variations[0]?.image) ? (el.color_variations[0].image) : null}
                            key={el.id}
                            setAuthError={handleOpenQAModal}
                            setCAError={handleOpenCAModal}
                        />
                    )
                })}
            </div>
            <QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Корзина доступна только после авторизации" />
            <ClientAllowModal open={openCAModal} handleClose={handleCLoseCAModal} isAddToCartAction={true} />
        </div>
    )
}

export default Feed