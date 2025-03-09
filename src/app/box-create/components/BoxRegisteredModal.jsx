import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Link from "next/link";

const BoxRegisteredModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ textAlign: "center", py: 4 }}>
                <CheckCircle color="success" sx={{ fontSize: 60 }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                    Новый Бокс успешно зарегистрирован!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="center" width="100%">
                    <Button onClick={onClose} color="primary" variant="outlined">
                        Ок
                    </Button>
                    <Link href="https://t.me/+VF6Z0DaRxb82NTdi">
                        <Button color="success" variant="contained">
                            Перейти в CRM
                        </Button>
                    </Link>

                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default BoxRegisteredModal;
