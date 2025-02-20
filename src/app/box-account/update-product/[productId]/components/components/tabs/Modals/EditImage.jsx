import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { BACK_URL } from '@/app/VAR';
import axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function EditImage({ open, handleClose, color_id, update }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleUpload = () => {
        if (selectedFile) {
            updateColorVariationImage(color_id, selectedFile);
            setSelectedFile(null);
            handleClose();
        }
    };
    const handleDelete = () => {
        setImage(null);
        setPreview(null);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    const updateColorVariationImage = async (color_id, imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await axios.put(
                `${BACK_URL}/api/factories/product/color-variation/update-image/${color_id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Token ${localStorage.getItem("TOKEN")}`,
                    },
                }
            );
            console.log("Image updated:", response.data);
            update()
            return response.data;
        } catch (error) {
            console.error("Error updating image:", error.response?.data || error);
        }
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Загрузить новое изображение</DialogTitle>
                <DialogContent>
                    <label for="file-upload" class="custom-file-upload">
                        Выберите файл <AttachFileIcon />
                    </label>
                    <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Отмена</Button>
                    <Button onClick={handleUpload} color="primary" disabled={!selectedFile}>
                        Загрузить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditImage