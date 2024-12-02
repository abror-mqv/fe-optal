'use client'

import Header from '@/app/components/header/Header';
import { notFound } from 'next/navigation'; // Для обработки 404 ошибок
import axios from 'axios';
import ProductDetails from '@/app/components/product_details/ProductDetails';;


export default function ProductPage({ params }) {
  return (
    <div>
      <Header />
      <ProductDetails />
    </div>
  );
}
