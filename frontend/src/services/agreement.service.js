import axios from "./root.service"

export const createAgreement = async (data) => {
    try {
        const res = await axios.post("/convenios", data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}