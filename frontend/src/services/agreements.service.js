import axios from "../services/root.service.js"

export const getAgreements = async () => {
    try {
        const response = await axios.get("/convenios");
        const { status, data } = response;
        if (status === 200) {
        return data.data;
        }
    } catch (error) {
        console.log(error);
    }
    }