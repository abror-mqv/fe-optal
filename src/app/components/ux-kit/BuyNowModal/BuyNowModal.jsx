import React, { useState } from 'react'
import { Box, Button, Chip, Modal, TextField } from '@mui/material'
import Link from 'next/link';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';

import './BuyNowModal.scss'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "6px"
};


function BuyNowModal({ open, handleClose, id }) {
    const [contact, setContact] = useState("")

    const handleBuyNowUser = (id) => {
        const payload = {
            product_id: id,
        };
        axios.post(`${BACK_URL}/api/customers/quick-buy-user`, payload, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`, // Убедитесь, что токен сохранён
            },
        })
    }

    const handleBuyNowAnon = (id) => {
        const payload = {
            product_id: id,
            phone_number: contact
        };
        axios.post(`${BACK_URL}/api/customers/quick-buy-anon`, payload, {

        })
    }

    const ModalVariant = () => {
        if (!localStorage.getItem("TOKEN")) {
            return (
                <div className='GoToCartModalInfo'>
                    <p className='ChipHolder'>
                        <Chip label="Мы получили вашу заявку!" />

                    </p>
                    <p>
                        <Chip label="Как с вами связаться?" />

                    </p>

                </div>
            )
        } else {
            return (
                <div className='GoToCartModalInfo'>
                    <p className='ChipHolder'>
                        <Chip label="Мы получили вашу заявку!" />
                    </p>
                </div>
            )
        }
    }

    const handleSubmit = (id) => {
        if (!localStorage.getItem("TOKEN")) {
            handleBuyNowAnon(id)
        } else {
            handleBuyNowUser(id)
        }
        handleClose()
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='SaveModal'
        >
            <Box sx={style}>
                <div className='BuyNowModal'>
                    <ModalVariant />

                    <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="Номер телефона" variant="outlined" value={contact} className='input' onChange={e => {
                        setContact(e.target.value)
                    }}
                        sx={{ display: (!localStorage.getItem("TOKEN") ? "block" : "none"), color: "#CD0000 !important", borderColor: "#CD0000 !important" }}
                    >

                    </TextField>
                    <div className='GoToCartModalButtons'>
                        <Button sx={{ color: "#CD0000", borderColor: "#CD0000" }} variant='outlined' fullWidth onClick={() => handleSubmit(id)}>
                            ОК
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default BuyNowModal