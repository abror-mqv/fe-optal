import { Button } from '@mui/material'
import Link from 'next/link'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'

function Header({ onSubmit }) {
    return (
        <header style={{ flexDirection: "row", justifyContent: "flex-start", gap: "24px", width: "100%" }}>
            <Link href="/account-factory">
                <Button className='close' >
                    <CloseIcon />
                </Button>
            </Link>

            <div className='title'>
                Редактировать товар
            </div>
            <div className='submit'>
                
            </div>
        </header>
    )
}

export default Header