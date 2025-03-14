import React from 'react'
import SalesHeader from './components/SalesHeader'
import Promos from './components/Promos'
import "./Sales.scss"

function Sales({ productId }) {
  return (
    <div className='SalesTab'>
      <SalesHeader />
      <Promos productId={productId} />
    </div>
  )
}

export default Sales