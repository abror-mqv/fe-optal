import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack, Typography } from "@mui/material";
import axios from "axios";
import { BACK_URL } from "@/app/VAR";
import AddIcon from '@mui/icons-material/Add';
import CreateNewStoreCategoryModal from "@/app/box-account/components/modals/CreateNewStoreCategoryModal";

const ChooseRazdel = ({ open, onClose, setRazdelId, setRazdelName }) => {
    const [sections, setSections] = useState([]);
    const [openStoreCategoryModal, setOpenStoreCategoryModal] = useState(false);
    const [localReaload, setLocalReload] = useState(false);

    useEffect(() => {
        axios.get(`${BACK_URL}/api/factories/store-categories/create/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        }).then(res => {
            console.log(res)
            setSections(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, [localReaload]);

    const reload = () => {
        setLocalReload(!localReaload)
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Список ваших разделов</DialogTitle>
            <DialogContent>
                {sections.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                        {sections.map((section) => (
                            <Chip onClick={() => { setRazdelId(section.id), setRazdelName(section.name); onClose() }} key={section.id} label={section.name} variant="outlined" color="primary" sx={{ fontSize: 14, padding: 1 }} />
                        ))}
                    </div>

                ) : (
                    <Typography variant="body2" color="textSecondary">Нет доступных разделов</Typography>
                )}
            </DialogContent>
            <DialogActions >
                <Button onClick={() => {
                    setOpenStoreCategoryModal(true)
                }}>
                    Создать раздел
                </Button>
                <Button variant="contained" color="primary" onClick={() => {
                    setRazdelId(null);
                    setRazdelName("Без раздела");
                    onClose()
                }}>
                    Без раздела
                </Button>
            </DialogActions>
            <CreateNewStoreCategoryModal open={openStoreCategoryModal} onClose={() => setOpenStoreCategoryModal(false)} reload={reload} />
        </Dialog>
    );
};

export default ChooseRazdel;
