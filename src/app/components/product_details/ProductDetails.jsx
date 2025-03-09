"use client"
import React, { useEffect, useState } from 'react'
import './_product_details.scss';
import { Avatar, Button, ButtonGroup, Chip } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Image from 'next/image';

import SwiperCore, {
    Mousewheel,
    Pagination,
    Thumbs,
    Controller,
    EffectCube,
} from "swiper";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ActionButton from '../buttons/ActionButton';
import { useParams } from 'next/navigation';

import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import Link from 'next/link';
import Footer from '../footer/Footer';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import GoToCartModal from '../ux-kit/GoToCartModal/GoToCartModal';
import QuickAuthModal from '../ux-kit/QuickAuthModal/QuickAuthModal';
import ClientAllowModal from '../ux-kit/ClientAllowModal/ClientAllowModal';
import BuyNowModal from '../ux-kit/BuyNowModal/BuyNowModal';
SwiperCore.use([Navigation, Pagination, Thumbs, Controller, EffectCube]);



function ProductDetails(props) {
    const [name, setName] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);
    const [currentSlide, setCutterntSlide] = useState(1);
    const [open1, setOpen1] = useState(false);
    const [id, setId] = useState(null)
    const [color_varisnts, setColor_variants] = useState([])
    const [colorName, setColorName] = useState("Выберите цвет")
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [goCartOpenModal, setGoCartOpenModal] = useState(false)
    const [QAModalOpen, setQAModalOpen] = useState(false)
    const [CAModalOpen, setCAModalOpen] = useState(false)
    const [BNModalOpen, setBNModalOpen] = useState(false)
    const [BNID, setBNID] = useState(0)

    const handleCloseGoCartModal = () => {
        setGoCartOpenModal(false)
    }
    const handleCloseQAModal = () => {
        setQAModalOpen(false)
    }
    const handleCloseCAModal = () => {
        setCAModalOpen(false)
    }
    const handleCloseBNModal = () => {
        setBNModalOpen(false)
    }

    const ColorRounds = color_varisnts?.map((el) => {
        return (
            <SwiperSlide key={el.id}>
                <div className="ColorRound" style={{ backgroundColor: `${el.color_code}` }}>

                </div>
            </SwiperSlide>
        )
    })
    const addToCart = async (productId, colorId = null) => {
        console.log("TOKEN: ", localStorage.getItem("TOKEN"))
        if (localStorage.getItem("TOKEN") == null) {
            setAuthError(productId)
        } else if (localStorage.getItem("USER_TYPE") == "FACTORY") {
            setCAError()
        } else {
            try {
                const payload = {
                    product_id: productId,
                    color_id: colorId,
                    quantity: 1, // Всегда добавляем 1 товар по умолчанию
                };

                const response = await axios.post(`${BACK_URL}/api/customers/cart`, payload, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("TOKEN")}`, // Убедитесь, что токен сохранён
                    },
                });

                console.log("Item added to cart:", response.data);
                setGoCartOpenModal(true)
            } catch (error) {
                console.error("Error adding to cart:", error.response?.data || error.message);
                alert("Ошибка при добавлении в корзину.");
            }
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BACK_URL}/api/factories/products/${productId}/`);
                console.log(response)
                setProduct(response.data);
                setColor_variants(response.data.color_variations)
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = (id) => {
        if (!localStorage.getItem("TOKEN")) {
            setQAModalOpen(true)
        } else if (localStorage.getItem("USER_TYPE") == "FACTORY") {
            setCAModalOpen(true)
        } else {
            addToCart(id)
        }
    }

    const handleBuyNow = (id) => {

        setBNModalOpen(true)
        setBNID(id)
    }

    // useEffect(()=>{setColor_variants()},[])


    return (
        <div className='product_details'>
            <nav className='product_nav'>
                <Link href={"/"}>
                    <Chip label="Каталог" size="small" />
                </Link>
                {">"}
                <Link href={`/category/${product?.category?.category?.id}`}>
                    <Chip label={product?.category.category.name} size="small" />
                </Link>
                {">"}
                <Link href={`/subcategory/${product?.category?.subcategory?.id}`}>
                    <Chip label={product?.category.subcategory.name} size="small" />
                </Link>
                {">"}
                <Link href={`/product/${product?.id}`}>
                    <Chip label={product?.name} size="small" />
                </Link>
            </nav>
            <main>
                <div className='Images'>
                    <Swiper onSlideChange={(swiper) => setColorName(color_varisnts[swiper.activeIndex]?.color_name)} className='Swiper__main' navigation={true} pagination={{ clickable: true }} controller={{ control: controlledSwiper }} thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}>
                        {color_varisnts.map(el => {
                            return (
                                <SwiperSlide key={el.id}>
                                    <img src={el?.image} alt="" className='Swiper__image' />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className='Details'>
                    <div className='MainDetails'>
                        <h1>
                            {product?.name}
                        </h1>
                        <div className='colors'>
                            <p className='color_text'>
                                <span>  Цвет: {colorName}</span>
                            </p>
                            <Swiper
                                id="thumbs"
                                slidesPerView={5}
                                onSwiper={setThumbsSwiper}
                                className="ThumbLine"
                                spaceBetween={1}
                            >
                                {ColorRounds}
                            </Swiper>
                        </div>
                        <div className='sizes'>
                            <p>
                                Размеры в линейке:
                            </p>
                            <div className='sizes_box'>
                                {
                                    product?.sizes?.map(
                                        el => {
                                            return (
                                                <span className='size_bullet' key={el}>
                                                    {el}
                                                </span>
                                            )
                                        }
                                    )
                                }

                            </div>
                        </div>
                        <div className='additional_info'>
                            <div className='description'>
                                <p className='description_title'>Описание:</p>
                                <p className='description_text'>{product?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='SecondaryDetails'>
                        <div className='priceandstars'>
                            {/* <div className='stars' onClick={() => {
                            console.log(color_varisnts)
                        }}>
                            <Image src='/star.svg' width={22} height={22} />
                            4.7
                        </div> */}
                            <div className='price'>
                                <p><CurrencyFormatter amount={product?.price_with_commission} /></p>
                                <span className='price_explaination'>Цена за 1 штуку</span>
                            </div>
                        </div>



                        <div className='buy'>
                            <ButtonGroup fullWidth>
                                <Button variant='contained' sx={{ backgroundColor: "#CD0000" }} onClick={() => {
                                    handleAddToCart(product.id)
                                }}>
                                    в корзину
                                </Button>
                                <Button variant='outlined' sx={{ color: "#CD0000", borderColor: "#CD0000" }} onClick={() => {
                                    handleBuyNow(product.id)
                                }}>
                                    купить сразу
                                </Button>
                            </ButtonGroup>
                            {/* <ActionButton mode="fav" className="fav" /> */}
                            {/* <ActionButton mode="cart" className="cart" /> */}
                            {/* <ActionButton mode="buy" className="buy_now" /> */}
                        </div>
                        <div className='delivery'>
                            <p>
                                Доставка действует по всем странам СНГ
                            </p>
                            <p>
                                Детали доставки уточняются в процессе оформления заказа
                            </p>
                            <p>
                                Возможна доставка пробника через СДЭК
                            </p>
                        </div>
                        <div className='factory'>
                            <div className='manufacter'>
                                <div>

                                    <Avatar
                                        alt={product?.manufacter?.factory_name}
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 24, height: 24 }}
                                    />
                                </div>
                                <p>{product?.manufacter?.factory_name}</p>
                            </div>
                            <div className='approved'>
                                <ThumbUpOffAltIcon sx={{ color: "#CD0000" }} fontSize='large' />
                                {/* <AddTaskIcon color='success' fontSize='large' /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className='Reviews'>

            </div>

            <QuickAuthModal open={QAModalOpen} handleClose={handleCloseQAModal} warningText="Извините, корзина доступна только после регистрации" />
            <ClientAllowModal open={CAModalOpen} handleClose={handleCloseCAModal} />
            <GoToCartModal open={goCartOpenModal} handleClose={handleCloseGoCartModal} />
            <BuyNowModal open={BNModalOpen} handleClose={handleCloseBNModal} id={BNID} />
            <Footer />
        </div>
    )
}

export default ProductDetails