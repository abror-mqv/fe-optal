import axios from "axios";
import { BACK_URL } from "../VAR";

export const postConfirmOrder = (snapshot) => {
    if (snapshot != "") {
        const payload = {
            snapshot: snapshot
        }
        axios.post(`${BACK_URL}/api/customers/cart/checkout/confirm-order/`, payload, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        }).then(res=>{
            console.log("CONFIRM ORDER RES: ", res.data)
        }).catch(err=>{
            console.log("CONFIRM ORDER ERROR: ", err)
        });
    }
}