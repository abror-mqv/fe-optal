import { Button, Chip, TextField, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from 'next/link';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';

import InfoIcon from '@mui/icons-material/Info';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import "./Main.scss"
import ChooseRazdel from '@/app/box-addproduct/componetns/modals/ChooseRazdel';
import PriceComponent from './PriceComponent';
import SuccessUpdated from './Modals/SuccessUpdated';

function Main({ productId }) {
    const [productname, setProductname] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [category, setCategory] = useState(0)

    const [sizesline, setSizesLine] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [razdelId, setRazdelId] = useState(null)
    const [razdelName, setRazdelName] = useState("Без раздела")
    const [openRazdelModal, setOpenRazdelModal] = React.useState(false);

    const [cats, setCats] = useState([])
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleListItemClick = () => {
        console.log("List item clicked!");
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/products/${productId}`).then(res => {
            console.log(res.data)
            setProductname(res.data.name)
            setSizesLine(res.data.sizes.join(", "))
            setPrice(res.data.price)
            setDescription(res.data.description)
            setCategory(res.data.father)
            setColorVariants(res.data.color_variations)
        }).catch(err => {
            console.log(err)
        })

        axios.get(`${BACK_URL}/api/factories/cats`).then(res => {
            setCats(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/get-my-percentage/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`, // Убедитесь, что токен сохранён
            },
        }).then((res => {
            setPercentage(res.data.percentage)
        })).catch(err => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        if (cats !== "undefined") {
            if (category !== 0) {
                setCategoryName(
                    getCatTreeVerbose(
                        cats, category
                    )
                )
            }
        }
    }, [category, cats])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(
        //     `
        //     SubmitData \n 
        //         ${productname}
        //         ${price}
        //         ${sizesline}
        //         ${description}
        //         ${category}
        //     `
        // )
        axios.patch(
            `${BACK_URL}/api/factories/products/update/${productId}/`,
            {
                "name": productname,
                "sizes": sizesline,
                "price": price,
                "description": description,
                "father": category,
                "store_category": razdelId
            },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("TOKEN")}`,
                },
            }
        ).then(res => {
            console.log("Submit Res", res)
            setOpenSuccess(true)
        })
    }




    return (
        <form className='edit_form_main' onSubmit={(e) => handleSubmit(e)}>
            <div className='container'>
                <div className='info_block'>
                    <h3>
                        Информация о товаре
                    </h3>
                    <div className='InputForm'>
                        <p>
                            Название товара
                        </p>
                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" variant="outlined" value={productname} className='input' onChange={e => {
                            setProductname(e.target.value)
                        }}>

                        </TextField>

                    </div>

                    <div className='InputForm'>
                        <p>
                            Размеры
                        </p>
                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" variant="outlined" value={sizesline} className='input' onChange={e => {
                            setSizesLine(e.target.value)
                        }}>

                        </TextField>

                    </div>

                    <div className='InputForm'>
                        <p>
                            Описание
                        </p>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue=""
                            fullWidth
                            className='input'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </div>



                </div>
                <div className='InputForm'>
                    <p>
                        Категория
                    </p>

                    <Button variant='outlined' sx={{ color: "rgba(0, 0, 0, 0.652);", border: "none", backgroundColor: "#00000014", padding: "12px 16px" }} onClick={() => {
                        setIsOpen(true)
                    }}>
                        {
                            categoryName == "" ? "Выбрать" : categoryName
                        }
                    </Button>

                </div>
                <div className='InputForm'>
                    <p>
                        Раздел
                    </p>
                    <Button variant='outlined' sx={{ color: "rgba(0, 0, 0, 0.652);", border: "none", backgroundColor: "#00000014", padding: "12px 16px" }} onClick={() => {
                        setOpenRazdelModal(true)
                    }}>
                        {razdelName}
                    </Button>
                </div>
                <div className='InputForm'>
                    <p>
                        Цена единицы товара
                    </p>
                    {/* <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" variant="outlined" value={price} className='custom-textfield' onChange={e => {
                            setPrice(e.target.value)
                        }}>

                        </TextField> */}
                    <PriceComponent price={price} setPrice={setPrice} percentage={percentage} />
                </div>
                <div className='InputButton'>
                    <Button type="submit" variant='contained' sx={{ backgroundColor: "#CD0000" }}>СОХРАНИТЬ</Button>
                </div>

                <div className='FooterLikeSpace'>

                </div>
            </div>



            <SwipeableDrawer
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                    sx: { height: '80vh' }
                }}
            >
                <div
                    role="presentation"
                >
                    {
                        cats.map((cat, index) => {
                            return (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        {cat.cat_name}
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ display: 'flex', flexWrap: "wrap", justifyContent: "start" }}>
                                        {
                                            cat.subcategories.map((subcat, index) => {
                                                return (
                                                    <ListItem key={index} sx={{ width: "auto" }}>
                                                        <Button variant='outlined' onClick={() => {
                                                            setCategory(subcat.id);
                                                            setCategoryName(`${cat.cat_name} > ${subcat.subcat_name}`)
                                                            handleListItemClick()
                                                            console.log(category)
                                                        }}>
                                                            {subcat.subcat_name}
                                                        </Button>
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }

                </div>
            </SwipeableDrawer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='ModalSuccess'
            >
                <Box sx={style}>
                    <p className='congrats'>
                        Поздравляем! <br />Вы успешно добавили свой товар!
                    </p>
                    <Link href={"/account-factory"}>
                        <Button variant='contained' color='success' fullWidth onClick={() => {
                            handleClose()
                        }}>
                            ОК
                        </Button>
                    </Link>
                </Box>
            </Modal>
            <ChooseRazdel open={openRazdelModal} onClose={() => {
                setOpenRazdelModal(false)
            }} setRazdelId={setRazdelId} setRazdelName={setRazdelName} />
            <SuccessUpdated open={openSuccess} onClose={() => {
                setOpenSuccess(false)
            }} />
        </form >
    )
}

const getCatTreeVerbose = (cats, subcatId) => {
    for (const cat of cats) {
        for (const subcat of cat.subcategories) {
            if (subcat.id === subcatId) {
                return `${cat.cat_name} > ${subcat.subcat_name}`;
            }
        }
    }
    return "";
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    alignItems: "flex-start",
    fontSize: "18px"
};


export default Main