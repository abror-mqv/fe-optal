import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { BACK_URL } from "@/app/VAR";
const EditRazdel = ({ open, onClose, initialName, categoryId, reload }) => {
    const [sectionName, setSectionName] = useState(initialName || "");


    const handleEdit = () => {
        if (sectionName.trim().length >= 3) {
            axios.patch(`${BACK_URL}/api/factories/store-categories/eidt/${categoryId}/`,
                { name: sectionName },
                { headers: { Authorization: `Token ${localStorage.getItem("TOKEN")}` } }
            )
                .then(response => { console.log("Категория обновлена:", response.data); reload(); onClose() })
                .catch(error => { console.error("Ошибка при обновлении:", error.response?.data || error); reload(); onClose() });
        }
    };

    const handleDelete = () => {
        axios.delete(`${BACK_URL}/api/factories/store-categories/eidt/${categoryId}/`,
            { headers: { Authorization: `Token ${localStorage.getItem("TOKEN")}` } }
        )
            .then(response => { console.log("Категория удалена:", response.data); reload(), onClose() })
            .catch(error => { console.error("Ошибка при удалении:", error.response?.data || error); reload(), onClose() });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Редактирование раздела</DialogTitle>
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
                <Stack direction="row" spacing={2} width="100%" justifyContent="space-between">
                    <Stack direction="row" spacing={1} width="100%" justifyContent="space-between">
                        <Button variant="contained" onClick={handleDelete} color="error">
                            <DeleteForeverIcon />
                        </Button>
                        <Button fullWidth onClick={handleEdit} color="primary" variant="contained" disabled={sectionName.trim().length < 3}>
                            Сохранить
                        </Button>
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default EditRazdel;