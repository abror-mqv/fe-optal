import React, { useEffect, useState } from 'react'
import '../../styles/components/_feed.scss';
import ProductCard from '../product_card/ProductCard';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';

function Feed() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${BACK_URL}/api/latest-products`).then(res => {
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
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default Feed