'use client'

import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import ShareModal from '@/app/components/ui-kit/ShareModal/ShareModal';

function SaveBox({ supplier_id }) {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [openShareModal, setOpenShareModal] = useState(false)

    useEffect(() => {
        // Проверяем, есть ли подписка на данный supplierId в localStorage
        const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
        setIsSubscribed(subscriptions.includes(supplier_id));
    }, [supplier_id]);



    const handleSubscribeAnonym = (supplier_id) => {
        const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
        if (subscriptions.includes(supplier_id)) {
            console.log('Already subscribed to this supplier');
            return;
        }
        subscriptions.push(supplier_id);
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        setIsSubscribed(true)
        console.log(`Successfully subscribed to supplier: ${supplier_id}`);
    }


    const handleSubscribe = (supplier_id) => {
        if (localStorage.getItem("SELLER_TYPE") != "undefined") {
            if (localStorage.getItem("USER_TYPE") != "CUSTOMER") {
                console.log("YOURE NEWBIE")
                handleSubscribeAnonym(supplier_id)
            } else {
                handleSubscribeAnonym(supplier_id)
                console.log("YOURE AUTHENTICATED USER")
            }
        } else {
            console.log("YOURE SELLER")
        }
    }


    if (isSubscribed) {
        return (
            <div className='SaveBox'>
                <div className='notation'>
                    <Button onClick={() => {
                        setOpenShareModal(true)
                    }} variant='outlined' sx={{ display: "flex", gap: "6px", color: "#222", border: "#222 1px solid" }}>
                        Поделиться <ShareIcon /> <WhatsAppIcon sx={{ color: "#25D366" }} /> <TelegramIcon sx={{ color: "#24A1DE" }} />
                    </Button>
                </div>
                <div className='Subscribe'>
                    <Button onClick={() => {
                        handleSubscribe(supplier_id)
                    }} variant='contained' sx={{ backgroundColor: "#222", display: "flex", gap: "8px" }}>
                        сохранен  <CheckBoxIcon />
                    </Button>
                </div>
                <ShareModal open={openShareModal} onClose={() => {
                    setOpenShareModal(false)
                }} url={window.location.href} />
            </div>
        )
    } else {
        return (
            <div className='SaveBox'>
                <div className='notation'>
                    <p>
                        Сохраните этот бокс, <br /> чтобы не потерять
                    </p>
                </div>
                <div className='Subscribe'>
                    <Button onClick={() => {
                        handleSubscribe(supplier_id)
                    }} variant='contained' sx={{ backgroundColor: "#CD0000", display: "flex", gap: "8px" }}>
                        Подписаться  <BookmarkAddIcon />
                    </Button>
                </div>

            </div>
        )
    }
}

export default SaveBox