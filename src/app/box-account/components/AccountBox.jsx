'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Header from '../../components/header/Header'
import AccountHeader from '../../components/account_header/AccountHeader'
import AccountProducts from '../../components/account_header/AccountProducts'
import axios from 'axios'
import { BACK_URL } from '../../VAR'

// import ManufacterAllowModal from '../ux-kit/ManufacterAllowModal/ManufacterAllowModal'
// import ManufacterIntroModal from '../ux-kit/ManufacterIntroModal/ManufacterIntroModal'


import Footer from '@/app/components/footer/Footer'
import AccountBoxHeader from './AccountBoxHeader'
import AccountBoxFooter from './AccountBoxFooter'
import AccountBoxProducts from './AccountBoxProducts'


function AccountBox() {
    const [name, setName] = useState("Название цеха")
    const [description, setDescription] = useState("")
    const [firstName, setFirstName] = useState("Аброр")
    const [image, setImage] = useState("")
    const [box_id, setBoxId] = useState("000000")
    const [products, setProducts] = useState([])
    const [reloadFlag, setReloadFlag] = useState(false)
    const formatNumber = (num) => num.toString().replace(/(\d{3})(\d{3})/, "$1-$2");


    const [openMAModal, setOpenMAModal] = useState(false)
    const [openMIModal, setOpenMIModal] = useState(false)

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
            setBoxId(formatNumber(res.data.supplier_id))
            if (res.data.factory_avatar != null) {
                setImage(res.data.factory_avatar)
            }
            if (res.data.factory_description != null) {
                setDescription(res.data.factory_description)
            }
        }).catch(err => {
            console.log(err)
        });


    }, [name, reloadFlag])

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
    }, [reloadFlag])

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

    const reload = useCallback(() => {
        setReloadFlag(prevReload => !prevReload);
    }, []);

    return (
        <div>
            <AccountBoxHeader name={name} description={description} image={image} reload={reload} first_name={firstName} box_id={box_id} />
            <AccountBoxProducts products={products} handleDelete={handleDelete} reload={reload} />
            <Footer />
            {/* <ManufacterAllowModal open={openMAModal} handleClose={handleCloseMAModal} />
            <ManufacterIntroModal open={openMIModal} handleClose={handleCloseMIModal} /> */}
            {/* <Footer /> */}
        </div>
    )
}

export default AccountBox