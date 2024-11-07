// "use client";

import React from 'react'
import '../../styles/components/_button.scss';
import Image from 'next/image';

function ProductCard(props) {

  return (
    <div className='ProductCard'>
      <div className='img_block'>
        <img src={props.image} alt="" />
      </div>
      <div className='info_block'>
        <p className='price'>{props.price} р</p>
        <h3>
          {props.name}
        </h3>
        <p className='rate'>
          <Image src='star.svg' width={22} height={22} />  {props.rate} • 12 оценок
        </p>
        <button>
          <Image src="logistics.svg" alt="" width={36} height={36} />
          ДОБАВИТЬ
        </button>
      </div>
    </div>
  )
}

export default ProductCard