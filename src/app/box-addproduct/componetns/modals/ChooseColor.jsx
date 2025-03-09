import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// import "./EditProductModal.scss"
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import { COLORS_LIST } from '@/app/util/colors';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: "360px",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    // boxShadow: 24,
    p: 4,
    borderRadius: "12px"
};


function ChooseColor({ open, handleClose, color_id, handleVariantChange }) {
    const handleChooseNewColor = async (color_obj) => {
        console.log("input colors: ", color_obj)
        handleVariantChange(color_id, color_obj)
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='EditColorModal'>
                        <p>
                            Выберите новый цвет
                        </p>
                        <div className='colors_list'>
                            {
                                COLORS_LIST.map((el, index) => {
                                    return (
                                        <div className='dot' key={index} style={{ backgroundColor: `${el.color_code}` }} onClick={() => {
                                            handleChooseNewColor(el);
                                        }}>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </div >
    )
}

export default ChooseColor