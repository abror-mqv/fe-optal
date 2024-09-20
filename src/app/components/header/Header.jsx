import React from 'react'
import '../../styles/components/_header.scss';
import { Button } from '@mui/material';
import Image from 'next/image';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header>
      <div className='LeftSection'>
        <button className='Logo'>
          OPTAL
        </button>
        <button className='Catalog'>
          <div className='Catalog_img'>
            <Image src="catalog.svg" width={40} height={40} />
          </div>
          <div className='Catalog_char'>
            КАТАЛОГ
          </div>
        </button>
        <div className='SearchContainer'>
          <SearchBar />
          <button>
            НАЙТИ
          </button>
        </div>
      </div>


      <div className='RightSection'>
        <button className='Cart'>
          <Image src='cart.svg' width={40} height={40} />
        </button>
        <button className='Cart'>
          <Image src='profile.svg' width={40} height={40} />
        </button>
      </div>

    </header>
  )
}

export default Header