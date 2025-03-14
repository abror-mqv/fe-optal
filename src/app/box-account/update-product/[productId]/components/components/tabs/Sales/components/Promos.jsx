'use client'

import { BACK_URL } from '@/app/VAR'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OnePromo from './OnePromo'

function Promos({ productId }) {
    const [promos, setPromos] = useState([])
    const [productName, setProductName] = useState("")

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/promotions/getlist`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`
            }
        }).then(res => {
            setPromos(res.data)
            console.log("dadada", res)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/products/${productId}`).then(res => {
            console.log(res.data)
            setProductName(res.data.name)
        }).catch(err => {
            console.log(err)
        })

    }, [])


    return (
        <div className='SalesPromos'>
            <h4>
                Доступные акции:
            </h4>
            <div>
                {
                    promos.map((promo, index) => {
                        return (
                            <OnePromo key={index} promo={promo} productId={productId} productName={productName} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Promos