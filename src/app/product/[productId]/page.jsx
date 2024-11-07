'use client'

import Header from '@/app/components/header/Header';
import { notFound } from 'next/navigation'; // Для обработки 404 ошибок
import axios from 'axios';
import ProductDetails from '@/app/components/product_details/ProductDetails';;


const product = {
  factory: "Швейпромакс",
  factory_logo: "https://bulak.kg/wp-content/uploads/2023/11/Bez-nazvaniya-1.png",
  name: "Блузка базовая DeFacto",
  description: "Lorem ipsum dolor sit amed. Lorem ipsum dolor sit amed sit amed dolor imagocos ",
  price: "350",
  image: "https://ir.ozone.ru/s3/multimedia-1-u/wc1000/7082871474.jpg",
  line_sizes: [
    38, 39, 40, 41, 41, 42, 43, 44
  ],
  colors: [
    {
      id: 1,
      color_hex: "A2D2DF",
      color_name: "Светлый синий",
      color_image: "https://basket-12.wbbasket.ru/vol1872/part187217/187217779/images/big/2.webp",
      in_stock: true
    },
    {
      id: 2,
      color_hex: "F6EFBD",
      color_name: "Пшеничный",
      color_image: "https://basket-15.wbbasket.ru/vol2383/part238377/238377705/images/big/1.webp",
      in_stock: true
    },
    {
      id: 3,
      color_hex: "E4C087",
      color_name: "Грязный",
      color_image: "https://basket-11.wbbasket.ru/vol1605/part160585/160585517/images/big/1.webp",
      in_stock: true
    },
    {
      id: 4,
      color_hex: "BC7C7C",
      color_name: "Золотой",
      color_image: "https://basket-15.wbbasket.ru/vol2383/part238378/238378566/images/big/1.webp",
      in_stock: true
    },
    {
      id: 5,
      color_hex: "789DBC",
      color_name: "Сизый",
      color_image: "https://basket-12.wbbasket.ru/vol1872/part187216/187216787/images/big/2.webp",
      in_stock: true
    }
  ]
}
export default function ProductPage({ params }) {
  return (
      <div>
        <Header />
        <ProductDetails product={product} />
      </div>
  );
}
