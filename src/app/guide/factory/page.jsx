import React from 'react'
import FactoryGuide from './components/FactoryGuide'
import './FactoryGuide.scss'
import Header from '@/app/components/header/Header'

function page() {
    return (
        <div className='FactoryGuide'>
            <Header />
            <header className='FactoryGuideHeader'>
                <h1>
                    Как пользоваться optal.ru
                </h1>
                <h3>
                    Руководство продавца (производителя)
                </h3>
            </header>
            <FactoryGuide />
        </div>
    )
}

export default page