import React from 'react'
import './Contact.scss'
import { Button } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Link from 'next/link';


function Contact() {
    return (
        <div className='Contact'>
            <h1>
                Связь с командой Optal.ru
            </h1>
            <div className='content'>
                <div className='Variant'>
                    <div className='info'>
                        <div className='icon'>
                            <WhatsAppIcon sx={{ color: "#25D366" }} />
                        </div>
                        <p>
                            Напишите нам по WhatsApp
                        </p>
                    </div>
                    <div className='actions'>
                        <Link href="https://wa.me/+996556010516">

                        </Link>
                        <Button variant='outlined'>
                            Написать
                        </Button>
                    </div>
                </div>
                <div className='Variant'>
                    <div className='info'>
                        <div className='icon'>
                            <TelegramIcon sx={{ color: "#27A7E7" }} />
                        </div>
                        <p>
                            Напишите нам в Telegram
                        </p>
                    </div>
                    <div className='actions'>
                        <Link href="https://t.me/+996556010516">
                            <Button variant='outlined'>
                                Написать
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className='Variant'>
                    <div className='info'>
                        <div className='icon'>
                            <PhoneEnabledIcon />
                        </div>

                        <p>
                            Позвоните нам
                        </p>
                    </div>
                    <div className='actions'>
                        <Link href="tel:+996556010516">
                            <Button variant='outlined'>
                                Позвонить
                            </Button>
                        </Link>

                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Contact