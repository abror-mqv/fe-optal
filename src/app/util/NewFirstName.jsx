import axios from "axios";
import { BACK_URL } from "../VAR";

export const setNewFirstName = (firstName) => {
    if (firstName != "") {
        const payload = {
            name: firstName
        }
        axios.post(`${BACK_URL}/api/customers/update-first-name`, payload, {
            headers: {
                Authorization: `Token ${localStorage.getItem("TOKEN")}`,
            },
        });
    }
    console.log("fwefwefewfewfewfwefewfewfewfewfewfwef")
}