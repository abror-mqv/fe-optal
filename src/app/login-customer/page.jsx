import React from 'react'
import LoginCustomer from '../components/Auth/LoginCustomer/LoginCustomer'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

function page() {
  return (
    <div>
      <Header />
      <LoginCustomer />
      <Footer />
    </div>
  )
}

export default page