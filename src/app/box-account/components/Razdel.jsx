import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, IconButton, Switch } from '@mui/material';
import { BACK_URL } from '@/app/VAR';
import SettingsIcon from '@mui/icons-material/Settings';
import EditRazdel from './modals/EditRazdel';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Razdel({ name, products, categoryId, reload, handleDelete }) {
    const [open, setOpen] = useState(false)


    const handleCheckChange = (event, product_id) => {
        console.log(event.target.checked, product_id)
        axios.patch(
            `${BACK_URL}/api/factories/products/${product_id}/update-stock/`,
            { in_stock: event.target.checked },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("TOKEN")}`,
                    "Content-Type": "application/json",
                },
            }
        ).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    };
    return (
        <div className='OneRazdel'>
            <h3>
                {name}
                {
                    (typeof (categoryId) != "object") ? <SettingsIcon onClick={() => {
                        setOpen(true)
                    }} /> : null
                }

            </h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        {
                            products.length == 0 ? <TableCell>Нет товаров в этом разделе</TableCell> : <TableRow>
                                <TableCell>Имя товара</TableCell>
                                <TableCell align="right">Цена</TableCell>
                                <TableCell align="right">Расцветки</TableCell>
                                <TableCell align="right">Наличие</TableCell>
                                <TableCell align="right">Редактировать</TableCell>
                                <TableCell align="right">Удалить</TableCell>

                            </TableRow>
                        }

                    </TableHead>
                    <TableBody>
                        {


                            products.map((product, index) => {
                                return (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>

                                            <Link href={`/BoxSingleProduct/${product.id}`} className='product_main_info'>
                                                <div className='image_container'>
                                                    <img src={`${BACK_URL}/${product.color_variations[0].image}`} />
                                                </div>

                                                {product.name}
                                            </Link>

                                        </TableCell>
                                        <TableCell align="right">
                                            {product.price_with_commission}
                                        </TableCell  >
                                        <TableCell align="right">
                                            {product.color_variations.length}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Switch {...label} defaultChecked={product.in_stock} onChange={(event) => handleCheckChange(event, product.id)} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <Link href={`/box-account/update-product/${product.id}`}>
                                                <IconButton size="medium">
                                                    <EditIcon color='success' />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="medium" onClick={() => handleDelete(product.id)}>
                                                <ClearIcon color='error' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <EditRazdel open={open} onClose={() => setOpen(false)} initialName={name} categoryId={categoryId} reload={reload} />
        </div>
    )
}

export default Razdel