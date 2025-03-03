import React from 'react'
import BoxProductCard from './BoxProductCard'

function Razdel(razdel, handleOpenQAModal, handleOpenCAModal) {
    return (
        <div className='BoxViewRazdel'>

            <h3 className='RazdelTop'>{razdel.razdel.name}</h3>

            <div className='sub_feed'>
                {
                    razdel.razdel.products.map((product, index) => {
                        return (
                            <BoxProductCard
                                name={product.name}
                                id={product.id}
                                price={product.price}
                                rate={5}
                                image={(product.color_variations[0]?.image) ? (product.color_variations[0].image) : null}
                                key={index}
                                setAuthError={handleOpenQAModal}
                                setCAError={handleOpenCAModal}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Razdel