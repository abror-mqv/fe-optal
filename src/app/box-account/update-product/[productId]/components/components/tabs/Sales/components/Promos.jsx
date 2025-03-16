'use client'

import { BACK_URL } from '@/app/VAR'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OnePromo from './OnePromo'

function Promos({ productId }) {
    const [promos, setPromos] = useState([])
    const [productName, setProductName] = useState("")
    const [reloadFlag, setReloadFlag] = useState(false)

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/promotions/getlist/${productId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`
            }
        }).then(res => {
            setPromos(res.data)
            setProductName(res.data[0].product_name)
            console.log("dadada", res)
        }).catch(err => {
            console.log(err)
        })
    }, [reloadFlag])

    const reload = () => {
        setReloadFlag(!reloadFlag)
    }


    return (
        <div className='SalesPromos'>
            <h4>
                Доступные акции:
            </h4>
            <div>
                {
                    promos.map((promo, index) => {
                        return (
                            <OnePromo key={index} promo={promo} productId={productId} productName={productName} reload={reload} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Promos