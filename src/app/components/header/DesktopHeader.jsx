"use client"
import React, { useState, useEffect } from 'react'
import '../../styles/components/_desktop_header.scss';
import Image from 'next/image';
import SearchBar from './SearchBar';
import axios from 'axios';
import Button from '@mui/material/Button';
import { BACK_URL } from '@/app/VAR';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';


import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import SearchDesktop from './components/SearchDesktop';

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
                const response = await axios.get(`${BACK_URL}/api/factories/cats`);
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const ProfileLink = () => {
        if (!localStorage.getItem("TOKEN")) {
            return (
                <>
                    <Link href="/register-customer">
                        <ListItemButton
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"

                        >
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Зарегистрироваться" />
                        </ListItemButton>
                    </Link>
                    <Link href="/newfactory">
                        <ListItemButton
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"

                        >
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Начать продавать" />
                        </ListItemButton>
                    </Link>
                </>
            )
        } else if (localStorage.getItem("USER_TYPE") == "CUSTOMER") {
            return (
                <Link href="/account-customer">
                    <ListItemButton
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"

                    >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Личный кабинет" />
                    </ListItemButton>
                </Link>
            )
        } else if (localStorage.getItem("USER_TYPE") == "FACTORY") {
            return (
                <Link href="/account-factory">
                    <ListItemButton
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"

                    >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Личный кабинет" />
                    </ListItemButton>
                </Link>
            )
        }
    }

    return (
        <>

            <header className='DesktopHeader'>
                <div className='DesktopHeaderContainer'>


                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: 350 }} role="presentation">

                            <List>
                                <Link href={`/`}>
                                    <ListItemButton
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                    >
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={"OPTAL.RU"} />
                                    </ListItemButton>
                                </Link>

                                <ProfileLink />

                                <Link href={`/cart`}>
                                    <ListItemButton
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"

                                    >
                                        <ListItemIcon>
                                            <ShoppingCartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={"Корзина"} />
                                    </ListItemButton>
                                </Link>




                                {categories.map(cat => {
                                    return (
                                        <Accordion sx={{ boxShadow: "none" }} key={cat.id}>

                                            <AccordionSummary
                                                expandIcon={<Button variant='contained' sx={{ backgroundColor: "#252421" }}>
                                                    <ExpandMoreIcon />
                                                </Button>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Link href={`/category/${cat.id}`} sx={{ zIndex: "99999999" }}>
                                                    <Button variant='contained' sx={{ backgroundColor: "#CD0000" }}>
                                                        {cat.cat_name}
                                                    </Button>
                                                </Link>

                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {
                                                    cat.subcategories.map(subcat => {
                                                        return (
                                                            <Link href={`/subcategory/${subcat.id}`} key={subcat.id}>
                                                                <ListItemButton
                                                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                                    aria-haspopup="true"

                                                                >
                                                                    <ListItemIcon>
                                                                        <CallMissedOutgoingIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={subcat.subcat_name} />
                                                                </ListItemButton>
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </AccordionDetails>
                                        </Accordion>

                                    )
                                })}
                            </List>

                        </Box>
                    </Drawer>
                    <div className='LeftSection'>
                        <Link href="/" className='Logo'>
                            <Image src="/optal_logo.svg" width={40} height={40} />
                            Optal.ru
                        </Link>

                        <kButton className='Catalog' onClick={toggleDrawer(true)}>
                            <div className='Catalog_img'>
                                <Image src="/catalog.svg" width={40} height={40} />
                            </div>
                            <div className='Catalog_char'>
                                КАТАЛОГ
                            </div>
                        </kButton>
                        <SearchDesktop />


                    </div>


                    <div className='RightSection'>
                        <Link href="/cart">
                            <Button variant='contained' sx={{ backgroundColor: "#CD0000", borderRadius: "10px" }}>
                                <ShoppingCartIcon sx={{ color: "white", fontSize: "32px", height: "48px !important" }} />
                            </Button>
                        </Link>

                        <Link href="/account-customer">
                            <Button variant='contained' sx={{ backgroundColor: "#CD0000", borderRadius: "10px" }}>
                                <AccountCircleIcon sx={{ fontSize: "48px", color: "white" }} />
                            </Button>
                        </Link>


                    </div>
                </div>
            </header>
            <div className='header_block'>

            </div>
        </>
    )
}

export default DesktopHeader