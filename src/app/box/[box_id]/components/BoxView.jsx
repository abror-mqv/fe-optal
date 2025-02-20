'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import BoxHeader from './BoxHeader';
import BoxFooter from './BoxFooter';
import BoxContent from './BoxContent';
import Footer from '@/app/components/footer/Footer';

function BoxView() {
  const [categoryName, setCategroyName] = useState("")
  const [boxDescription, setBoxDescription] = useState("")
  const [supplierId, setSupplier] = useState("")

  const [data, setData] = useState([])

  const { box_id } = useParams();

  useEffect(() => {
    axios.get(`${BACK_URL}/api/factories/get-products-by-supplier-id/${box_id}/`).then(res => {
      console.log(res.data);
      setCategroyName(res.data.factory_name);
      setBoxDescription(res.data.factory_description)
      setData(res.data.products)
      setSupplier(res.data.supplier_id)
    })
  }, [])



  return (
    <div>
      <BoxHeader />
      <BoxContent data={data} box_name={categoryName} box_description={boxDescription} supplier_id={supplierId} />

      <Footer />
    </div>
  )
}

export default BoxView