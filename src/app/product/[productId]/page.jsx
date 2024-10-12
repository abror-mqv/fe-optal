'use client'

import Header from '@/app/components/header/Header';
import { notFound } from 'next/navigation'; // Для обработки 404 ошибок
import axios from 'axios';


const product = {
  name: "Adids",
  description: "Lorem ipsum dolor sit amed",
  price: "12039",
  image: "https://ir.ozone.ru/s3/multimedia-1-u/wc1000/7082871474.jpg"
}
export default function ProductPage({ params }) {




  return (
    <div>
      <Header />
      <h2>{params.productId}</h2>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}
