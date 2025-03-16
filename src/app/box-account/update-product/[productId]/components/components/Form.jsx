'use client'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Main from './tabs/Main/Main';
import Sales from './tabs/Sales/Sales';
import { Preview } from '@mui/icons-material';
import Images from './tabs/Images/Images';


function Form({ productId, setSubmitFunction }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div className='main_data'>
            <div className='tabs'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Информация" {...a11yProps(0)} />
                            <Tab label="Расцветки" {...a11yProps(1)} />
                            <Tab label="Продвижение" {...a11yProps(2)} />
                            {/* <Tab label="Предварительный просмотр" {...a11yProps(2)} /> */}

                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Main productId={productId} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Images productId={productId} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Sales productId={productId} />
                    </CustomTabPanel>
                    {/* <CustomTabPanel value={value} index={2}>
                        <Preview />
                    </CustomTabPanel> */}
                </Box>
            </div>
        </div>

    )
}



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default Form