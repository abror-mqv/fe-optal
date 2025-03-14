import React, { useState } from 'react'
import { Button } from '@mui/material'
import PromoConfirmationModal from './PromoConfirmationModal'

function OnePromo({ promo, productId, productName }) {
    const [open, setOpen] = useState(false)

    return (
        <div className='OnePromo'>
            <h3>
                {promo.title}
            </h3>
            <p className='description'>
                {promo.description_for_factory}
            </p>
            <p className='recomended_drop'>
                <span>Рекомендуемая скидка</span><span>{promo.recommended_drop}</span>
            </p>
            <div className='actionButtons'>
                <p className='actionDescription'>
                    Заявки рассматривает <br /> наша команда
                </p>
                <Button sx={{ background: "#fff" }} onClick={() => {
                    setOpen(true)
                }}>
                    Подять заявку
                </Button>
            </div>
            <PromoConfirmationModal open={open} onClose={() => {
                setOpen(false)
            }} productName={productName} productId={productId} promoName={promo.title} promoId={promo.id} />
        </div>
    )
}

export default OnePromo