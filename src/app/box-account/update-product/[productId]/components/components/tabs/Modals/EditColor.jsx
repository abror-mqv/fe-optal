import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import "./EditProductModal.scss"
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



function EditColor({ open, handleClose, color_id, update }) {
    const handleChooseNewColor = (color_obj) => {
        axios.patch(
            `${BACK_URL}/api/factories/products/color-variation/update/${color_id}/`,
            color_obj,
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("TOKEN")}`,
                },
            }
        ).then(res => {
            console.log(res)
            update()
        }).catch(err => {
            console.log(err)
        })

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
                                            handleClose()
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

export default EditColor