import React from 'react'

import '../styles/components/_factory_cabinet.scss'
import FactoryProducts from '../components/factory_products/FactoryProducts'

function page() {
    return (
        <div className='factory_cabinet'>
            <header>
                Личный кабинет
            </header>
            <div className="products">
                <FactoryProducts    />
            </div>
        </div>
    )
}

export default page