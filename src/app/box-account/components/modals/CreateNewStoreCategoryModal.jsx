import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import axios from "axios";
import { BACK_URL } from "@/app/VAR";

const CreateNewStoreCategoryModal = ({ open, onClose, reload }) => {
    const [sectionName, setSectionName] = useState("");

    const onConfirm = (sectionName) => {
        axios.post(`${BACK_URL}/api/factories/store-categories/create/`, { name: sectionName }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        }).then(res => {
            console.log(res)
            reload()
            onClose();

        }).catch(err => {
            console.log(err)
        })
    }

    const handleConfirm = () => {
        if (sectionName.trim().length >= 3) {
            onConfirm(sectionName);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Введите название раздела</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Название раздела"
                    type="text"
                    fullWidth
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Отмена</Button>
                <Button onClick={handleConfirm} color="primary" disabled={sectionName.trim().length < 3}>
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNewStoreCategoryModal;
