"use client"
import React, { useEffect, useState } from 'react'
import '../../styles/components/_product_details.scss';
import { Avatar, Button } from '@mui/material';
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
SwiperCore.use([Navigation, Pagination, Thumbs, Controller, EffectCube]);



function ProductDetails(props) {
    const [name, setName] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);
    const [currentSlide, setCutterntSlide] = useState(1);
    const [open1, setOpen1] = useState(false);
    const [id, setId] = useState(null)
    const [color_varisnts, setColor_variants] = useState([])

    const [colorName, setColorName] = useState(color_varisnts[0]?.color_name)

    const { productId } = useParams();

    const [product, setProduct] = useState(null);


    const ColorRounds = color_varisnts?.map((el) => {
        return (
            <SwiperSlide key={el.id}>
                <div className="ColorRound" style={{ backgroundColor: `${el.color_code}` }}>

                </div>
            </SwiperSlide>
        )
    })

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


    return (
        <div className='product_details'>
            <nav className='product_nav'>
                <Link href={"/"}>
                    Каталог
                </Link>
                {">"}
                <Link href={`/category/${product?.category?.category?.id}`}>
                    {product?.category.category.name}
                </Link>
                {">"}
                <Link href={`/subcategory/${product?.category?.subcategory?.id}`}>
                    {product?.category.subcategory.name}
                </Link>
                {">"}
                <Link href={`/product/${product?.id}`}>
                    {product?.name}
                </Link>
            </nav>
            <main>
                <div className='Images'>
                    <Swiper onSlideChange={(swiper) => setColorName(color_varisnts[swiper.activeIndex]?.color_name)} className='Swiper__main' navigation={true} pagination={{ clickable: true }} controller={{ control: controlledSwiper }} thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}>
                        {color_varisnts.map(el => {
                            console.log("LLLLLLL", el)
                            return (
                                <SwiperSlide key={el.id}>
                                    <img src={el?.image} alt="" className='Swiper__image' />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className='Details'>
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
                            <AddTaskIcon color='success' fontSize='large' />
                            {/* <p className='approved_info'>цех прошел нашу проверку</p> */}
                        </div>
                    </div>
                    {/* <div className='divider'>

                    </div> */}
                    <h1>
                        {product?.name}
                    </h1>
                    <div className='divider'>

                    </div>
                    <div className='priceandstars'>
                        <div className='stars'>
                            <Image src='/star.svg' width={22} height={22} />
                            4.7
                        </div>
                        <div className='price'>
                            <p>{product?.price} руб<span className='price_explaination'>/шт</span></p>
                        </div>
                    </div>

                    <div className='colors'>
                        <p className='color_text'>
                            <span>{colorName}</span>
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
                    <div className='divider'>

                    </div>
                    <div className='sizes'>
                        <p>
                            Размеры в линейке
                        </p>
                        <div className='sizes_box'>
                            {
                                product?.sizes?.split(",").map(
                                    el => {
                                        return (
                                            <span className='size_bullet' key={el}>
                                                {el}
                                            </span>
                                        )
                                    }
                                )
                            }
                            {/* {`(${product?.sizes?.split(",").length} размера в линейке)`} */}
                        </div>


                    </div>
                    <div className='buy'>
                        {/* <ActionButton mode="fav" className="fav" /> */}
                        <ActionButton mode="cart" className="cart" />
                        <ActionButton mode="buy" className="buy_now" />
                    </div>
                    <div className='additional_info'>
                        <div className='description'>
                            <p className='description_title'>Описание</p>
                            <p className='description_text'>{product?.description}</p>
                        </div>
                    </div>
                </div>
            </main>
            <div className='Reviews'>

            </div>
            <Footer />
        </div>
    )
}

export default ProductDetails