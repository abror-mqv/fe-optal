import axios from "axios";
import { BACK_URL } from "../VAR";

export const setNewPhoneNumber = (phone) => {
    if (phone != "") {
        const payload = {
            phone_number: phone
        }
        axios.post(`${BACK_URL}/api/customers/update-phone-number`, payload, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        });
    }
}