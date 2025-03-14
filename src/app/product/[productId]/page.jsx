'use client'

import Header from '@/app/components/header/Header';
import { notFound } from 'next/navigation'; // Для обработки 404 ошибок
import axios from 'axios';
import ProductDetails from '@/app/components/product_details/ProductDetails'; import BoxHeader from '@/app/box/[box_id]/components/BoxHeader';
;


export default function ProductPage({ params }) {
  return (
    <div>
      {
        (localStorage.getItem("SELLER_TYPE") == "BOX") ? <BoxHeader /> : <Header />
      }
      <ProductDetails />
    </div>
  );
}
