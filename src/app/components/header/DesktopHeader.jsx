"use client"
import React, { useState, useEffect } from 'react'
import '../../styles/components/_desktop_header.scss';
import Image from 'next/image';
import SearchBar from './SearchBar';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CatItem from './CatItem';
import { BACK_URL } from '@/app/VAR';

function DesktopHeader() {
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACK_URL}/api/cats`);
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            <header>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            {categories.map(el => {
                                return (
                                    <CatItem data={el} key={el.id} />
                                )
                            })}
                        </List>
                        <Divider />

                    </Box>
                </Drawer>
                <div className='LeftSection'>
                    <div className='Logo'>
                        OPTAL
                    </div>

                    <kButton className='Catalog' onClick={toggleDrawer(true)}>
                        <div className='Catalog_img'>
                            <Image src="/catalog.svg" width={40} height={40} />
                        </div>
                        <div className='Catalog_char'>
                            КАТАЛОГ
                        </div>
                    </kButton>
                    <div className='SearchContainer'>
                        <SearchBar />
                        <button>
                            НАЙТИ
                        </button>
                    </div>
                </div>


                <div className='RightSection'>
                    <button className='Cart'>
                        <Image src='/cart.svg' width={40} height={40} />
                    </button>
                    <button className='Cart'>
                        <Image src='/profile.svg' width={40} height={40} />
                    </button>
                </div>

            </header>
            <div className='header_block'>

            </div>
        </>
    )
}

export default DesktopHeader