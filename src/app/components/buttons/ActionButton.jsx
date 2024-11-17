import { Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Пустое сердечко
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import '../../styles/components/_button.scss';

function ActionButton(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    var text = ""
    var variant = ""
    let buttonStyle = {};
    let icon = null;
    if (props.mode == "cart") {
        var text = <><img src="/logistics.svg" className='button_icon' />В КОРЗИНУ</>
        variant = "contained";
        buttonStyle = { backgroundColor: '#CD0000' };
    } else if (props.mode == "fav") {
        return (
            <IconButton
                onClick={() => setIsFavorite(!isFavorite)} // Меняем состояние по клику
                color={isFavorite ? "error" : "default"} // Цвет иконки
            >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />} {/* Показ пустого или заполненного сердечка */}
            </IconButton>
        );
    } else if (props.mode == "buy") {
        var text = <><AirportShuttleIcon className='button_icon' />купить СЕЙЧАС</>
        variant = "contained";
        buttonStyle = { backgroundColor: '#252421' };
    } else if (props.mode == "checkout") {
        var text = <>ОФОРМИТЬ</>
        buttonStyle = { backgroundColor: "#CD0000", color: '#ffffff', width: "100%", marginTop: "48px" }
    } else if (props.mode == "create") {
        var text = <>ЗАРЕГИСТРИРОВАТЬ</>
        buttonStyle = { backgroundColor: "#CD0000", color: '#ffffff', width: "360px", marginTop: "48px" }
    } else if (props.mode == "category") {
        var text = <>ВЫБРАТЬ</>
        buttonStyle = { backgroundColor: "#CD0000", color: '#ffffff', width: "120px", marginTop: "0px" }
    }

    return (
        <Button className="button" variant={variant || "text"} sx={buttonStyle}>{text}</Button>
    )
}

export default ActionButton