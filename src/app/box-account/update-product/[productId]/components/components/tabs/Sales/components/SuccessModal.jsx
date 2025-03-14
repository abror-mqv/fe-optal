import { BACK_URL } from "@/app/VAR";
import { Dialog, DialogContent, DialogActions, Button, Typography, Stack } from "@mui/material";
import axios from "axios";

const SuccessModal = ({ open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent sx={{ textAlign: "start", py: 4 }}>
                <p style={{
                    fontFamily: "Roboto",

                }}>
                    Добавление товара в акцию одобрено!
                </p>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">

                    <Button fullWidth onClick={() => {
                        onClose()
                    }} color="success" variant="contained">
                        ОК
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessModal;