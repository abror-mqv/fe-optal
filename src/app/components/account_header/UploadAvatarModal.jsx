import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";
import { BACK_URL } from "@/app/VAR";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UploadAvatarModal = ({ isOpen, onClose, onUpload }) => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log(avatar)
    if (!avatar) {
      alert("Пожалуйста, выберите файл!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await axios.put(`${BACK_URL}/api/factories/factory/update-avatar/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${localStorage.getItem("TOKEN")}`,
        },
      });

      console.log("Аватарка обновлена:", response.data.avatar_url);
      onClose()
      return response.data.avatar_url;
    } catch (error) {
      console.error("Ошибка при загрузке аватарки:", error.response?.data || error.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" textAlign="center">
          Загрузить аватарку
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {preview && (
            <Avatar
              src={preview}
              alt="Preview"
              sx={{ width: 100, height: 100 }}
            />
          )}
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Загрузить
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadAvatarModal;
