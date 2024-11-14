import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

import '../../styles/components/_addproduct.scss'
import Link from 'next/link';

function AddproductHeader({ onSubmit }) {
    return (
        <header style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <Link href="/account-factory">
                <Button className='close' >
                    <CloseIcon />
                </Button>
            </Link>

            <div className='title'>
                Новый товар
            </div>
            <div className='submit'>
                <Button variant="contained" onClick={onSubmit}>
                    ГОТОВО <AddCircleOutlineIcon />
                </Button>
            </div>
        </header>
    )
}

export default AddproductHeader