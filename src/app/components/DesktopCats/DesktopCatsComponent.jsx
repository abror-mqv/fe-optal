import React, { useState, useEffect } from 'react'
import '@/app/styles/components/_desktopcats.scss'

import Image from 'next/image';
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


function DesktopCatsComponent() {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  return (
    <div className='DesktopCats'>
      <div className='CatsList'>

        {categories.map(cat => {
          return (
            <Accordion sx={{ boxShadow: "none", maxWidth: "200px", gap: "24px" }} key={cat.id}>
              <AccordionSummary
                expandIcon={
                  <Button variant="contained" sx={{ backgroundColor: "#252421" }}>
                    <ExpandMoreIcon />
                  </Button>
                }
                aria-controls="panel1a-content"
                id={`panel-${cat.id}-header`}
              >
                <Link href={`/category/${cat.id}`} sx={{ zIndex: "9999", textDecoration: "none" }}>
                  <Button variant="contained" sx={{ backgroundColor: "#CD0000", fontSize: "0.8rem" }}>
                    {cat.cat_name}
                  </Button>
                </Link>
              </AccordionSummary>
              <AccordionDetails >
                {cat.subcategories.map((subcat) => (
                  <Link href={`/subcategory/${subcat.id}`} key={subcat.id} sx={{ textDecoration: "none" }}>
                    <ListItemButton>
                      <ListItemText primary={subcat.subcat_name} sx={{ fontSize: "0.8rem" }} />
                    </ListItemButton>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>

          )
        })}
      </div>

    </div>
  )
}

export default DesktopCatsComponent