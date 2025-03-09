import { Chip, TextField } from '@mui/material'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function PriceComponent({ price, setPrice, percentage }) {
    const targetPrice = (price * (1 + percentage / 100)).toFixed(0)
    return (
        <div className='forma price'>
            <div className='chip'>
                <Chip sx={{ width: "100%" }} label="Цена за 1 штуку товара" />
            </div>
            <div className='PriceForm'>
                <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="" variant="outlined" value={price} className='input' onChange={e => {
                    setPrice(e.target.value)
                }}>

                </TextField>

            </div>
            <div className='TargetPrice'>
                <Chip sx={{ width: "100%", display: "flex", justifyContent: "space-between", border: "1px solid #009427" }} label={<><span>Итоговая цена:</span><span><strong>{targetPrice}</strong> сом</span></>} />
                <div className='ComissionExplanations'>
                    <p className='ComissionExplanation'><PercentIcon sx={{ color: "#CD0000" }} /> Сервис optal.ru берет {percentage}% на покрытие расходов по рекламе</p>
                    <p className='ComissionExplanation'><InfoIcon sx={{ color: "#09000092" }} /> Комиссия помогает вам продавать: она покрывает продвижение и поддержку.</p>
                    <p className='ComissionExplanation'><TrendingUpIcon sx={{ color: "#009427" }} /> Средства идут на маркетинг, рекламу и удобство продаж для вас.</p>
                </div>

            </div>

        </div>
    )
}

export default PriceComponent