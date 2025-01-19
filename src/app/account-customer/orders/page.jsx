import Orders from '@/app/components/AccountCustomer/Orders/Orders'
import Footer from '@/app/components/footer/Footer'
import Header from '@/app/components/header/Header'
import React from 'react'

function page() {
    return (
        <div>
            <Header />
            <Orders />
            <Footer />
        </div>
    )
}

export default page