'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'


import "./BoxLogin.scss"
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { BACK_URL } from '@/app/VAR'

function BoxLogin() {
    const { box_login } = useParams()
    const { box_imagoco } = useParams()


    useEffect(() => {

        axios.post(`${BACK_URL}/api/factories/login/`,
            {
                "username": box_login,
                "password": box_imagoco
            }
        ).then((res) => {
            localStorage?.setItem("TOKEN", res.data.token)
            localStorage?.setItem("USER_TYPE", "FACTORY")
            window.location.replace("/box-account")
        }).catch(err => {
            console.log(err)
        })

    }, [box_login, box_imagoco])


    return (
        <div className='BoxBl'>
            < div className='ChildBoxBl'>
                <h3>
                    Проверяем <br />
                    QR-код
                </h3>
                <CircularProgress size="3rem" />
            </ div>
        </div>
    )
}

export default BoxLogin