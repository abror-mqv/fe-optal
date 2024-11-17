"use client"

import React from 'react'
import '@/app/styles/components/_tutorial.scss'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const steps = [
    {
        label: 'Регистрация и вход:',
        description:
            <div className='Desc'>
                <p>
                    Зарегистрируйтесь на нашей платформе как поставщик
                </p>
                <p>
                    <ExitToAppIcon />
                </p>
                <p>
                    Заполните профиль, указав основные данные: название компании, контактные данные и описание
                </p>
                <p>
                    <EditIcon />
                </p>
            </div>,
    },
    {
        label: 'Добавление товаров:',
        description:
            <div className='Desc'>
                <p>
                    Перейдите в раздел Мои товары
                </p>
                <p>
                    <TransitEnterexitIcon />
                </p>
                <p>
                    Нажмите кнопку Добавить товар 
                </p>
                <p>
                    <AddCircleIcon />
                </p>

            </div>,
    },
    {
        label: 'Заполните форму',
        description:
            <div className='Desc'>
                <div>
                    Заполните форму
                    <ul>
                        <li>
                            Название товара
                        </li>
                        <li>
                            Категория
                        </li>
                        <li>
                            Размеры
                        </li>
                        <li>
                            Описание (включите преимущества и ключевые характеристики)
                        </li>
                        <li>
                            Фотографии и цвета
                        </li>
                        <li>
                            Цена
                        </li>

                    </ul>
                </div>
            </div>,
    },
    {
        label: 'Редактирование и управление:',
        description: <div className='Desc'>
            <p>
                Каждый товар можно редактировать: изменять описание, цену, количество
            </p>
            <p>
                <EditIcon />
            </p>
        </div>,
    },
    {
        label: 'Процесс оформления заказа:',
        description: <div className='Desc'>
            <p>
                Клиент выбирает товар и оформляет заказ.
            </p>
            <p>
                <SavedSearchIcon />
            </p>
            <p>
                Вы получаете уведомление о новом заказе на указанный вами номер телефона
            </p>
            <p>
                <RingVolumeIcon />
            </p>
        </div>,
    },
];



function Tutorial() {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    return (
        <div className='Tutorial'>
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                {step.description}
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1, backgroundColor: "#252421" }}
                                    >
                                        {index === steps.length - 1 ? 'Финиш' : 'Дальше'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1, color: "#252421" }}
                                    >
                                        Назад
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>Наши поздравления!<br /> Можете приступать к продаже своих товаров!</Typography>

                        <Button onClick={handleReset} sx={{ mt: 5, mr: 1, backgroundColor: "#252421", color: "white" }} fullWidth>
                            Заново
                        </Button>


                        <Link href='/newfactory'>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1, display: "flex", justifyContent: "space-between", backgroundColor: "#CD0000", color: "white" }} fullWidth>
                                <NavigateNextIcon />  Зарегистрироваться <NavigateNextIcon />
                            </Button>
                        </Link>

                    </Paper>
                )}
            </Box>
        </div>
    )
}

export default Tutorial