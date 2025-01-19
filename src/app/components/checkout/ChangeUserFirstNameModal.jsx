'use client'

import { setNewFirstName } from '@/app/util/NewFirstName';
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

function ChangeUserFirstNameModal({ open, handleClose, previousValue, setUpdateTrigger }) {
    const [firstName, setFirstName] = useState(previousValue)
    useEffect(() => {
        setFirstName(previousValue)
    }, [previousValue])
    const handleSaveFirstName = (firstName) => {
        setNewFirstName(firstName)
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
                            Как к вам обращаться?
                        </h5>
                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="" variant="outlined" value={firstName} className='input' onChange={e => {
                            setFirstName(e.target.value)
                        }}>

                        </TextField>
                        <p style={{ fontSize: "0.875rem", color: "#000000aa" }}>
                            При состовлении договора мы уточним ваше ФИО еще раз*
                        </p>
                    </div>
                </div>
                <div className='ButtonsList'>
                    <Button fullWidth disabled={firstName == ""} color='success' variant='contained' onClick={() => { handleSaveFirstName(firstName); handleClose() }}>
                        Сохранить
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ChangeUserFirstNameModal