import React from 'react'

import { Box, Button, Modal } from '@mui/material'
import Link from 'next/link';

import './ManufacterIntroModal.scss'


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

function ManufacterIntroModal({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='SaveModal'
        >
            <Box sx={style}>
                <div className='QuickAuthModal'>
                    <div className='ModalInfo'>
                        <p>
                            Извините, доступ к данному разделу имеют только производители и цеха
                        </p>
                        <p>
                            Если вы хотите начать продавать на optal.ru, можете пройти регистрацию
                        </p>
                    </div>
                    <div className='ModalButtons'>
                        <Link href="/newfactory">
                            <Button variant='outlined' fullWidth>
                                Начать продавать
                            </Button>
                        </Link>

                        <Button variant='outlined' fullWidth onClick={() => {
                            window.history.back()
                        }}>
                            Назад
                        </Button>

                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ManufacterIntroModal