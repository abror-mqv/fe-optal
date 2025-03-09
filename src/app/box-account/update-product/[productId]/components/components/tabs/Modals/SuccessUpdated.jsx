import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Link from "next/link";

const SuccessUpdated = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ textAlign: "center", py: 4 }}>
                <CheckCircle color="success" sx={{ fontSize: 60 }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                    Данные о товаре успешно обновлены!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="center" width="100%">
                    <Button fullWidth onClick={onClose} color="primary" variant="outlined">
                        Ок
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessUpdated;
