'use client'


import Header from '@/app/components/header/Header'
import React, { useState } from 'react'
import SubsHeader from './SubsHeader'
import Content from './Content'
import Footer from '@/app/components/footer/Footer'
import './Subs.scss'


function Subs() {
    const [openShareModal, setOpenShareModal] = useState(false)
    const [urlToShare, setUrlToShare] = useState("")


    return (
        <div className='SubsPage'>
            <Header />
            <SubsHeader />
            <Content />
            <Footer />
        </div>
    )
}

export default Subs