"use client"
import React, { useState, useEffect } from 'react'
import "@/app/styles/components/_mobile_header.scss"
import '@/app/styles/components/_desktop_header.scss';
import Image from 'next/image';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BACK_URL } from '@/app/VAR';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import StoreIcon from '@mui/icons-material/Store';

function BoxHeader() {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    return (
        <header className='MobileHeader'>
            <div className='navigation' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="#">
                    <h1 style={{ textAlign: "start" }}>
                        OPTAL
                        <span>
                            ОПТОМ ИЗ КЫРГЫЗСТАНА
                        </span>
                    </h1>
                </Link>
                <Link href={"/box-account"} className='store_button' >
                    <div>
                        <StoreIcon sx={{ color: "#CD0000", fontSize: "64px" }} />
                    </div>
                </Link>
            </div>

        </header >
    )
}

export default BoxHeader