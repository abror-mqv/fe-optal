import { BACK_URL } from "@/app/VAR";
import { Dialog, DialogContent, DialogActions, Button, Typography, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

const PromoConfirmationModal = ({ open, onClose, productName, productId, promoName, promoId, reload }) => {
  const [openSucess, setOpenSucess] = useState(false)
  const onConfirm = () => {
    axios.post(`${BACK_URL}/api/factories/promotions/apply/`, {
      product: productId,
      promotion: promoId
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem("TOKEN")}`,
      },
    })
      .then(response => {
        console.log('Заявка успешно подана:', response.data);
        setOpenSucess(true)
      })
      .catch(error => {
        console.error('Ошибка при подаче заявки:', error.response);
      });
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent sx={{ textAlign: "start", py: 4 }}>
        <p style={{
          fontFamily: "Roboto",
          textAlign: "start"
        }}>
          Вы действительно хотите подать заявку вашего товара
          <p style={{
            marginTop: "12px",
            fontWeight: "700",
            color: "#333"
          }}>
            {productName}
          </p>

        </p>
        <p style={{
          fontFamily: "Roboto",
          textAlign: "start",
          marginTop: "12px"
        }}>
          на участие в акции
          <p style={{
            marginTop: "12px",
            fontWeight: "700",
            color: "#333"
          }}>
            {promoName}?
          </p>

        </p>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
          <Button fullWidth onClick={onClose} color="primary" variant="outlined">
            Отмена
          </Button>
          <Button fullWidth onClick={() => {
            onConfirm()
          }} color="primary" variant="contained">
            Подтвердить
          </Button>
        </Stack>
      </DialogActions>
      <SuccessModal open={openSucess} onClose={() => {
        setOpenSucess(false)
        onClose()
        reload()
      }} />
    </Dialog>
  );
};

export default PromoConfirmationModal;