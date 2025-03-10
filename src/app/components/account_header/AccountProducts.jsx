import React from 'react'
import '../../styles/components/_account_products.scss'
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { BACK_URL } from '@/app/VAR';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';





import axios from 'axios';
import ProductList from './ProductList';
const products = false
function AccountProducts({ products, handleDelete }) {

    if (
        products == false
    ) {
        return (
            <div>
                <div className='empty'>
                    <p>
                        Это - витрина вашего цеха <br></br>
                    </p>
                    <div>
                        <Link href="/addproduct">

                            <Button variant='contained'>
                                Добавить товар <AddCircleIcon />
                            </Button>
                        </Link>
                    </div>
                    <p>
                        Сейчас она пуста<br></br> Начните выкладывать свою продукцию,<br></br> чтобы появились первые покупатели
                    </p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='products'>
                    <Link href="/addproduct">
                        <Button variant='contained' fullWidth sx={{ background: "#CD0000", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                            Добавить товар <AddCircleIcon />
                        </Button>
                    </Link>

                    <ProductList products={products} handleDelete={handleDelete} />
                    {/* {
                        products.map(product => {
                            console.log(product)
                            return (
                                <Card sx={{ maxWidth: 420 }} key={product.id}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="320"
                                        image={`${BACK_URL}${product.color_variations[0]?.image}`}
                                    />
                                    <CardContent>
                                        <div className='first_info'>
                                            <h3>{product.name}</h3>
                                            <h3>{product.color_variations.length} цветовых вариаций</h3>
                                        </div>
                                        <div gutterBottom variant="h5" component="div">
                                            {product.price} ₽
                                        </div>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "end" }}>
                                        <Link href={`/product/${product.id}`}>
                                            <Button variant='contained' size="small"><VisibilityIcon /></Button>
                                        </Link>
                                        <Link href={`/account-factory/update-product/${product.id}`}>
                                            <Button color='success' variant='contained' size="small" ><EditIcon /></Button>
                                        </Link>
                                        <Button color="error" variant='contained' size="small" onClick={() => handleDelete(product.id)}><DeleteForeverIcon /></Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    } */}

                </div>
            </div >
        )
    }

}

export default AccountProducts


