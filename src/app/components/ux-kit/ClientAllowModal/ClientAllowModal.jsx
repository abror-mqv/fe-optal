import React from 'react'

import { Box, Button, Modal } from '@mui/material'
import Link from 'next/link';

import './ClientAllowModal.scss'


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

function ClientAllowModal({ open, handleClose, isAddToCartAction }) {

    const AddToCartActionButtons = () => {
        return (
            <>
                <Button variant='contained' onClick={handleClose}>
                    ОК
                </Button>
            </>
        )
    }

    const DefaultButtons = () => {
        return (
            <>
                <Button variant='contained' fullWidth onClick={() => {
                    window.history.back()
                }}>
                    Вернуться назад
                </Button>

                <Link href="/login-customer" >
                    <Button variant='outlined' fullWidth >
                        Войти как клиент
                    </Button>
                </Link>
                <Link href="/register-customer">
                    <Button variant='outlined' fullWidth>
                        Зарегистрироваться как клиент
                    </Button>
                </Link>
            </>
        )
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
                <div className='ClientAllowModal'>
                    <div className='ModalInfo'>
                        <p>
                            <span className='BiggerText'>Извините, </span> доступ к данному разделу имеют только клиенты и  <span className='BiggerText'>заказчики.</span>
                        </p>
                    </div>
                    <div className='ModalButtons'>
                        {
                            isAddToCartAction ? <AddToCartActionButtons /> : <DefaultButtons />
                        }
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ClientAllowModal