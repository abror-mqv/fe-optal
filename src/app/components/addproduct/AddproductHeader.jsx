import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

import '../../styles/components/_addproduct.scss'

function AddproductHeader({ onSubmit }) {
    return (
        <header>
            <Button className='close' >
                <CloseIcon />
            </Button>
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