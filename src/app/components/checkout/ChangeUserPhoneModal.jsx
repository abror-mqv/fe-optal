'use client'

import { setNewPhoneNumber } from '@/app/util/NewPhoneNumber';
import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

function ChangeUserPhoneModal({ open, handleClose, previousValue, setUpdateTrigger }) {
    const [phone, setPhone] = useState(previousValue)
    useEffect(() => {
        setPhone(previousValue)
    }, [previousValue])
    const handleSavePhoneNumber = (phone) => {

        setNewPhoneNumber(phone)
        setUpdateTrigger(true)
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
                <div className='ModalInfo'>
                    <div className='DeliveryInfo'>
                        <h5>
                            Ваш новый нмоер телефона
                        </h5>
                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="" type='number' variant="outlined" value={phone} className='input' onChange={e => {
                            setPhone(e.target.value)
                        }}>

                        </TextField>
                        <p style={{ fontSize: "0.875rem", color: "#000000aa" }}>
                            Введите свой контактный номер телефона* <br />В любом формате*
                        </p>
                    </div>
                </div>
                <div className='ButtonsList'>
                    <Button fullWidth disabled={phone == ""} color='success' variant='contained' onClick={() => { handleSavePhoneNumber(phone); handleClose() }}>
                        Сохранить
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ChangeUserPhoneModal