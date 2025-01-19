import { Box, Button, Modal } from '@mui/material'
import Link from 'next/link';
import React from 'react'

import "./CheckOut.scss"


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


function GotYouModal({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='SaveModal'
        >
            <Box sx={style}>
                <div className='GotYouModal'>
                    <h3>
                        Ваш заказ принят на обработку!
                    </h3>
                    <p>
                        В ближайшее время с вами свяжется наш менеджер
                    </p>
                    <Link href='/account-customer/orders'>
                        <Button fullWidth onClick={handleClose} variant='contained' color='primary' sx={{ backgroundColor: "#CD0000" }}>
                            В личный кабинет
                        </Button>
                    </Link>
                </div>
            </Box>
        </Modal>
    )
}

export default GotYouModal