import { Box, Button, Modal } from '@mui/material'
import React from 'react'

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

function AreYouSureModal({ open, handleClose, phoneNumber, handleAccept }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='SaveModal'
        >
            <Box sx={style}>
                <div className='AreYouSureModal'>
                    <div className='DeliveryInfo'>
                        <p className='description'>
                            Наш менеджер свяжется с вами по номеру
                            <br />
                            <span>{phoneNumber}</span> в ближайшее время
                            <br />
                            для продвижения вашего заказа
                        </p>
                        <h3>
                            Начать оформлять заказ?
                        </h3>
                    </div>
                    <div className='ButtonsListAre'>
                        <Button variant='outlined' color='error' fullWidth onClick={() => { handleClose() }}>
                            Отмена
                        </Button>
                        <Button variant='contained' fullWidth style={{ backgroundColor: "#CD0000" }} onClick={() => { handleAccept() }}>
                            Да
                        </Button>
                    </div>

                </div>

            </Box>
        </Modal>
    )
}

export default AreYouSureModal