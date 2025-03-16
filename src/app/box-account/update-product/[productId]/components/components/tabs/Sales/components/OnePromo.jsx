import React, { useState } from 'react'
import { Button } from '@mui/material'
import PromoConfirmationModal from './PromoConfirmationModal'
import CloseIcon from '@mui/icons-material/Close';
import PromoDeleteModal from './DeletedModal';

function OnePromo({ promo, productId, productName, reload }) {
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const ActionsButtons = () => {

        if (promo.exist) {
            return (
                <div className='actionButtonsExist'>
                    <p>
                        Этот товар уже <br /> участвует в акции
                    </p>
                    <Button color='error' variant='contained' onClick={() => setOpenDelete(true)}>
                        <CloseIcon />
                    </Button>

                </div>
            )
        } else {
            return (
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
            )
        }

    }


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
            <ActionsButtons />
            <PromoConfirmationModal open={open} onClose={() => {
                setOpen(false)
            }} productName={productName} productId={productId} promoName={promo.title} promoId={promo.id} reload={reload} />
            <PromoDeleteModal open={openDelete} onClose={() => {
                setOpenDelete(false)
            }} productName={productName} productId={productId} promoName={promo.title} promoId={promo.id} reload={reload} />
        </div>
    )
}

export default OnePromo