import React from 'react'

import { Box, Button, Modal } from '@mui/material'
import Link from 'next/link';

import Router from 'next/router'

import './ManufacterAllowModal.scss'


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

function ManufacterAllowModal({ open, handleClose }) {
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
                            Извините,
                            <br />
                            доступ к данному разделу имеют только производители и цеха
                        </p>
                    </div>
                    <div className='ModalButtons'>
                        {/* <Link href="/login-customer"> */}
                        <Button variant='outlined' fullWidth onClick={() => {
                            window.history.back()
                        }}>
                            Вернуться назад
                        </Button>

                        {/* </Link> */}

                        <Link href="/account-customer">
                            <Button variant='outlined' fullWidth>
                                В личный кабинет
                            </Button>
                        </Link>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ManufacterAllowModal