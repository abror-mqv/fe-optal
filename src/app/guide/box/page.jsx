import React from 'react'
import BoxGuide from './components/BoxGuide'
import "./BoxGuide.scss"
import BoxHeader from '@/app/box/[box_id]/components/BoxHeader'
import Footer from '@/app/components/footer/Footer'

function page() {
    return (
        <main className='BoxGuide'>
            <BoxHeader />
            <header>
                <h1 className='GuideHeading'>
                    Как пользоваться optal.ru
                </h1>
                <h3>
                    Руководство Бокса (контейнера)
                </h3>
            </header>
            <BoxGuide />
            <Footer />
        </main>
    )
}

export default page