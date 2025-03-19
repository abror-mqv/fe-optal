import { BACK_URL } from '@/app/VAR'
import { Avatar, Button, IconButton } from '@mui/material'
import React from 'react'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Link from 'next/link';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';


function OneBox({ box_data, setShareModalOpen, setUrlToShare, reload }) {

    const handleFetchedRemove = () => {
        axios.post('/api/subscriptions/unsubscribe/', {
            box_id: box_data.supplier_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },

            }
        ).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleLocalRemove = () => {
        const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
        const updatedSubscriptions = subscriptions.filter(id => id !== box_data.supplier_id);
        localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
        reload()
    }
    const handleRemove = (supplier_id) => {
        if (localStorage.getItem("TOKEN") == undefined) {
            handleLocalRemove()
        } else {
            if (localStorage.getItem("USER_TYPE" == "CUSTOMER")) {
                alert("LETS DO FETCH")
                handleFetchedRemove()
            } else {
                handleLocalRemove()
            }
        }

    }


    return (
        <div className='OneBox'>


            <Link href={`/box/${box_data.supplier_id}`} className='Info'>
                <div className='Avatar'>
                    <Avatar src={`${BACK_URL}${box_data.avatar}`} sx={{ width: 64, height: 64 }} />
                </div>
                <div className='Name'>
                    <h3>
                        {box_data.factory_name}
                    </h3>
                </div>
            </Link>



            <div className='Action'>
                <IconButton onClick={() => {
                    setShareModalOpen(true)
                    setUrlToShare(`https://optal.ru/box/${box_data.supplier_id}`)
                }}>
                    <ShareIcon />
                </IconButton>

                <IconButton onClick={() => {
                    handleRemove(box_data.supplier_id)
                }}>
                    <PlaylistRemoveIcon />
                </IconButton>
            </div>


        </div>
    )
}

export default OneBox