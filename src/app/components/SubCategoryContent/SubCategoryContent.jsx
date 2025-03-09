'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { BACK_URL } from '@/app/VAR'
import ProductCard from '../product_card/ProductCard'

import '@/app/styles/components/_subcategory.scss'
function SubCategoryContent() {
    const { subcatId } = useParams()
    const [products, setProducts] = useState([])
    const [subCategory, setSubCategory] = useState("")
    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/subcategory/${subcatId}`).then(res => { setProducts(res.data.products); setSubCategory(res.data.subcat_name) }).catch(err => console.log(err))
    }, [])

    return (
        <div className='SubCategory'>
            <h1>
                {subCategory}
            </h1>
            <div className='feed'>
                {products.map(prod => {
                    return (
                        <ProductCard
                            name={prod.name}
                            id={prod.id}
                            price={prod.price_with_commission}
                            rate={5}
                            image={(prod.color_variations[0]?.image) ? (prod.color_variations[0].image) : null}
                            key={prod.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SubCategoryContent