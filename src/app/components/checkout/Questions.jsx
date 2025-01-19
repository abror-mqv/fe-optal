import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'

function Questions() {
    return (
        <div className='questions'>
            <div className='question'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <p className='summary'>Как происходит заказ?</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className='check'>
                            Вы подтверждаете заказ, в котором уже указаны выбранные товары, их цветовые вариации и количество
                        </p>
                        <p className='check'>
                            После вашего подтверждения, мы приступаем к уточнению наличия всех позиций у наших поставщиков
                        </p>
                        <p className='check'>
                            Если все позиции доступны, мы свяжемся с вами для подтверждения и выставления счета
                        </p>

                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <p className='summary'>Как происходит оплата?</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className='check'>
                            После подтверждения наличия всех товаров, мы отправляем вам счет для оплаты.
                        </p>
                        <p className='check'>
                            Оплата осуществляется банковским переводом на основании выставленного счета.
                        </p>
                        <p className='check'>
                            После получения оплаты, мы запускаем процесс подготовки и доставки вашего заказа.
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Questions