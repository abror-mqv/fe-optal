"use client"

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Modal, Typography, Box } from '@mui/material'
import React from 'react'

import '@/app/styles/components/_loginfactory.scss'
import Link from 'next/link'
import axios from 'axios'
import { BACK_URL } from '@/app/VAR'

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

function LoginCustomer() {
    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [openFail, setOpenFail] = React.useState(false)
    const [ablebutton, setAbleButton] = React.useState(true)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    React.useEffect(() => {
        if ((login != "") && (password.length > 6)) {
            setAbleButton(true)
        } else {
            setAbleButton(false)
        }
    }, [login, password])

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
        axios.post(`${BACK_URL}/api/customers/login/`,
            {
                "username": login,
                "password": password
            }
        ).then((res) => {
            localStorage?.setItem("TOKEN", res.data.token)
            localStorage?.setItem("USER_TYPE", "CUSTOMER")
            setOpen(true)
        }).catch(err => {
            // alert("Ошибка регистрации. Просьба позвонить в службу поддержки по номеру +996559808243. За уведомлене об ошибке закинем 500 сом на баланс")
            setOpenFail(true)
            setLogin("")
            setPassword("")
            console.log(err)
        })
    }
    return (
        <div className='LoginFactory'
        ><div className='LoginCard'>
                <div className='LoginCardHeader'>
                    <h4>
                        Войти
                    </h4>
                    <p>
                        В ОПТАЛ
                    </p>
                </div>
                <div className='LoginForm'>
                    <div className='LoginFormLogin'>
                        <p>
                            Ваш номер
                        </p>

                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="+996000000" variant="outlined" value={login} className='input' onChange={e => {
                            setLogin(e.target.value)
                        }}>

                        </TextField>
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
                    <Button variant='contained' fullWidth className='LoginSubmitButton' disabled={!ablebutton} onClick={handleSubmit} style={ablebutton ? { backgroundColor: "#CD0000" } : { backgroundColor: "rgba(0, 0, 0, 0.549)", color: "rgb(222,222,222)" }}>
                        Войти
                    </Button>
                </div>
            </div>
            <div className='RegisterFirst'>
                <p>
                    Ещё нет аккаунта? <Link href='/register-customer' className='Link'>Зарегистрироваться</Link>
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
                    <Link href="/account-customer">
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
                    <Button variant='contained' onClick={() => setOpenFail(false)}>
                        попробывать еще раз
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default LoginCustomer