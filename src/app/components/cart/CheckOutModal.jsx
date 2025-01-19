'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import './CheckOutModal.scss';
import CitySelector from './CitySelector';


import * as cities from './cities';
import Link from 'next/link';

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

function CheckOutModal({ handleOpen, handleClose, open, handleNext, handleSaveCart }) {
    const [ableNext, setAbleNext] = React.useState(true)
    const [city, setCity] = React.useState("")

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setCity(localStorage.getItem("city"))
        }

    }, [])

    React.useEffect(() => {
        if (city.length == 0) {
            setAbleNext(false)
        } else {
            setAbleNext(true)
        }
    }, [city])



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
                            <Link href={`/cart/checkout`}>
                                <Button fullWidth disabled={!ableNext} color='success' variant='contained' onClick={() => { handleNext(city); handleSaveCart() }} >
                                    Далее
                                </Button>
                            </Link>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default CheckOutModal