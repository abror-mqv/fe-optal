import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from "@mui/material";
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';


function DeleteColor({ open, handleClose, color_id, update }) {

    const handleDeleteColorVariation = (color_variation_id) => {
        axios.delete(`${BACK_URL}/api/factories/product/color-variation/delete-color-variation/${color_variation_id}/`, {
            headers: { Authorization: `Token ${localStorage.getItem("TOKEN")}` }
        }).then(res => {
            console.log(res)
            update()
            handleClose()
        }).catch(err => {
            console.log(err)
            alert("Ошибка удаления")
        })

    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Загрузить новое изображение</DialogTitle>
                <DialogContent>
                    Удалить цветовую вариацию?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Отмена</Button>
                    <Button onClick={() => {
                        handleDeleteColorVariation(color_id)

                    }} color="error">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteColor