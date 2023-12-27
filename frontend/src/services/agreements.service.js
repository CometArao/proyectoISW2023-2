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

export const createAgreement = async (agreement) => {
    try {
        const res = await axios.post('/convenios', agreement);
        if (res.status === 201) {
            return res.data.data;
        }
        return {};
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de error
            console.log('Error de respuesta de server:', error.response.data);
        } else {
            // La solicitud no pudo llegar al servidor
            console.log('Error enviando al server:', error.message);
        }
    }
}