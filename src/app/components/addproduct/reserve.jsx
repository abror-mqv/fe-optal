"use client"

import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react'
import '../../styles/components/_addproduct.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { setNewVariant, setVariantName, setHuyna } from '@/redux/slices/AddProductSlice';
import ColorVariant from './ColorVariant';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'; import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import { SketchPicker } from 'react-color';


const ColorPicker = props => {
    return (
        <div className='countainer_color'>
            <input type="color" {...props} className='color_code_input' />
        </div>
    );
};





function AddProductForm({ setSubmitFunction }) {

    const [state, updateState] = useState("#FFFFFF");
    const ButtonVariant = ({ variant, index }) => {

        console.log("VAR: ", variant, "IDX: ", index)
        console.log(colorVariants)
        if (colorVariants[index]?.image != "") {
            return (
                <Button
                    variant="outlined"
                    component="label"
                    className='color_image'
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                >

                    <DoneIcon />
                    Redyc
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        hidden
                    />
                </Button>
            )
        } else {
            return (
                <Button
                    variant="outlined"
                    component="label"
                    className='color_image'
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                >

                    <AddPhotoAlternateIcon />
                    Not Ready
                    <input
                        type="file"
                        hidden
                    />
                </Button>
            )
        }
    }

    const handleInput = e => {
        updateState(e.target.value);
    };

    const [colorVariants, setColorVariants] = useState([]);
    const [productname, setProductname] = useState("")
    const [sizesline, setSizesLine] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null);



    const addColorVariant = () => {
        setColorVariants([...colorVariants, { color_name: "", color_code: "", image: "" }]);
    };
    const handleVariantChange = (index, field, value) => {
        const updatedVariants = colorVariants.map((variant, i) =>
            i === index ? { ...variant, [field]: value } : variant
        );
        setColorVariants(updatedVariants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("TOKEN");

        // Формируем данные продукта для отправки
        const productData = {
            name: productname,
            price: price,
            description: description,
            sizes: sizesline,
            father: 2 // ID родительской категории
        };

        try {
            // Шаг 1: Создаём продукт
            const productResponse = await axios.post("http://127.0.0.1:8000/api/products/", productData, {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const productId = productResponse.data.id; // Получаем ID созданного продукта
            console.log("Продукт успешно создан:", productResponse.data);

            // Шаг 2: Отправляем цветовые вариации для созданного продукта
            for (const variant of colorVariants) {
                const formData = new FormData();
                formData.append("product", productId); // ID продукта
                formData.append("color_name", variant.color_name);
                formData.append("color_code", variant.color_code);
                if (variant.image) {
                    formData.append("image", variant.image); // Файл изображения
                }

                const variantResponse = await axios.post("http://127.0.0.1:8000/api/products/color-variation/", formData, {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log("Цветовая вариация успешно добавлена:", variantResponse.data);
            }

            console.log("Все цветовые вариации успешно добавлены");

        } catch (error) {
            console.error("Ошибка при создании продукта или цветовых вариаций:", error);
            if (error.response) {
                console.error("Детали ошибки:", error.response.data);
            }
        }
    };

    const handleImageChange = (index, file) => {
        const updatedVariants = [...colorVariants];
        updatedVariants[index].image = file;
        setColorVariants(updatedVariants);
    };

    return (
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <div className='main_data'>
                <div>
                    <div className='forma name'>
                        <p onClick={() => {
                            handleVariantName()
                        }}>
                            Название товара
                        </p>

                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="Куртка демисезонная с капюшоном" variant="outlined" value={productname} className='input' onChange={e => {
                            setProductname(e.target.value)
                        }}>

                        </TextField>
                    </div>
                    <div className='forma size'>
                        <p>
                            Размеры в одной линейке (перечисляйте через запятую)
                        </p>

                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="38, 39, 40, 40, 41, 42" variant="outlined" value={sizesline} className='input' onChange={e => {
                            setSizesLine(e.target.value)
                        }}>

                        </TextField>
                    </div>
                    <div className='forma desc'>
                        <p>
                            Опсиание товара
                        </p>

                        <TextField
                            id="outlined-multiline-static"
                            label="Опишите свой товар, чтобы он лучше продавался"
                            multiline
                            rows={4}
                            defaultValue=""
                            fullWidth
                            className='input'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='variants'>
                <p className='title' onClick={() => console.log(colorVariants)}>
                    Варианты цветов
                </p>
                <div className='variants_row'>
                    {
                        colorVariants.map((variant, index) => {
                            return (
                                <div key={index} className='color_new'>
                                    <ButtonVariant index={index} />
                                    <ColorPicker onChange={(e) => { handleVariantChange(index, 'color_code', e.target.value) }} value={colorVariants[index].color_code} />
                                    <TextField

                                        className='color_code'
                                        value={variant.color_name}
                                        onChange={(e) => handleVariantChange(index, 'color_name', e.target.value)}
                                        fullWidth inputProps={{ maxLength: 44 }} id="outlined-Аbasic" label="Название цвета"
                                    />
                                </div>
                            )
                        })
                    }
                    <Button variant='contained' className='AddNewColor' onClick={addColorVariant}>
                        <AddCircleOutlineIcon />
                    </Button>
                </div>

            </div>
            <div className='main_data'>

                <div className='forma price'>
                    <p>Цена за 1 единицу товара</p>
                    <div>
                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="0" variant="outlined" value={price} className='input' onChange={e => {
                            setPrice(e.target.value)
                        }}>

                        </TextField>
                        рублей
                    </div>

                </div>
                <div className='forma category'>
                    <button type="submit">Create Product</button>
                </div>
            </div>
        </form>
    )
}

export default AddProductForm