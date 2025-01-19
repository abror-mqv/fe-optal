import axios from "axios";
import { BACK_URL } from "../VAR";

export const setNewCity = (city) => {
    if (city != "") {
        localStorage.setItem("city", city)
        const payload = {
            city: city
        }
        axios.post(`${BACK_URL}/api/customers/update-city-view`, payload, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        });
    }
}