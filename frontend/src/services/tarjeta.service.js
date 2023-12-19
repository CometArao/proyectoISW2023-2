import axios from './root.service';

export const solicitudes = async () => {
  try {
    const response = await axios.get('tarjetavecino/generar-listado-prioridad');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
    return data.data
  } catch (error) {
    console.log(error);
  }
};

export const estadoTarjeta = async () => {
  try {
    const response = await axios.get('tarjetavecino/tarjetas');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
    return data.data[0]
  } catch (error) {
    console.log(error);
  }
};