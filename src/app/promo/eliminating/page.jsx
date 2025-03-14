import React from 'react'
import Eliminating from './components/Eliminating'
import Header from '@/app/components/header/Header'
import Footer from '@/app/components/footer/Footer'
import './Eliminating.scss'

function page() {
    return (
        <div className='Eliminating'>
            <Header />
            <Eliminating />
            <Footer />
        </div>
    )
}

export default page