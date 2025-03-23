"use client";

import React, { useState } from 'react'
import '../../styles/components/_button.scss';
import Image from 'next/image';

import "../../styles/components/_product_card.scss"
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { BACK_URL } from '@/app/VAR';

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import AddToCartButton from './AddToCartButton';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import VisibilityIcon from '@mui/icons-material/Visibility';
function ProductCard(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


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

    <div className='ProductCard' onClick={toggleMenu}>
      <div className='img_block'>
        {/* <Link href={`/product/${props.id}`}> */}
        <ImageHolder />
        {/* </Link> */}
      </div>
      <div className='info_block'>
        {/* <Link href={`/product/${props.id}`}> */}
        <h3>
          {props.name}
        </h3>
        {/* </Link> */}
        <p className='price'>
          <div className='colors'>
            {
              props.color_variations.map((colo, index) => {
                return (
                  <div key={index} className='OneColor' style={{ backgroundColor: colo.color_code }}>

                  </div>
                )
              })
            }
          </div>
          <CurrencyFormatter amount={props.price} />
        </p>

        {/* <AddToCartButton productId={props.id} setAuthError={props.setAuthError} setCAError={props.setCAError} /> */}
      </div>
      <Box
        sx={{
          position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          height: showMenu ? "90px" : "0px",
          overflow: "hidden",
          backgroundColor: "#eaeaea",
          // width: "calc(50vw - 30px)%",
          transition: "height 0.3s",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "0px 6px",
          borderRadius: "0px 0px 6px 6px "
        }}
        className="ActionsBox"
      >
        <Link href={`/product/${props.id}`}>
          <Button fullWidth sx={{ marginTop: "6px", display: "flex", gap: "12px", color: "#fff", backgroundColor: "#cd0000" }} variant="contained" color="primary"><VisibilityIcon /> Открыть</Button>

        </Link>

        <AddToCartButton productId={props.id} setAuthError={props.setAuthError} setCAError={props.setCAError} />
      </Box>
    </div>
  )
}

export default ProductCard