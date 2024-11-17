import React from 'react'
import '@/app/styles/components/_support.scss'
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Link from 'next/link';


function Support() {
    return (
        <div className='Support'>
            <h1>
                Часто задаваемые вопросы (FAQ)
            </h1>
            <div className='FAQ'>
                <h4>
                    1. Как восстановить доступ к аккаунту?
                </h4>
                <p>
                    Если вы забыли пароль, нажмите на кнопку "Забыли пароль?" на странице входа и следуйте инструкциям для его восстановления
                </p>
            </div>
            <div className='FAQ'>
                <h4>
                    2. Почему не получается загрузить файл?
                </h4>
                <p>
                    Проверьте размер и формат файла. Мы принимаем файлы размером до 10 МБ в форматах JPG, PNG, PDF
                </p>
            </div>
            <div className='FAQ'>
                <h4>
                    3. Как мне обновить свои данные в профиле?
                </h4>
                <p>
                    Перейдите в раздел "Мой профиль" и нажмите кнопку "Редактировать"
                </p>
            </div>
            <div className='TechSupport'>
                <p className='GoSupport'>
                    Или свяжитесь с нами:
                </p>
                <div className="contactList">
                    <div className='listitem'>
                        <Link href="https://wa.me/996559808243" target="_blank" class="contact-link">
                            Написать нам в WhatsApp <Button variant='contained' sx={{ backgroundColor: "#25d366" }}><WhatsAppIcon /></Button>
                        </Link>
                    </div>
                    <div className='listitem'>
                        <Link href="https://t.me/thinktank_kg" target="_blank" class="contact-link">
                            Написать нам в Telegram <Button variant='contained' sx={{ backgroundColor: "#24A1DE" }}> <TelegramIcon /></Button>
                        </Link>
                    </div>
                    <div className='listitem'>
                        <Link href="tel:+79991234567" className="contact-link">
                            Позвонить: +996 (559) 808-243 <Button variant='contained'> <LocalPhoneIcon /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support