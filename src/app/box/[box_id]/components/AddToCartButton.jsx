import { Button } from '@mui/material'
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';

import axios from 'axios';
import { BACK_URL } from '@/app/VAR';


function AddToCartButton({ productId, setAuthError, setCAError }) {

    const addToCart = async (productId, colorId = null) => {
        console.log("TOKEN: ", localStorage.getItem("TOKEN"))
        if (localStorage.getItem("TOKEN") == null) {
            setAuthError(productId)
        } else if (localStorage.getItem("USER_TYPE") == "FACTORY") {
            setCAError()
        } else {
            try {
                const payload = {
                    product_id: productId,
                    color_id: colorId,
                    quantity: 1, // Всегда добавляем 1 товар по умолчанию
                };

                const response = await axios.post(`${BACK_URL}/api/customers/cart`, payload, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("TOKEN")}`, // Убедитесь, что токен сохранён
                    },
                });

                console.log("Item added to cart:", response.data);
                alert("Товар успешно добавлен в корзину!");
            } catch (error) {
                console.error("Error adding to cart:", error.response?.data || error.message);
                alert("Ошибка при добавлении в корзину.");
            }
        }
    };


    return (
        <Button onClick={() => addToCart(productId)}>
            <DownloadIcon />
            В корзину
        </Button>
    )
}

export default AddToCartButton