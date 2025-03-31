"use client"
import { BACK_URL } from '@/app/VAR'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'

import '@/app/styles/components/_loginfactory.scss'
import Header from '../../header/Header'
import Link from 'next/link'
import CustomPhoneInput from '../components/CustomPhoneInput'

function LoginFactory() {

    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const [open, setOpen] = React.useState(false)
    const [openFail, setOpenFail] = React.useState(false)

    const [ablebutton, setAbleButton] = React.useState(true)


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    React.useEffect(() => {
        if ((login != "") && (password.length > 6)) {
            setAbleButton(true)
        } else {
            setAbleButton(false)
        }
    }, [login, password])

    const handleSubmit = () => {
        axios.post(`${BACK_URL}/api/factories/login/`,
            {
                "username": login,
                "password": password
            }
        ).then((res) => {
            localStorage?.setItem("TOKEN", res.data.token)
            localStorage?.setItem("USER_TYPE", "FACTORY")

            setOpen(true)
        }).catch(err => {
            setOpenFail(true)
            setLogin("")
            setPassword("")
            console.log(err)
        })
    }
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


    return (
        <div className='LoginFactory'>
            <Header />
            <div className='LoginCard'>
                <div className='LoginCardHeader'>
                    <h4>
                        Войти
                    </h4>
                    <p>
                        как производитель
                    </p>
                </div>
                <div className='LoginForm'>
                    <div className='LoginFormLogin'>
                        <p>
                            Ваш номер
                        </p>
                        <CustomPhoneInput value={login} onChange={setLogin} default_country="ru" />
                    </div>
                    <div className='LoginFormPassword'>
                        <p>
                            Ваш пароль
                        </p>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel fullWidth htmlFor="outlined-adornment-password">Пароль</InputLabel>
                            <OutlinedInput
                                fullWidth
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
                        <p className='forgotPassword'>

                            <Link href="/forgot-password-factory" >
                                Забыли пароль?
                            </Link>
                        </p>

                    </div>
                </div>
                <div className='LoginSubmit'>
                    <Button variant='contained' disabled={!ablebutton} onClick={handleSubmit} fullWidth className='LoginSubmitButton' style={ablebutton ? { backgroundColor: "#CD0000" } : { backgroundColor: "rgba(0, 0, 0, 0.549)", color: "rgb(222,222,222)" }}>
                        Войти
                    </Button>
                </div>
            </div>
            <div className='RegisterFirst'>
                <p>
                    Ещё нет аккаунта? <Link href='/newfactory' className='Link'>Зарегистрироваться</Link>
                </p>

            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        С возвращением!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >


                    </Typography>
                    <Link href="/account-factory">
                        <Button variant='outlined' onClick={() => setOpen(false)}>
                            Перейти в личный кабинет
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
                        Неверный номер телефона или пароль
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <p className='forgotPassword'>

                            <Link href="/forgot-password-factory" >
                                Забыли пароль?
                            </Link>
                        </p>
                    </Typography>
                    <Button variant='contained' onClick={() => setOpenFail(false)} >
                        попробывать еще раз
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default LoginFactory