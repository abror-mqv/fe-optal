import React from 'react'
import '../../styles/components/_account_header.scss'
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';

import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import UploadAvatarModal from '@/app/components/account_header/UploadAvatarModal';
import Link from 'next/link';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #0000006b',
  boxShadow: 24,
  p: 4,
  borderRadius: "12px"
};


function AccountBoxHeader({ name, description, image, first_name, box_id }) {
  const [openName, setOpenName] = React.useState(false);

  const [name_n, setName_n] = React.useState(name)
  const [desc_n, setDesc_n] = React.useState(description)

  const [newName, setNewName] = React.useState(name)
  const [newDesc, setNewDesc] = React.useState(description)

  React.useEffect(() => {
    setNewName(name);
    setNewDesc(description);
    setName_n(name);
    setDesc_n(description)
  }, [name, description])


  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAvatarUpload = () => {
    console.log("Аватарка успешно обновлена!");
  };
  // const [factoryData, setFactoryData] = useState(null);

  const handleOpenName = () => setOpenName(true);
  const handleCloseName = () => setOpenName(false);
  const handleUpdateSubmit = async (updatedData) => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await axios.put(`${BACK_URL}/api/factories/factory/update/`, updatedData, {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        }
      });
      handleCloseName()
      setName_n(response.data.name_n)
      setDesc_n(response.data.desc_n)
      console.log("Цех обновлен:", response.data);

    } catch (error) {
      console.error("Ошибка при обновлении цеха:", error);
    }
  };

  const unformatNumber = (str) => str.replace(/-/g, "");


  return (
    <>
      <header className='AccountHeader'>

        <div className='left_header'>
          <div className='profile_div'>
            <div className='profile_picture'>
              <img src={image} alt="" />
              <EditIcon sx={{ fontSize: 18, cursor: "pointer" }} onClick={handleOpenModal} />

            </div>
            <div className='profile_name'>
              <h2>
                {name_n}
                <EditIcon sx={{ fontSize: 18, cursor: "pointer" }} onClick={() => {
                  handleOpenName()
                }} />
              </h2>
            </div>
          </div>
        </div>
        <div className='right_header'>
          <div className='description'>

            <p className='title'>Описание вашего бокса <EditIcon sx={{ fontSize: 18, cursor: "pointer" }} onClick={() => {
              handleOpenName()
            }} /></p>
            <p className='description_text'>
              {desc_n}
            </p>
          </div>
          <div className='boxidbox' style={{ marginTop: "12px" }}>
            <h2>
              BOX_ID: <span onClick={() => {
                navigator.clipboard.writeText(
                  `https://optal.ru/box/${unformatNumber(box_id)}`
                )
              }}>
                {box_id}
              </span>


            </h2>
          </div>
        </div>
        <div className='third_header'>
          <Link href="/support" >
            <div className='support'>
              <SupportAgentIcon />
              <p>
                Поддержка
              </p>
            </div>
          </Link>
          <div className='docs'>
            <HelpCenterIcon />
            <p>
              Инструкция
            </p>
          </div>
        </div>
        <div className='Introduction'>
          <h4>
            Ваши товары в продаже, {first_name}:
          </h4>
        </div>
        <Modal
          open={openName}
          onClose={handleCloseName}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          isOpen={openName} onRequestClose={handleCloseName}
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateSubmit({ factory_name: newName, factory_description: newDesc });
          }}>
            <Box sx={style} className="Dialogue">
              <p>Введите новое название вашего производства:</p>
              <TextField
                fullWidth
                inputProps={{ maxLength: 44 }}
                id="outlined-basic"
                label={name}
                variant="outlined"
                value={newName}
                className='input'
                onChange={e => setNewName(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Опишите свой товар, чтобы он лучше продавался"
                multiline
                rows={4}
                fullWidth
                className='input'
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <Button variant='contained' color='success' type='submit'>
                ПОДТВЕРДИТЬ
              </Button>
            </Box>
          </form>
        </Modal>
        <UploadAvatarModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpload={handleAvatarUpload}
        />
      </header>
    </>
  )
}

export default AccountBoxHeader