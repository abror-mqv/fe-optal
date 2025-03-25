'use client'

import React from 'react'
import { Box, Button, ButtonGroup, Modal } from '@mui/material'
import Link from 'next/link';
import './QuickAuthModal.scss'
import { useRouter } from "next/navigation";


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


function QuickAuthModal({ open, handleClose, warningText }) {
    const router = useRouter();
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
                            {warningText}
                        </p>
                    </div>
                    <div className='ModalButtons'>
                        {/* <ButtonGroup fullWidth variant='text'> */}
                        <Button onClick={() => { router.back() }}>
                            Назад
                        </Button>
                        <Link href="/login-customer">
                            <Button fullWidth sx={{ color: "#CD0000" }}>
                                Войти
                            </Button>

                        </Link>

                        <Link href="/register-customer">
                            <Button fullWidth sx={{ color: "#CD0000" }}   >
                                Зарегистрироваться
                            </Button>
                        </Link>
                        {/* </ButtonGroup> */}

                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default QuickAuthModal