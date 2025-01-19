'use client'

import { Box, Button, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import CitySelector from '../cart/CitySelector';
import '../cart/CheckOutModal.scss';
import * as cities from '../cart/cities';
import { setNewCity } from '@/app/util/NewCity';

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
function ChangeUserCityModal({ open, handleClose }) {
    const [city, setCity] = React.useState("")

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCity(localStorage.getItem("city"))
        }
    }, [])
    const handleCitySelect = (city) => {
        console.log("Выбранный город:", city);
    };
    const CityDisplay = ({ city }) => {
        if (city == "") {
            return (

                <div>
                    <p>Вы не выбрали город доставки</p>
                </div>

            )
        } else {
            return (
                <div>
                    <p>Ваш город - <span> {city}</span>?</p>
                </div>
            )
        }
    }

    const handleSaveCity = (city) => {
        setNewCity(city);
        handleClose();
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
                            Куда доставить заказ?
                        </h5>
                        <CitySelector inputValue={city} setInputValue={setCity} cities={cities.cities} onCitySelect={handleCitySelect} />
                    </div>
                    <div className='CityAccept'>
                        <CityDisplay city={city} />
                    </div>
                </div>
                <div className='ButtonsList'>
                    <Button fullWidth disabled={city == ""} color='success' variant='contained' onClick={() => handleSaveCity(city)}>
                        Сохранить
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ChangeUserCityModal