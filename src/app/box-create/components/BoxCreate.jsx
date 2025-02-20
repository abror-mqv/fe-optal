'use client'

import React, { useState, useEffect } from 'react'
import { Container, Typography, TextField, Button, Modal, Box, InputAdornment, InputLabel, OutlinedInput, IconButton, FormControl } from '@mui/material';

import './BoxCreate.scss'
import BoxHeader from '@/app/box/[box_id]/components/BoxHeader'
import Link from 'next/link'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { AccountCircle } from '@mui/icons-material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';

function BoxCreate() {
    const [factoryNumber, setFactoryNumber] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [factoryName, setFactoryName] = React.useState("")

    const [ablebutton, setAbleButton] = React.useState(true)

    const [open, setOpen] = React.useState(false)
    const [openFail, setOpenFail] = React.useState(false)

    const handleClose = () => {
        setOpen(true)
    }

    React.useEffect(() => {
        console.log([factoryName.length, factoryNumber.length, firstName])
        if ((factoryName.length > 4) && (factoryNumber.length > 9) && (firstName != "")) {
            setAbleButton(true)
        } else {
            setAbleButton(false)
        }
    }, [factoryName, factoryNumber, firstName])

    const sendData = () => {
        axios.post(`${BACK_URL}/api/factories/box-create/`,
            {
                "username": factoryNumber,
                "first_name": firstName,
                "factory_name": factoryName,
            }
        ).then((res) => {
            setOpen(true)
        }).catch(err => {
            setOpenFail(true)
            console.log(err)
        })
    }
    return (
        <div>
            <BoxHeader />
            <main className='BoxCreate'>
                <h1>
                    Регистрация Бокса
                </h1>
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
                                <TextField type="number" fullWidth id="outlined-basic" label="Номер" variant="outlined" value={factoryNumber} className='input' onChange={e => {
                                    setFactoryNumber(e.target.value)
                                }}>

                                </TextField>
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

            </main>

        </div>
    )
}

export default BoxCreate