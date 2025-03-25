'use client'

import { Container, Typography, TextField, Button, Modal, Box, InputAdornment, InputLabel, OutlinedInput, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { AccountCircle } from '@mui/icons-material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ActionButton from '../../buttons/ActionButton';
import axios from 'axios';
import '../../../styles/components/_newfactory.scss'

import { BACK_URL } from '../../../VAR';
import Link from 'next/link';
import PhoneInput from './PhoneInput';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: 'column',
    gap: "24px"
};
const countryCodes = [
    { code: "RU", label: "🇷🇺 +7", value: "+7" },
    { code: "KZ", label: "🇰🇿 +7", value: "+7" },
    { code: "BY", label: "🇧🇾 +375", value: "+375" },
    { code: "UA", label: "🇺🇦 +380", value: "+380" },
    { code: "KG", label: "🇰🇬 +996", value: "+996" },
    { code: "UZ", label: "🇺🇿 +998", value: "+998" },
    { code: "TJ", label: "🇹🇯 +992", value: "+992" },
    { code: "TM", label: "🇹🇲 +993", value: "+993" },
    { code: "AM", label: "🇦🇲 +374", value: "+374" },
    { code: "AZ", label: "🇦🇿 +994", value: "+994" },
    { code: "GE", label: "🇬🇪 +995", value: "+995" },
];

function RegisterCustomer() {
    const [customerNumber, setCustomerNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = useState(false)
    const [openFail, setOpenFail] = React.useState(false)

    const [phoneValue, setPhoneValue] = useState("")

    const [ooo, setOOO] = useState("")
    useEffect(() => {
        setOOO(localStorage.getItem("BEFORE_REGISTRATION_PAGE"))
    }, [window])

    const [iii, setIII] = useState(true)

    useEffect(() => {
        if ((localStorage.getItem("BEFORE_REGISTRATION_PAGE") != "undefined")) {
            setIII(localStorage.getItem("BEFORE_REGISTRATION_PAGE"))
        } else {
            setIII(false)
        }
    }, [window])

    const [ablebutton, setAbleButton] = React.useState(true)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    React.useEffect(() => {
        console.log([customerNumber.length, password.length, firstName])
        if ((customerNumber.length > 9) && (firstName != "") && (password.length > 6)) {
            setAbleButton(true)
        } else {
            setAbleButton(false)
        }
    }, [customerNumber, password, firstName])


    const sendData = () => {
        axios.post(`${BACK_URL}/api/customers/register/`,
            {
                "username": customerNumber,
                "first_name": firstName,
                "password": password
            }
        ).then((res) => {
            localStorage?.setItem("TOKEN", res.data.token)
            localStorage?.setItem("USER_TYPE", "CUSTOMER")
            setOpen(true)
        }).catch(err => {
            // alert("Ошибка регистрации. Просьба позвонить в службу поддержки по номеру +996559808243. За уведомлене об ошибке закинем 500 сом на баланс")
            setOpenFail(true)
            console.log(err)
        })
    }

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [phone, setPhone] = useState("");

    const handlePhoneChange = (newPhone) => {
        setPhone(newPhone);
    };

    const handleSubmit = () => {
        console.log("Отправляем номер:", phone);
    };
    return (
        <div>
            <div className='newfactory'>
                <div className="boxer">

                    <div className='CardLogin'>

                        <div className='header'>
                            <h4>
                                Откройте для себя
                            </h4>
                            <p>
                                оптовый рынок Кыргызстана
                            </p>
                        </div>
                        <div className='CardLoginForm'>
                            <div className='form name'>
                                <p>
                                    Как вас зовут?
                                </p>

                                <TextField fullWidth id="outlined-basic" label="Ваше имя" variant="outlined" value={firstName} className='input' onChange={e => {
                                    setFirstName(e.target.value)
                                }}>

                                </TextField>
                            </div>
                            <div className='form number'>
                                <p>
                                    Ваш номер
                                </p>
                                <TextField type="number" fullWidth id="outlined-basic" label="Номер" variant="outlined" value={customerNumber} className='input' onChange={e => {
                                    setCustomerNumber(e.target.value)
                                }}>

                                </TextField>
                            </div>
                            <div className='from'>
                                <PhoneInput value={phone} onChange={handlePhoneChange} />
                            </div>
                            <div className='form clubname'>
                                <p>
                                    Придумайте пароль
                                </p>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password} // Привязываем состояние пароля
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"

                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className='RegisterSubmit'>
                            <p className='fillFields'>
                                {ablebutton ? "" : "*Заполните все поля"}
                            </p>
                            <Button mode="create" disabled={!ablebutton} onClick={() => {
                                sendData()
                            }} fullWidth variant='contained' style={ablebutton ? { backgroundColor: "#CD0000" } : { backgroundColor: "rgba(0, 0, 0, 0.549)", color: "rgb(222,222,222)" }}>
                                Зарегистрироваться
                            </Button>
                        </div>
                    </div>

                </div>
                <div className='RegisterFirst'>
                    <p>
                        Уже есть аккаунт? <Link href='/login-factory' className='Link'>Войти</Link>
                    </p>

                </div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="p" component="p">
                            Поздравляем! Теперь вы можете начать покупать нужно текст доработать
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} >


                        </Typography>
                        <Link href="/account-customer">
                            <Button variant='contained' onClick={() => setOpen(false)}>
                                Перейти в личный кабинет
                            </Button>
                        </Link>
                        {
                            iii ? <>
                                <Link href={iii}>
                                    <Button variant='outlined' onClick={() => setOpen(false)}>
                                        Вернуться к покупкам
                                    </Button>
                                </Link>
                            </> : <></>
                        }
                    </Box>
                </Modal>
                <Modal
                    open={openFail}
                    onClose={() => setOpenFail(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" color='error'>
                            Ошибка регистрации
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} >


                            <Link href="/login-customer" >
                                Уже есть аккаунт?
                            </Link>

                        </Typography>
                        <Button variant='contained' onClick={() => setOpenFail(false)} >
                            попробывать еще раз
                        </Button>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default RegisterCustomer