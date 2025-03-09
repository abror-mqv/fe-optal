import { Button } from '@mui/material'
import React from 'react'
import ColorLensIcon from '@mui/icons-material/ColorLens';

function ChooseColorButton({ handleModalOpen, index, color_name_value, color_code_value }) {
    if (color_name_value == '') {
        return (
            <Button variant="outlined"
                className='color_image'
                onClick={() => {
                    handleModalOpen(index)
                }}
            >
                Выбрать цвет
            </Button>
        )
    } else {
        return (
            <div>

                <div variant='outlined' onClick={() => {
                    handleModalOpen(index)
                }}

                    style={{
                        backgroundColor: "#FFFFFF",
                        color: "#000",
                        // border: "1px solid #000",
                        borderRadius: "5px",
                        padding: "5px",
                        cursor: "pointer",
                        textAlign: "center",
                        width: "120px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // textTransform: "uppercase",
                        boxShadow: "1px 2px 5px -2px rgba(0, 0, 0, 0.42)",
                        fontSize: "14px",
                    }}

                >
                    {color_name_value}
                    <p>
                        изменить
                    </p>
                </div>
            </div >
        )
    }
}

export default ChooseColorButton