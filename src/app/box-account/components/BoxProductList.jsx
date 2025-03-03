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
import axios from 'axios';
import Razdel from './Razdel';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function BoxProductList({ products, handleDelete, reload }) {



    return (
        <div className='ProductList'>
            {
                products.map((razdel, index) => {
                    // if (razdel.products.length == 0) {
                    //     return (
                    //         <p key={index}>
                    //             Нет товаров в этом разделе
                    //         </p>
                    //     )
                    // } else {
                    //     return (
                    //         <Razdel key={index} name={razdel.name} handleDelete={handleDelete} products={razdel.products} categoryId={razdel.id} reload={reload} />
                    //     )
                    // }
                    return (
                        <Razdel key={index} name={razdel.name} handleDelete={handleDelete} products={razdel.products} categoryId={razdel.id} reload={reload} />
                    )

                })
            }
        </div>
    )
}

export default BoxProductList