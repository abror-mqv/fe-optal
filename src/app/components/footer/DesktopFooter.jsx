import React from 'react'
import '@/app/styles/components/_footer.scss'
import Link from 'next/link'
import Image from 'next/image'

import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GestureIcon from '@mui/icons-material/Gesture';

function DesktopFooter() {
  return (
    <div className='Footer'>
      <div className='FooterLogo'>

        <Image src="/optal_logo.svg" width={80} height={80} />
        <Link href='#'>
          <h4>
            Optal.ru
          </h4>
        </Link>

      </div>
      <div className='FooterInfo'>
        <div className='Top'>
          <div className='LinkList'>
            <Link href="#">
              О наc
            </Link>
            <Link href="#">
              Доставка
            </Link>
            <Link href="#">
              Цены
            </Link>
            <Link href="#">
              Отзывы
            </Link>
            <Link href="#">
              Гарантии
            </Link>
          </div>
          <div className='MediaLinks'>
            <Link href='https://www.instagram.com/optal.ru/'>
              <InstagramIcon />
            </Link>
            <Link href='https://t.me/optal_ru'>
              <TelegramIcon />
            </Link>
            <Link href='https://x.com/abror_mqv'>
              <XIcon />
            </Link>
            <Link href='https://wa.me/996559808243'>
              <WhatsAppIcon />
            </Link>

            <Link href='#'>
              <YouTubeIcon />
            </Link>
            <Link href='#'>
              <GestureIcon />
            </Link>
          </div>
        </div>
        <div className='Divider'>

        </div>
        <div className='Bottom'>
          <div className='LinkList'>
            <Link href="#">
              Политика конфиденциальности
            </Link>
            <Link href="#">
              Условия пользования
            </Link>
            <Link href="#">
              Условия платежей
            </Link>
            <Link href="#">
              Карта сайта
            </Link>
            <Link href="#">
              Для специальных предложений
            </Link>
            <Link href="#">
              Связаться с владельцем
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopFooter