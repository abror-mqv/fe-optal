'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';

import '@/app/styles/components/_category.scss'
import ProductCard from '../product_card/ProductCard';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function CategoryContent() {
    const { categoryId } = useParams();
    const [categoryName, setCategoryName] = useState("")
    const [subcats, setSubcats] = useState([])
    useEffect(() => {
        axios.get(`${BACK_URL}/api/category/${categoryId}/`).then(res => {
            console.log(res.data);
            setCategoryName(res.data.cat_name);
            setSubcats(res.data.subcategories)
        })
    }, [])
    return (
        <div className='Category'>
            <nav>
                <h1>
                    {categoryName}
                </h1>
            </nav>
            <div className='main_feed'>
                {subcats.map(subcat => {
                    return (
                        <div className='subcat' key={subcat.id}>
                            <Link href={`/subcategory/${subcat?.id}`}>
                                <h4>
                                    {subcat?.subcat_name}
                                    <NavigateNextIcon />
                                </h4>
                            </Link>

                            <div className='sub_feed'>
                                {subcat.products.map(prod => {
                                    return (
                                        <ProductCard
                                            name={prod.name}
                                            id={prod.id}
                                            price={prod.price}
                                            rate={5}
                                            image={(prod.color_variations[0]?.image) ? (prod.color_variations[0].image) : null}
                                            key={prod.id}
                                        />
                                    )
                                })}
                            </div>

                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default CategoryContent