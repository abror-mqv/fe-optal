'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import AccountHeader from '../components/account_header/AccountHeader'
import AccountProducts from '../components/account_header/AccountProducts'
import axios from 'axios'
import { BACK_URL } from '../VAR'


function page() {
    const [name, setName] = useState("Название цеха")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [products, setProducts] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('TOKEN');

        if (!token) {
            console.error("Token not found");
            return;
        }
        axios.get(`${BACK_URL}/api/get-factory/`, {
            headers: {
                'Authorization': `Token ${token}`, // Add the token to headers
            },
        }).then(res => {
            console.log(res)
            setName(res.data.factory_name)
            if (res.data.factory_description != null) {
                setDescription(res.data.factory_description)
            }
            // setImage place an image here later
        }).catch(err => {
            console.log(err)
        });


    }, [name])

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');

        if (!token) {
            console.error("Token not found");
            return;
        }
        axios.get(`${BACK_URL}/api/factory/products/`, {
            headers: {
                'Authorization': `Token ${token}`, // Add the token to headers
            },
        }).then(res => {
            console.log("ERE", res)
            setProducts(res.data)
        }).catch(err => {
            console.log(err)
        });
    }, [])


    return (
        <div>
            <AccountHeader name={name} description={description} image={image} />
            <AccountProducts products={products} />
        </div>
    )
}

export default page