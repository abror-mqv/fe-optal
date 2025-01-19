import CheckOut from '@/app/components/checkout/CheckOut'
import Footer from '@/app/components/footer/Footer'
import Header from '@/app/components/header/Header'
import React from 'react'

function page() {
  return (
    <div>
      <Header />
      <CheckOut />
      <Footer />
    </div>
  )
}

export default page