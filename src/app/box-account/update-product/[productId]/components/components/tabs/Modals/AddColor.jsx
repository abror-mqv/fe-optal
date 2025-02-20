import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BACK_URL } from "@/app/VAR";
import './EditProductModal.scss'
import { COLORS_LIST } from "@/app/util/colors";

const AddColorVariantModal = ({ open, onClose, productId, update }) => {
    const [colorName, setColorName] = useState("");
    const [colorHex, setColorHex] = useState("#000000");
    const [currentColor, setCurrentColor] = useState(0)
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChangeColor = (color) => {
        setColorName(color.color_name);
        setColorHex(color.color_code)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!image || !colorName) {
            alert("Заполните все поля!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("product", productId);
        formData.append("color_name", colorName);
        formData.append("color_code", colorHex);
        formData.append("image", image);

        try {
            await axios.post(`${BACK_URL}/api/factories/products/color-variation/`, formData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("TOKEN")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Цветовая вариация успешно добавлена!");
            update()
            onClose();
        } catch (error) {
            console.error("Ошибка при добавлении вариации:", error);
            alert("Ошибка при добавлении вариации.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                <div className='EditColorModal'>
                    <p>
                        Выберите новый цвет
                    </p>
                    <div className='colors_list'>
                        {
                            COLORS_LIST.map((el, index) => {
                                return (
                                    <div className='dot' key={index} style={{ backgroundColor: `${el.color_code}`, transform: `${(currentColor == index) ? "scale(140%) rotate(45deg)" : "none"}` }} onClick={() => {
                                        handleChangeColor(el);
                                        setCurrentColor(index)
                                    }}

                                    >

                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className="color_name">
                        {COLORS_LIST[currentColor].color_name}
                    </p>
                </div>



                <Box
                    sx={{
                        border: "2px dashed gray",
                        borderRadius: 2,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                        mb: 2,
                        height: 150,
                    }}
                    component="label"
                >
                    {preview ? (
                        <Box
                            sx={{
                                width: "100%",
                                height: 150,
                                backgroundImage: `url(${preview})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: 2,
                            }}
                        />
                    ) : (
                        <>
                            <CloudUploadIcon sx={{ fontSize: 50, mb: 1, color: "gray" }} />
                            <Typography variant="body2">Перетащите файл или нажмите</Typography>
                        </>
                    )}
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Загрузка..." : "Добавить"}
                </Button>
            </Box>
        </Modal >
    );
};

export default AddColorVariantModal;
