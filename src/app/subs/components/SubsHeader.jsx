import { useRouter } from "next/navigation";
import { Button, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react'

function SubsHeader() {
    const router = useRouter();

    return (
        <header className='SubsHeader'>

            <h2 style={{
                display: "flex",
                gap: "12px"
            }}>
                <IconButton onClick={() => { router.back() }} variant='outlined' sx={{ display: "flex", gap: "12px", color: "#222", border: "1px solid #222" }}><ArrowBackIosNewIcon /></IconButton>
                Сохранные продавцы
            </h2>
        </header>
    )
}

export default SubsHeader