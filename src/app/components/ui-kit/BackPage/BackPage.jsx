import { ArrowBack } from '@mui/icons-material'
import { Chip } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ReplyIcon from '@mui/icons-material/Reply';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './BackPage.scss'

function BackPage({ backs }) {
    return (
        <div className='BackPage'>
            {
                backs.map((el, index) => {
                    return (
                        <Link href={el.url} key={index}>
                            <Chip label={el.label} icon={<ArrowLeftIcon />} />
                        </Link>
                    )
                })
            }
        </div>

    )
}

export default BackPage