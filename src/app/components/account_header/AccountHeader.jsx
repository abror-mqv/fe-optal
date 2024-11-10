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
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import axios from 'axios';


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


function AccountHeader({ name, description, image }) {
  const router = useRouter();

  const [openName, setOpenName] = React.useState(false);

  const [newName, setNewName] = React.useState("")
  const [newDesc, setNewDesc] = React.useState("")

  // const [factoryData, setFactoryData] = useState(null);

  const handleOpenName = () => setOpenName(true);
  const handleCloseName = () => setOpenName(false);

  const handleUpdateSubmit = async (updatedData) => {
    try {
      const token = localStorage.getItem("TOKEN"); // Получаем токен из localStorage
      const response = await axios.put("http://127.0.0.1:8000/api/factory/update/", updatedData, {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        }
      });
      // router.refresh();
      alert("Данные успешно обновлены!")

      console.log("Цех обновлен:", response.data);
    } catch (error) {
      console.error("Ошибка при обновлении цеха:", error);
    }
  };

  return (
    <header>
      <div className='left_header'>
        <div className='profile_div'>
          <div className='profile_picture'>
            <img src="https://assets.turbologo.ru/blog/ru/2019/03/18165914/%D0%91%D0%B5%D0%B7-%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-3-98.png" alt="" />
            <EditIcon sx={{ fontSize: 18, cursor: "pointer" }} />

          </div>
          <div className='profile_name'>
            <h2>
              {name}
              <EditIcon sx={{ fontSize: 18, cursor: "pointer" }} onClick={() => {
                handleOpenName()
              }} />
            </h2>
          </div>
        </div>
      </div>
      <div className='right_header'>
        <div className='description'>

          <p className='title'>Описание вашего профиля <EditIcon sx={{ fontSize: 18, cursor: "pointer" }} onClick={() => {
            handleOpenName()
          }} /></p>
          <p className='description_text'>
            {description}
          </p>
        </div>
      </div>
      <div className='third_header'>
        <div className='settings'>
          <SettingsSuggestIcon />
          <p>
            Настройки
          </p>
        </div>
        <div className='support'>
          <SupportAgentIcon />
          <p>
            Поддержка
          </p>
        </div>
        <div className='docs'>
          <HelpCenterIcon />
          <p>
            Инструкция
          </p>
        </div>
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
    </header>
  )
}

export default AccountHeader