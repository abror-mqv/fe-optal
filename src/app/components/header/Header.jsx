"use client"
import React from 'react'
import '../../styles/components/_header.scss';
import Image from 'next/image';
import SearchBar from './SearchBar';


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import CatItem from './CatItem';

const data = [
  {
    "name": "Все категории",

    "subcats": []
  },
  {
    "name": "Женщинам",
    "subcats": [
      "Лонгсливы",
      "Платья",
      "Сарафаны",
      "Лонгсливы",
      "Платья",
      "Сарафаны",
    ]
  }, {
    "name": "Детям",
    "subcats": [
      "Шорты",
      "Платья",
      "Сараукпфаны",
      "Аавпвк",
      "Платья",
      "Саракупукфаны",
    ]
  }, {
    "name": "Мужчинам",
    "subcats": [
      "укпукп",
      "12421421",
      "укпкуп",
      "Лонгсливы",
      "укп",
      "Сарафаны",
    ]
  }, {
    "name": "Обувь",
    "subcats": [
      "укпукп",
      "12421421",
      "укпкуп",
      "Лонгсливы",
      "укп",
      "Сарафаны",
    ]
  }, {
    "name": "Акции",
    "subcats": []
  }, {
    "name": "Распродажа",
    "subcats": []
  },
]

function Header() {
  const [open, setOpen] = React.useState(false);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {data.map(el => {
          return (
            <CatItem
              data={el}
            />
          )
        })}
      </List>
      <Divider />

    </Box>
  );

  return (
    <header>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <div className='LeftSection'>
        <div className='Logo'>
          OPTAL
        </div>

        <Button className='Catalog' onClick={toggleDrawer(true)}>
          <div className='Catalog_img'>
            <Image src="catalog.svg" width={40} height={40} />
          </div>
          <div className='Catalog_char'>
            КАТАЛОГ
          </div>
        </Button>
        <div className='SearchContainer'>
          <SearchBar />
          <button>
            НАЙТИ
          </button>
        </div>
      </div>


      <div className='RightSection'>
        <button className='Cart'>
          <Image src='cart.svg' width={40} height={40} />
        </button>
        <button className='Cart'>
          <Image src='profile.svg' width={40} height={40} />
        </button>
      </div>

    </header>
  )
}

export default Header