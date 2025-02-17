import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Switch } from '@mui/material';
import { BACK_URL } from '@/app/VAR';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import './ProductList.scss'
import Link from 'next/link';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function ProductList({ products, handleDelete }) {
    return (
        <div className='ProductList'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя товара</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Расцветки</TableCell>
                            <TableCell align="right">В наличии</TableCell>
                            <TableCell align="right">Редактировать</TableCell>
                            <TableCell align="right">Удалить</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((product, index) => {
                                return (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>

                                            <Link href={`/product/${product.id}`} className='product_main_info'>
                                                <div className='image_container'>
                                                    <img src={`${BACK_URL}/${product.color_variations[0].image}`} />
                                                </div>

                                                {product.name}
                                            </Link>

                                        </TableCell>
                                        <TableCell align="right">
                                            {product.price}
                                        </TableCell  >
                                        <TableCell align="right">
                                            {product.color_variations.length}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Switch {...label} defaultChecked />
                                        </TableCell>

                                        <TableCell align="right">
                                            <Link href={`/account-factory/update-product/${product.id}`}>
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
        </div>
    )
}

export default ProductList