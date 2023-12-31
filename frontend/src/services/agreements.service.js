import { AxiosError } from "axios";
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

export const createAgreement = async (data) => {
    try {
      const response = await axios.post('/convenios', data);
      if (response.status === 201) {
        return response.data.data;
      }
      return {};
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        console.log('Error de respuesta del servidor:', error.response.data);
        return error.response.data;
      } else {
        // La solicitud no pudo llegar al servidor
        console.log('Error al enviar al servidor:', error.message);
      }
      throw error; // Importante lanzar el error nuevamente para que el componente pueda manejarlo
    }
  };  

export async function getImageAgreement(id) {
    try {
        const response = await axios.get(`/images/${id}`, {
            responseType: 'blob'
        });
        // console.log("response ", response);
        return response.data;
        // const response2 = await axios.get(`/images/${id}`);
        // console.log("response2 ", response2);
    } catch (error) {
        if (error.response.status === 404) {
            const response = await axios.get(`/images/default.jpg`, {
                responseType: 'blob'
            });
            // console.log("CAMBIADA A DEFAULT")
            return response.data;
        }
        console.log(error)
    }
}

export const getAgreementByID = async (id) => {
    try {
        const response = await axios.get(`/convenios/${id}`);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteAgreement = async (id) => {
    try {
        const response = await axios.delete(`/convenios/${id}`);
        console.log("response ", response);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateAgreement = async (id, formData) => {
    try {
        const response = await axios.put(`/convenios/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("response ", response);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
        // Manejar errores...
    }
}