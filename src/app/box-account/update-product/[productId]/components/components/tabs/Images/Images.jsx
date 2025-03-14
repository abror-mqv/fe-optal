import { Button, Chip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import './Images.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import EditColor from '../Modals/EditColor';
import EditImage from '../Modals/EditImage';
import AddColor from '../Modals/AddColor';
import DeleteColor from '../Modals/DeleteColor';
function Images({ productId }) {

    const [old_images, setOldImages] = useState([])
    const [currentColorVariationId, setCurrentColorVariationId] = useState(0)
    const [toUpdate, setToUpdate] = useState(false)

    const [openEditColorModal, setOpenEditColorModal] = React.useState(false);
    const handleOpenEditColorModal = () => setOpenEditColorModal(true);
    const handleCloseEditColorModal = () => { setOpenEditColorModal(false); setCurrentColorVariationId(0) };

    const [openEditImageModal, setOpenEditImageModal] = useState(false)
    const handleOpenImageEditModal = () => setOpenEditImageModal(true);
    const handleCloseImageEditModal = () => setOpenEditImageModal(false);

    const [openAddColorModal, setOpenAddColorModal] = useState(false)
    const handleOpenAddColorModal = () => setOpenAddColorModal(true);
    const handleCloseAddColorModal = () => setOpenAddColorModal(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    useEffect(() => {
        console.log("PPPID:  ", productId)
        axios.get(`${BACK_URL}/api/factories/products/${productId}`).then(res => {
            console.log(res.data)
            setOldImages(res.data.color_variations)
        }).catch(err => {
            console.log(err)
        })
    }, [toUpdate])

    const update = () => {
        setToUpdate(!toUpdate)
    }


    return (
        <div className='images_edit_form'>
            <div className='variants'>
                <h3>
                    Цветовые варианты
                </h3>
                <div className='add_block'>
                    <Button variant='contained' sx={{ backgroundColor: "#CD0000", display: "flex", justifyContent: "space-between" }} fullWidth onClick={() => handleOpenAddColorModal()}>
                        Добавить<AddCircleIcon />
                    </Button>
                </div>
                <div className='old_images'>
                    <div className='colors_list'>
                        {
                            old_images.map((variant, index) => {
                                return (
                                    <div key={index} className='color_variant'>
                                        <img src={variant.image} alt="Variant" className="variant_image" />

                                        <div className='edit_panel'>
                                            <div className='color_name'>
                                                <p>
                                                    {variant.color_name}
                                                </p>

                                            </div>
                                            <div className='color_brick' >
                                                <Button variant='outlined' onClick={() => {
                                                    handleOpenEditColorModal()
                                                    setCurrentColorVariationId(variant.id)
                                                }}>
                                                    <ColorLensIcon />
                                                </Button>
                                                <div className='color_dot' style={{ background: `${variant.color_code}` }}>

                                                </div>
                                            </div>
                                            <div className='edit_buttons'>
                                                <Button variant='contained' onClick={() => {
                                                    handleOpenImageEditModal();
                                                    setCurrentColorVariationId(variant.id)
                                                }}>
                                                    <ImageIcon />
                                                </Button>
                                                <Button variant='contained' sx={{ background: "#CD0000" }} onClick={() => {
                                                    setCurrentColorVariationId(variant.id)
                                                    handleOpenDeleteModal()

                                                }}>
                                                    <ClearIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <EditColor open={openEditColorModal} handleClose={handleCloseEditColorModal} color_id={currentColorVariationId} update={update} />
            <EditImage open={openEditImageModal} handleClose={handleCloseImageEditModal} color_id={currentColorVariationId} update={update} />
            <AddColor open={openAddColorModal} onClose={handleCloseAddColorModal} update={update} productId={productId} />
            <DeleteColor open={openDeleteModal} handleClose={handleCloseDeleteModal} color_id={currentColorVariationId} update={update} />
        </div >
    )
}

export default Images