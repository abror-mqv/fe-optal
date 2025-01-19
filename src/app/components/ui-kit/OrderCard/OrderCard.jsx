import { ExpandMore, InfoOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react'
import CurrencyFormatter from '../../CurrencyFormatter/CurrencyFormatter'
import { tableCellClasses } from '@mui/material/TableCell';
import './OrderCard.scss'

function OrderCard({ el }) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#cd00008a",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <div className='oneGood'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Chip sx={{ color: "black", fontWeight: "500", textTransform: "uppercase" }} variant='outlined' label={el.name} className='summary'>{el.name}</Chip>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='productInfo'>
                        <div className='topTable'>
                            <div className='row'>
                                <div className='titleTable'>
                                    <p>Цена за единицу товара</p>
                                </div>
                                <div className='contentTable'>
                                    <p>
                                        <CurrencyFormatter amount={el.price} />
                                    </p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='titleTable'>
                                    <p>Размеров в 1 линейке - {el.sizes.length} </p>
                                </div>
                                <div className='contentTable'>
                                    <p className='bullets'>{el.sizes.map((el, index) => {
                                        return (
                                            <span key={index} className='sizeBullet'>
                                                {el}
                                            </span>
                                        )
                                    })}</p>
                                </div>

                            </div>
                            <div className="row">
                                <div className="titleTable">
                                    Одна линейка стоит
                                </div>
                                <div className="contentTable">
                                    {el.sizes.length} x <CurrencyFormatter amount={el.price} /> = <CurrencyFormatter amount={el.price * el.sizes.length} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='colorsList'>
                        <h4>
                            Количество линеек по цветам:
                        </h4>
                        <TableContainer component={Paper} className='tableContainer'>
                            <Table size="small" aria-label="a dense table" >
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Название</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Tooltip title={`Количество линеек этого цвета`}>
                                                линеек
                                                <IconButton>
                                                    <InfoOutlined sx={{ color: "white", fontSize: "1.2rem" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Tooltip sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} title={`Количество размеров в одной линейке этого товара: ${el.sizes.map(size => { return (size) })}`}>
                                                размеров
                                                <IconButton>
                                                    <InfoOutlined sx={{ color: "white", fontSize: "1.2rem" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Tooltip title="Стоимость всех линеек этого цвета">
                                                стоимость
                                                <IconButton>
                                                    <InfoOutlined sx={{ color: "white", fontSize: "1.2rem" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {el.color_variations.map((row, index) => (
                                        <StyledTableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.color_name}
                                            </TableCell>
                                            <TableCell align="left">{row.quantity}</TableCell>
                                            <TableCell align="left">{el.sizes.length}</TableCell>
                                            <TableCell align="left"><CurrencyFormatter amount={row.color_cost} /></TableCell>

                                        </StyledTableRow>
                                    ))}
                                    {/* <Divider/> */}
                                    <StyledTableRow
                                        sx={{}}
                                    >
                                        <TableCell component="th" scope="row">

                                            <span className='totalProductPrice'>Итого</span>
                                        </TableCell>
                                        <TableCell align="left">  <span className='totalProductPrice'>{el.total_quantity}</span></TableCell>
                                        <TableCell align="left">  <span className='totalProductPrice'>{el.overall_quantity}</span></TableCell>
                                        <TableCell align="left"> <span className='totalProductPrice'><CurrencyFormatter amount={el.total_cost} /></span></TableCell>

                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default OrderCard