import axios from './root.service';

export const solicitudes = async () => {
  try {
    const response = await axios.get('tarjetavecino/generar-listado-prioridad');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};