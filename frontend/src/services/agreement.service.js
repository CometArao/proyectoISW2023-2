import axios from "./root.service"

export const createAgreement = async (data) => {
    try {
        const res = await axios.post('convenios', data);
        if (res.status === 201) {
            return res.data.data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}