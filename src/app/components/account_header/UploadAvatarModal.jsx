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
    if (!avatar) {
      alert("Пожалуйста, выберите файл!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await fetch(`${BACK_URL}/api/factories/factory/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("TOKEN")}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Аватарка успешно загружена!");
        onUpload();
        onClose();
      } else {
        alert("Ошибка при загрузке аватарки.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при соединении с сервером.");
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
