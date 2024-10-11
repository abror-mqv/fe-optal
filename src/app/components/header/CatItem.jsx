import React from 'react'
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

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function CatItem(props) {
    console.log(props)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleHover() {
        currentlyHovering = true;
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleCloseHover() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleClose();
            }
        }, 50);
    }


    return (
        <ListItem disablePadding>
            <ListItemButton
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                onMouseOver={handleClick}
                onMouseLeave={handleCloseHover}
            >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={props.data.name} />
            </ListItemButton>


            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    props.data.subcats.map(el => {

                        return (
                            <MenuItem onClick={handleClose}>{el}</MenuItem>
                        )
                    })
                }
            </Menu>
        </ListItem>
    )
}

export default CatItem