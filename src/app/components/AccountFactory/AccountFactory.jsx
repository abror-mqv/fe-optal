'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import AccountHeader from '../../components/account_header/AccountHeader'
import AccountProducts from '../../components/account_header/AccountProducts'
import axios from 'axios'
import { BACK_URL } from '../../VAR'
import ManufacterAllowModal from '../ux-kit/ManufacterAllowModal/ManufacterAllowModal'
import ManufacterIntroModal from '../ux-kit/ManufacterIntroModal/ManufacterIntroModal'
import Footer from '../footer/Footer'
import "@/app/box-account/components/ProductList.scss"

function AccountFactory() {
    useEffect(() => {
        localStorage.setItem("SELLER_TYPE", "FAC")

    }, [window])


    const [name, setName] = useState("Название цеха")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [products, setProducts] = useState([])
    const [firstName, setFirstName] = useState("Аброр")

    const [openMAModal, setOpenMAModal] = useState(false)
    const [openMIModal, setOpenMIModal] = useState(false)

    const [reload, setReload] = useState(false)

    const handleCloseMAModal = () => {
        // setOpenMAModal(false)
    }
    const handleCloseMIModal = () => {
        // setOpenMIModal(false)
    }


    useEffect(() => {
        if (!localStorage.getItem("TOKEN")) {
            setOpenMIModal(true)
        } else if (localStorage.getItem("USER_TYPE") == "CUSTOMER") {
            setOpenMAModal(true)
        }
    }, [])


    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            console.error("Token not found");
            return;
        }
        axios.get(`${BACK_URL}/api/factories/get-factory/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        }).then(res => {
            console.log(res)
            setName(res.data.factory_name)
            setFirstName(res.data.first_name)
            if (res.data.factory_avatar != null) {
                setImage(res.data.factory_avatar)
            }
            if (res.data.factory_description != null) {
                setDescription(res.data.factory_description)
            }
        }).catch(err => {
            console.log(err)
        });


    }, [name, reload])

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');

        if (!token) {
            console.error("Token not found");
            return;
        }
        axios.get(`${BACK_URL}/api/factories/factory/products/`, {
            headers: {
                'Authorization': `Token ${token}`, // Add the token to headers
            },
        }).then(res => {
            console.log("ERE", res)
            setProducts(res.data)
        }).catch(err => {
            console.log(err)
        });
    }, [reload])

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem("TOKEN");
            await axios.delete(`${BACK_URL}/api/factories/factory/products/${productId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setProducts(products.filter(product => product.id !== productId));
            alert("Товар успешно удален");
            reload()
            // Обновление списка товаров или редирект после удаления
        } catch (error) {
            console.error("Ошибка при удалении товара:", error);
            alert("Не удалось удалить товар");
        }
    };

    const handleReload = () => {
        setReload(!reload)
    }

    return (
        <div>
            <AccountHeader name={name} first_name={firstName} description={description} image={image} reload={handleReload} />
            <AccountProducts products={products} handleDelete={handleDelete} reload={handleReload} />
            <ManufacterAllowModal open={openMAModal} handleClose={handleCloseMAModal} />
            <ManufacterIntroModal open={openMIModal} handleClose={handleCloseMIModal} />
            <Footer />
        </div>
    )
}

export default AccountFactory