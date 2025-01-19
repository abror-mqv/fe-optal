import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './SaveModal.scss'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    
    boxShadow: 24,
    p: 4,
    borderRadius: "6px"
  };

function SaveModal({handleOpenCheckOut, handleOpen, handleClose, open}) {

  return (
    <div >
           <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='SaveModal' 
                >
                    <Box sx={style}>
                   <h2>
                   Корзина сохранена!
                   </h2>
                        
                   
                   <div className='ButtonsList'>
                   
                    <Button variant='outlined' onClick={()=>{
                      handleClose();
                      handleOpenCheckOut()
                    }}>
                     Перейти к оформлению
                    </Button>
                    <Button color='success' variant='contained' onClick={handleClose}>
                      ОК
                    </Button>
                   </div>
                    </Box>
                </Modal>
            </div>
    </div>
  )
}

export default SaveModal