import React from 'react'
import './ProductList.scss'
import Razdel from '@/app/box-account/components/Razdel'



function BoxProductList({ products, handleDelete, reload }) {



    return (
        <div className='ProductList'>
            {
                products.map((razdel, index) => {
                    return (
                        <Razdel key={index} name={razdel.name} handleDelete={handleDelete} products={razdel.products} categoryId={razdel.id} reload={reload} />
                    )

                })
            }
        </div>
    )
}

export default BoxProductList