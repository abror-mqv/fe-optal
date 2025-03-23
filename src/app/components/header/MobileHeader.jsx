"use client"
import React, { useState, useEffect } from 'react'
import "@/app/styles/components/_mobile_header.scss"
import '../../styles/components/_desktop_header.scss';
import Image from 'next/image';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Accordion, AccordionDetails, AccordionSummary, Badge, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BACK_URL } from '@/app/VAR';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import SearchBar from './components/Search';
import DnsIcon from '@mui/icons-material/Dns';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

function MobileHeader() {
    const [open, setOpen] = useState(false);
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


    // const ProfileLink = () => {
    //     if (typeof window !== 'undefined') {
    //         if (localStorage?.getItem("TOKEN") == "undefined") {
    //             return (
    //                 <Link href={'/account-factory'}>
    //                     <ListItemButton
    //                         aria-controls={open ? 'demo-positioned-menu' : undefined}
    //                         aria-haspopup="true"

    //                     >
    //                         <ListItemIcon>
    //                             <AccountBoxIcon />
    //                         </ListItemIcon>
    //                         <ListItemText primary={"Мой профиль"} />
    //                     </ListItemButton>
    //                 </Link>
    //             )
    //         }else if(localStorage.getItem("USER_TYPE") == "FACTORY"){

    //         }
    //     }
    //     else {
    //         <Link href={'/newfactory'}>
    //             <ListItemButton
    //                 aria-controls={open ? 'demo-positioned-menu' : undefined}
    //                 aria-haspopup="true"

    //             >
    //                 <ListItemIcon>
    //                     <AccountBoxIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary={"Начать продавать"} />
    //             </ListItemButton>
    //         </Link>
    //     }
    // }

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
                                <StoreMallDirectoryIcon />
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
        <header className='MobileHeader'>
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
                                <Image width={42} height={42} src="/optal_logo.svg" />
                            </ListItemButton>
                        </Link>
                        <ListItemButton
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"

                        >
                            {/* <SearchBar /> */}
                        </ListItemButton>

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
                        <Link href={`/subs`}>
                            <ListItemButton
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"

                            >
                                <ListItemIcon>
                                    <DnsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Сохраненные"} />
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
            <div className='navigation'>
                {/* <Badge badgeContent={1} color='success' invisible={JSON.parse(localStorage.getItem("UNREAD")) ? true : false}> */}
                <div className='burger'>
                    <Button variant='contained' onClick={() => {
                        setOpen(true)
                    }}>
                        <MenuIcon />
                    </Button>
                </div>
                {/* </Badge> */}

                <Link href="/">
                    <h1>
                        <div>
                            <Image width={42} height={42} src="/optal_logo.svg" />Optal.ru
                        </div>
                        <span>
                            ОПТОМ ИЗ КЫРГЫЗСТАНА
                        </span>
                    </h1>
                </Link>

                <Link href="/cart" className='additional' >

                    <Button variant='contained'>
                        <ShoppingCartIcon />
                    </Button>
                </Link>
            </div>

        </header >
    )
}

export default MobileHeader