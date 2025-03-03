import React, { useState } from 'react'
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
import BoxProductList from './BoxProductList';
import CreateNewStoreCategoryModal from './modals/CreateNewStoreCategoryModal';
const products = false
function AccountBoxProducts({ products, handleDelete, reload }) {
    const [openStoreCategoryModal, setOpenStoreCategoryModal] = useState(false)

    const handleOpenSCModal = () => {
        setOpenStoreCategoryModal(true)
    }
    const handleCloseSCModal = () => {
        setOpenStoreCategoryModal(false)
    }

    const handleCreateNewStoreCategory = () => {
        handleOpenSCModal()
    }

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
                        <Link href="/box-addproduct">

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

                    <Button variant='contained' fullWidth sx={{ background: "#343131", marginBottom: 4, display: "flex", justifyContent: "space-between" }} onClick={() => {
                        handleCreateNewStoreCategory()
                        console.log(12312)
                    }}>
                        Добавить раздел <AddCircleIcon />
                    </Button>




                    <Link href="/box-addproduct">
                        <Button variant='contained' fullWidth sx={{ background: "#CD0000", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                            Добавить товар <AddCircleIcon />
                        </Button>
                    </Link>

                    <BoxProductList products={products} handleDelete={handleDelete} reload={reload}/>
                </div>
                <CreateNewStoreCategoryModal open={openStoreCategoryModal} onClose={handleCloseSCModal} reload={reload}/>
            </div >
        )
    }

}

export default AccountBoxProducts


