'use client'

import { useEffect, useState } from 'react'

import { Button, IconButton, Tooltip } from '@mui/material'
import './CheckOut.scss'

import { BACK_URL } from '@/app/VAR'
import axios from 'axios'

import ProductToCheckOut from './ProductToCheckOut'
import Questions from './Questions'


import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ChangeUserCityModal from './ChangeUserCityModal'
import ChangeUserPhoneModal from './ChangeUserPhoneModal'
import ChangeUserFirstNameModal from './ChangeUserFirstNameModal'
import Link from 'next/link'
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter'
import { InfoOutlined } from '@mui/icons-material'
import AreYouSureModal from './AreYouSureModal'
import GotYouModal from './GotYouModal'
import { postConfirmOrder } from '@/app/util/postConfirmOrder'

function CheckOut() {
    const [data, setData] = useState()
    const [userData, setUserData] = useState()
    const [updateTrigger, setUpdateTrigger] = useState(true)
    const [openCityModal, setOpenCityModal] = useState(false)
    const [openPhoneModal, setOpenPhoneModal] = useState(false)
    const [openNameModal, setOpenNameModal] = useState(false)
    const [openAreYouSureModal, setOpenAreYouSureModal] = useState(false)
    const [openGotYouModal, setOpenGotYouModal] = useState(false)

    const handleCheckout = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('TOKEN');
            if (!token) {
                console.error("Пользователь не авторизован");
                return;
            }
            axios.get(`${BACK_URL}/api/customers/cart/checkout`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            }).then(res => {
                console.log("CHECKOUT RES: ", res.data)
                setData(res.data)
            }).catch(err => {
                console.log("CHECKOUT ERROR: ", err)
            })
        }
    }

    const getUserData = () => {

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('TOKEN');
            if (!token) {
                console.error("Пользователь не авторизован");
                return;
            }
            axios.get(`${BACK_URL}/api/customers/get-user-info`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            }).then(res => {
                console.log("USER DATA RES: ", res.data)
                setUserData(res.data)
                localStorage.setItem("city", res.data.city)
                setUpdateTrigger(false)

            }).catch(err => {
                console.log("USER DATA ERROR: ", err)
                setUpdateTrigger(false)

            })
        }


    }


    useEffect(() => {
        handleCheckout();
    }, [])
    useEffect(() => { getUserData(); console.log("UPDATIGN") }, [updateTrigger])



    const handleOpenCityModal = () => {
        setOpenCityModal(true)
        console.log("Открыть модалку с выбором города")
    }
    const handleOpenPhoneModal = () => {
        setOpenPhoneModal(true)
        console.log("wefr")
    }
    const handleOpenNameModal = () => {
        setOpenNameModal(true)
    }
    const handleOpenAreYouSureModal = () => {
        setOpenAreYouSureModal(true)
    }
    const handleOpenGotYouModal = () => {
        setOpenAreYouSureModal(false)
        setOpenGotYouModal(true)
        postConfirmOrder(data)
        // axios request to make an order
    }
    const handleCloseGotYouModal = () => {

        setOpenGotYouModal(false)
    }

    return (
        <div className='CheckOutPage'>
            <div className='intro'>
                <Questions />
                <div className='welcome'>
                    <h2>
                        Итоговый список вашего заказа:
                    </h2>
                </div>
            </div>
            <div className="checkout">
                {
                    data?.map((el, index) => {
                        return (
                            <ProductToCheckOut key={index} el={el} />
                        )
                    })
                }
                <div className="info">
                    <div className="half">
                        <p className='total'>
                            Предварительный итог:
                            <span className='total'>
                                <CurrencyFormatter amount={data?.reduce((acc, el) => acc + el.total_cost, 0)} />
                            </span>
                        </p>
                    </div>
                    <div className="half">
                        <p className='total'>
                            Приблизительная стоимость доставки: <span> (в процессе разработки)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='customerInfo'>
                <h2>Информация о покупателе:</h2>
                <div className="info">
                    <div className="half">
                        <p><BadgeOutlinedIcon /> {userData?.first_name}</p>
                        <p>
                            <IconButton color='primary' onClick={() => { handleOpenNameModal() }}>
                                <EditOutlinedIcon />
                            </IconButton>
                        </p>

                    </div>
                    <div className="half">
                        <p>
                            <LocalPhoneOutlinedIcon />
                            <Tooltip title="Номер для связи с вами" placement="top-start" style={{ display: "flex", alignItems: "center" }}>
                                {userData?.username}
                                <IconButton>
                                    <InfoOutlined sx={{ color: "#00000088", fontSize: "1.2rem" }} />
                                </IconButton>
                            </Tooltip>
                        </p>
                        <p>
                            <IconButton color='primary' onClick={() => { handleOpenPhoneModal() }}>
                                <EditOutlinedIcon />
                            </IconButton>
                        </p>
                    </div>
                    <div className="half">
                        <p><LocationOnOutlinedIcon /> {(typeof window !== 'undefined') ? (localStorage?.city) : "Не указан"}</p>
                        <p>
                            <IconButton color='primary' onClick={() => { handleOpenCityModal() }}>
                                <EditOutlinedIcon />
                            </IconButton>
                        </p>

                    </div>
                </div>
            </div>
            <div className="culmination">
                <Button variant='contained' fullWidth style={{ backgroundColor: "#CD0000" }} onClick={() => { setOpenAreYouSureModal(true) }}>
                    подтвердить
                </Button>
                <div className='alternative'>
                    <div className="half">
                        <Button variant='outlined' fullWidth color='error' onClick={() => { handleOpenCityModal() }}>
                            Изменить город
                        </Button>
                    </div>
                    <div className="half">
                        <Link href='/cart'>
                            <Button variant='outlined' fullWidth color='error'>
                                Изменить список
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>
            <ChangeUserFirstNameModal open={openNameModal} handleClose={() => setOpenNameModal(false)} previousValue={userData?.first_name} setUpdateTrigger={setUpdateTrigger} />
            <ChangeUserPhoneModal open={openPhoneModal} handleClose={() => setOpenPhoneModal(false)} previousValue={userData?.username} setUpdateTrigger={setUpdateTrigger} />
            <ChangeUserCityModal open={openCityModal} handleClose={() => setOpenCityModal(false)} />
            <AreYouSureModal open={openAreYouSureModal} handleClose={() => setOpenAreYouSureModal(false)} phoneNumber={userData?.username} handleAccept={handleOpenGotYouModal} />
            <GotYouModal open={openGotYouModal} handleClose={handleCloseGotYouModal} />
        </div >
    )
}

export default CheckOut