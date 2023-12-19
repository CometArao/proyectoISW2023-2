import axios from './root.service';

export const getAgreements = async () => {
    try {
        const res = await axios.get('/convenios');
        if (res.status === 200) {
            return res.data.data;
        }
        return [];
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
            console.log('Error response from server:', error.response.data);
        } else {
            // La solicitud no pudo llegar al servidor
            console.log('Error sending request to server:', error.message);
        }
    }
}

export const updateAgreement = async (agreement) => {
    try {
        const res = await axios.put(`/convenios/${agreement._id}`, agreement);
        if (res.status === 200) {
            return res.data.data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const deleteAgreement = async (agreementId) => {
    try {
        const res = await axios.delete(`/convenios/${agreementId}`);
        if (res.status === 200) {
            return res.data.data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const getAgreement = async (agreementId) => {
    try {
        const res = await axios.get(`/convenios/${agreementId}`);
        if (res.status === 200) {
            return res.data.data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}