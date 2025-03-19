import { Dialog, DialogContent, DialogActions, Button, Stack, IconButton, Tooltip } from "@mui/material";
import { WhatsApp, Telegram, Instagram, ContentCopy } from "@mui/icons-material";

const ShareModal = ({ open, onClose, url }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert("Ссылка скопирована в буфер обмена");
        } catch (err) {
            console.error("Ошибка при копировании: ", err);
        }
    };

    const shareButtons = [
        { icon: <WhatsApp sx={{ fontSize: "44px" }} color="success" />, label: "WhatsApp", link: `https://wa.me/?text=${encodeURIComponent(url)}` },
        { icon: <Telegram sx={{ fontSize: "44px" }} color="primary" />, label: "Telegram", link: `https://t.me/share/url?url=${encodeURIComponent(url)}` },
        { icon: <Instagram sx={{ fontSize: "44px" }} color="secondary" />, label: "Instagram", link: "https://www.instagram.com/optal.ru" },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent>
                <Stack direction="row" spacing={2} justifyContent="center" my={2}>
                    {shareButtons.map((button, index) => (
                        <Tooltip key={index} title={`Поделиться через ${button.label}`} arrow>
                            <IconButton color="primary" onClick={() => window.open(button.link, "_blank")}>
                                {button.icon}
                            </IconButton>
                            <p>
                                {button.label}
                            </p>
                        </Tooltip>
                    ))}
                    <Tooltip title="Скопировать ссылку" arrow>
                        <IconButton color="primary" onClick={handleCopy}>
                            <ContentCopy sx={{ fontSize: "44px" }} />
                        </IconButton>
                        <p>
                            Ссылка
                        </p>
                    </Tooltip>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;