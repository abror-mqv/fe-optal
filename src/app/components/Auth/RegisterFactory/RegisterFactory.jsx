'use client'

import { Container, Typography, TextField, Button, Modal, Box, InputAdornment, InputLabel, OutlinedInput, IconButton, FormControl } from '@mui/material';
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { AccountCircle } from '@mui/icons-material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

import { BACK_URL } from '../../../VAR';
import Link from 'next/link';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import CustomPhoneInput from '../components/CustomPhoneInput';

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


function RegisterFactory() {
    const [factoryNumber, setFactoryNumber] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [factoryName, setFactoryName] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [ablebutton, setAbleButton] = React.useState(true)

    const [open, setOpen] = React.useState(false)
    const [openFail, setOpenFail] = React.useState(false)


    const handleClose = () => {
        setOpen(true)
    }

    React.useEffect(() => {
        console.log([factoryName.length, factoryNumber.length, password.length, firstName])
        if ((factoryName.length > 4) && (factoryNumber.length > 9) && (firstName != "") && (password.length > 6)) {
            setAbleButton(true)
        } else {
            setAbleButton(false)
        }
    }, [factoryName, factoryNumber, password, firstName])


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    const sendData = () => {
        axios.post(`${BACK_URL}/api/factories/register/`,
            {
                "username": factoryNumber,
                "first_name": firstName,
                "factory_name": factoryName,
                "password": password
            }
        ).then((res) => {
            localStorage?.setItem("TOKEN", res.data.token)
            localStorage?.setItem("USER_TYPE", "FACTORY")

            setOpen(true)
        }).catch(err => {
            // alert("Ошибка регистрации. Просьба позвонить в службу поддержки по номеру +996559808243. За уведомлене об ошибке закинем 500 сом на баланс")
            setOpenFail(true)
            console.log(err)
        })
    }

    return (
        <>
            <Header />

            <div className='newfactory'>
                <div className="boxer">

                    <div className='CardLogin'>

                        <div className='header'>
                            <h4>
                                Начните
                            </h4>
                            <p>
                                продавать как производитель
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
                                <CustomPhoneInput value={factoryNumber} onChange={setFactoryNumber} default_country="ru" />
                            </div>
                            <div className='form factoryname'>
                                <p>
                                    Название вашего цеха
                                </p>
                                <TextField fullWidth id="outlined-basic" label="Название" variant="outlined" value={factoryName} className='input' onChange={e => {
                                    setFactoryName(e.target.value)
                                }}>

                                </TextField>
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
                                {ablebutton ? "" : "Заполните все поля"}
                            </p>
                            <Button mode="create" disabled={!ablebutton} onClick={() => {
                                sendData()
                            }} fullWidth variant='contained' style={ablebutton ? { backgroundColor: "#CD0000" } : { backgroundColor: "rgba(0, 0, 0, 0.549)", color: "rgb(222,222,222)" }}>
                                Зарегистрировать
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
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Поздравляем! Теперь вы можете начать продавать свою продикцию на OPTAL.RU
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} >


                        </Typography>
                        <Link href="/account-factory">
                            <Button variant='outlined' onClick={() => handleClose()}>
                                Начать продавать
                            </Button>
                        </Link>

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


                            <Link href="/login-factory" >
                                Уже есть аккаунт?
                            </Link>

                        </Typography>
                        <Button variant='contained' onClick={() => setOpenFail(false)}>
                            попробывать еще раз
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Footer />
        </>
    )
}

export default RegisterFactory