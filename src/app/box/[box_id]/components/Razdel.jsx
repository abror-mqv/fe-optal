import React from 'react'
import BoxProductCard from './BoxProductCard'
import { Button } from '@mui/material'

function Razdel({ razdel, handleOpenQAModal, handleOpenCAModal }) {
    return (
        <div className='BoxViewRazdel'>
            {
                (razdel.name == "Без раздела") ? <></> : <h3 className='RazdelTop'>{razdel.name}</h3>
            }


            <div className='sub_feed'>
                {
                    razdel.products.map((product, index) => {
                        return (
                            <BoxProductCard
                                name={product.name}
                                id={product.id}
                                price={product.price_with_commission}
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