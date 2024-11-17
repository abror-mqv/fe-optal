"use client"

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React from 'react'

import '@/app/styles/components/_loginfactory.scss'
import Header from '../header/Header'
import Link from 'next/link'

function LoginFactory() {

    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
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
                    <Button variant='contained' fullWidth className='LoginSubmitButton'>
                        Войти
                    </Button>
                </div>
            </div>
            <div className='RegisterFirst'>
                <p>
                    Ещё нет аккаунта? <Link href='/newfactory' className='Link'>Зарегистрироваться</Link>
                </p>

            </div>
        </div>
    )
}

export default LoginFactory