// "use client";

import React from 'react'
import '../../styles/components/_button.scss';
import Image from 'next/image';

import "../../styles/components/_product_card.scss"
import { Button } from '@mui/material';
import Link from 'next/link';
import { BACK_URL } from '@/app/VAR';

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import AddToCartButton from './AddToCartButton';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
function ProductCard(props) {
  const ImageHolder = () => {
    if (props.image) {
      return (
        <img src={`${BACK_URL}${props.image}`} alt="" />
      )
    } else {
      return (
        <div className='image'>
          <DoNotDisturbAltIcon />
          <span>
            Нет изображения
          </span>
        </div>
      )
    }

  }
  return (

    <div className='ProductCard'>
      <div className='img_block'>
        <Link href={`/product/${props.id}`}>
          <ImageHolder />
        </Link>
      </div>
      <div className='info_block'>
        <p className='price'><CurrencyFormatter amount={props.price} /></p>
        <Link href={`/product/${props.id}`}>
          <h3>
            {props.name}
          </h3>
        </Link>
        {/* <p className='rate'>
          <Image src='/star.svg' width={22} height={22} />  {(Math.floor(Math.random() * 15) / 10) + 3.5} • {Math.floor(Math.random() * 20) + 3} оценок
        </p> */}
        <AddToCartButton productId={props.id} setAuthError={props.setAuthError} setCAError={props.setCAError} />
      </div>
    </div>
  )
}

export default ProductCard