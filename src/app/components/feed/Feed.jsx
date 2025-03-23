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

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);


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
        if (!loading && hasMore) {
            console.log("LOADING PRODUCTS TRIGGERED")
            loadProducts();
        }
    }, [page]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            console.log("Requested >>>>>>>>>>>>")
            const response = await axios.get(
                `${BACK_URL}/api/factories/latest-products/?page=${page}`
            );
            setProducts(prev => [...prev, ...response.data.results]);
            console.log("PRODUCTS:  ", response)

            setHasMore(!!response.data.next);
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
        }
        setLoading(false);
    };


    const handleScroll = () => {
        console.log(123123)
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100

        ) {
            console.log("Scrolled down")
            if (!loading && hasMore) {
                setPage(prev => prev + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        console.log("LOADUNG: ", loading)
        console.log("HASMORE: ", hasMore)
        return () => window.removeEventListener('scroll', handleScroll);

    }, [loading, hasMore]);



    return (
        <div className='Feed'>
            <div className='list'>
                {products.map(el => {
                    return (
                        <>
                            <ProductCard
                                name={el.name}
                                id={el.id}
                                price={el.price_with_commission}
                                rate={el.rate}
                                color_variations={el.color_variations}
                                image={(el.color_variations[0]?.image) ? (el.color_variations[0].image) : null}
                                key={el.id}
                                setAuthError={handleOpenQAModal}
                                setCAError={handleOpenCAModal}
                            />

                        </>
                    )
                })}
            </div>
            <QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Корзина доступна только после авторизации" />
            <ClientAllowModal open={openCAModal} handleClose={handleCLoseCAModal} isAddToCartAction={true} />
        </div>
    )
}

export default Feed