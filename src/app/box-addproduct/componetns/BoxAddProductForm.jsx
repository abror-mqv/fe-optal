"use client"

import { Button, TextField, ListItem, Chip } from '@mui/material'
import React, { useState } from 'react'
import '../../styles/components/_addproduct.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'; import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { useRouter } from 'next/router';
import Link from 'next/link';
import ChooseRazdel from './modals/ChooseRazdel';
import EditColor from '@/app/box-account/update-product/[productId]/components/components/tabs/Modals/EditColor';
import ChooseColor from './modals/ChooseColor';
import ChooseColorButton from './сomponents/ChooseColorButton';
import PriceComponent from './сomponents/PriceComponent';
import imageCompression from "browser-image-compression";


const ColorPicker = props => {
    return (
        <div className='countainer_color'>
            <input type="color" {...props} className='color_code_input' />
        </div>
    );
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

function BoxAddProductForm({ setSubmitFunction }) {
    const [openEditColorModal, setOpenEditColorModal] = React.useState(false);

    const ButtonVariant = ({ variant, index }) => {
        console.log("VAR: ", variant, "IDX: ", index)
        console.log(colorVariants)
        if (colorVariants[index]?.image != "") {
            return (
                <Button
                    variant="outlined"
                    component="label"
                    className='color_image'
                    onChange={(e) => handleImageChange(index, e.target.files[0])}

                >

                    <img src={variant.image_url} alt="Variant" className="variant-image" />

                    <input
                        type="file"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        hidden
                    />
                    <Button variant='contained' className='color_delete' color='error' onClick={() => {
                        handleDeleteVariation(index)
                    }}>
                        <ClearIcon />
                    </Button>
                </Button>
            )
        } else {
            return (
                <Button
                    variant="outlined"
                    component="label"
                    className='color_image'
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                >

                    <AddPhotoAlternateIcon />

                    <input
                        type="file"
                        hidden
                    />
                </Button>
            )
        }
    }
    const handleDeleteVariation = (index) => {
        setColorVariants((prevVariants) =>
            prevVariants.filter((_, idx) => idx !== index)
        );
    };


    const [colorVariants, setColorVariants] = useState([]);
    const [productname, setProductname] = useState("")
    const [sizesline, setSizesLine] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [cats, setCats] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState(0)
    const [categoryName, setCategoryName] = useState("")
    const [razdelId, setRazdelId] = useState(null)
    const [razdelName, setRazdelName] = useState("Без раздела")
    const [open, setOpen] = React.useState(false);
    const [openRazdelModal, setOpenRazdelModal] = React.useState(false);
    const [percentage, setPercentage] = useState(0);

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/cats`).then(res => {
            setCats(res.data)
        })

        axios.get(`${BACK_URL}/api/factories/get-my-percentage`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`, // Убедитесь, что токен сохранён
            },
        }).then(res => {
            console.log(res)
            setPercentage(res.data.percentage)
        }).catch(err => {
            console.log(err)
        })
    }, [])
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

    const handleListItemClick = () => {
        console.log("List item clicked!");
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };
    const addColorVariant = () => {
        setColorVariants([...colorVariants, { color_name: "", color_code: "#000", image: "" }]);
    };
    const handleVariantChange = (index, newValues) => {
        const updatedVariants = colorVariants.map((variant, i) =>
            i === index ? { ...variant, ...newValues } : variant
        );
        setColorVariants(updatedVariants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("TOKEN");
        const productData = {
            name: productname,
            price: price,
            description: description,
            sizes: sizesline,
            father: category,
            store_category: razdelId
        };

        try {
            const productResponse = await axios.post(`${BACK_URL}/api/factories/products/`, productData, {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const productId = productResponse.data.id;
            console.log("Продукт успешно создан:", productResponse.data);
            setOpen(true)
            for (const variant of colorVariants) {
                const formData = new FormData();
                formData.append("product", productId);
                formData.append("color_name", variant.color_name);
                formData.append("color_code", variant.color_code);
                if (variant.image) {
                    formData.append("image", variant.image);
                }

                const variantResponse = await axios.post(`${BACK_URL}/api/factories/products/color-variation/`, formData, {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log("Цветовая вариация успешно добавлена:", variantResponse.data);
            }

            console.log("Все цветовые вариации успешно добавлены");

        } catch (error) {
            console.error("Ошибка при создании продукта или цветовых вариаций:", error);
            if (error.response) {
                console.error("Детали ошибки:", error.response.data);
            }
        }
    };

    setSubmitFunction.current = handleSubmit;

    const handleImageChange = async (index, file) => {
        if (!file) return;

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 3036,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const newFile = new File([compressedFile], file.name, { type: file.type });
            const imageUrl = URL.createObjectURL(newFile);
            const updatedVariants = [...colorVariants];
            updatedVariants[index].image_url = imageUrl;
            updatedVariants[index].image = newFile;

            setColorVariants(updatedVariants);
        } catch (error) {
            console.error("Ошибка сжатия:", error);
        }
    };

    const [currentEditColorId, setCurrentEditColorId] = useState(null);

    const handleColorPickModalOpen = (index) => {
        setCurrentEditColorId(index);
        setOpenEditColorModal(true)
    }

    return (
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <div className='main_data'>
                <div>
                    <div className='forma name'>
                        <div className='chip'>
                            <Chip label="Название товара" />
                        </div>

                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="Куртка демисезонная с капюшоном" variant="outlined" value={productname} className='input' onChange={e => {
                            setProductname(e.target.value)
                        }}>

                        </TextField>
                    </div>
                    <div className='forma category'>
                        <div className='chip'>
                            <Chip label="Категория" />
                        </div>

                        <Button variant='outlined' sx={{ borderColor: "#CD0000", color: "#CD0000" }} onClick={() => {
                            setIsOpen(true)
                        }}>
                            {
                                categoryName == "" ? "Выбрать" : categoryName
                            }

                        </Button>

                    </div>
                    <div className='forma razdel'>
                        <div className='chip'>
                            <Chip label="Раздел" />
                        </div>
                        <Button variant='outlined' sx={{ borderColor: "#CD0000", color: "#CD0000" }} onClick={() => {
                            setOpenRazdelModal(true)
                        }}>
                            {razdelName}
                        </Button>
                    </div>
                    <div className='forma size'>
                        <div className='chip chip_doubled'>
                            <Chip label="Размеры в одной линейке" /><Chip variant='outlined' label="перечисляйте через запятую" />
                        </div>

                        <TextField fullWidth inputProps={{ maxLength: 44 }} id="outlined-basic" label="38, 39, 40, 40, 41, 42" variant="outlined" value={sizesline} className='input' onChange={e => {
                            setSizesLine(e.target.value)
                        }}>

                        </TextField>
                    </div>
                    <div className='forma desc'>

                        <div className='chip'>
                            <Chip label="Опсиание товара" />
                        </div>


                        <TextField
                            id="outlined-multiline-static"
                            label="Опишите свой товар, чтобы он лучше продавался"
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
            </div>
            <div className='meta_data'>
                <div className='variants'>
                    <div className='chip'>
                        <Chip label="Варианты цветов" />
                    </div>



                    <div className='variants_row'>
                        {
                            colorVariants.map((variant, index) => {
                                return (
                                    <div key={index} className='color_new' style={(variant.color_name == "") ? {} : { backgroundColor: variant.color_code, borderRadius: "12px" }}>
                                        <ButtonVariant index={index} variant={variant} />
                                        <ChooseColorButton handleModalOpen={handleColorPickModalOpen} index={index} color_name_value={variant.color_name} color_code_value={variant.color_code} />
                                    </div>
                                )
                            })
                        }
                        <Button variant='contained' className='AddNewColor' onClick={addColorVariant}>
                            <AddCircleOutlineIcon />
                        </Button>
                    </div>

                </div>
                <PriceComponent price={price} setPrice={setPrice} percentage={percentage} />
                <div className='forma ready'>
                    <Button type="submit" variant='contained' fullWidth>ГОТОВО</Button>
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
                    <Link href={"/box-account"}>
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
            <ChooseColor open={openEditColorModal} handleClose={() => setOpenEditColorModal(false)} color_id={currentEditColorId} handleVariantChange={handleVariantChange} />
            {/* <EditColor open={openEditColorModal} handleClose={() => setOpenEditColorModal(false)} color_id={currentColorVariationId} update={update} /> */}
        </form>
    )
}

export default BoxAddProductForm