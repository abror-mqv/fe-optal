import { Box, Button, Modal } from '@mui/material'
import React from 'react'
import './GoToCartModal.scss'
import Link from 'next/link';

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

function GoToCartModal({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='SaveModal'
        >
            <Box sx={style}>
                <div className='GoToCartModal'>
                    <div className='GoToCartModalInfo'>
                        Товар добавлен в <Link href="/cart"> КОРЗИНУ </Link>
                    </div>
                    <div className='GoToCartModalButtons'>
                        <Button sx={{ color: "#CD0000", borderColor: "#CD0000" }} variant='outlined' fullWidth onClick={handleClose}>
                            Продолжить покупки
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default GoToCartModal