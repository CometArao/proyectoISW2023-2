import { useForm } from 'react-hook-form';
import { createAgreement } from '../services/agreement.service';
import { useNavigate } from 'react-router-dom';
import { getRegionIdName, getCommuneIdName } from '../lib/getNames';
import { useState, useEffect } from 'react';
import axios from "../services/root.service"

const AgreementForm = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener y configurar las regiones
    const fetchRegions = async () => {
      const response = await axios.get('/ubicaciones/regiones');
      const data = response.data.data
      setRegions(data);
    };

    fetchRegions();

    // Obtener y configurar las comunas
    const fetchCommunes = async () => {
      const response = await axios.get('/ubicaciones/comunas');
      const data = response.data.data
      setCommunes(data);
    };

    fetchCommunes();
  }, []);

  const onRegionChange = async (event) => {
    const selectedRegionId = event.target.value;

    // Actualizar el estado de la región seleccionada
    setValue("region", selectedRegionId);

    try {
      // Obtener y configurar las comunas basadas en la región seleccionada
      const response = await axios.get(`/ubicaciones/comunas/${selectedRegionId}`);
      const data = response.data.data;
      setCommunes(data);
    } catch (error) {
      console.error(error);
      // Manejo de errores, por ejemplo, establecer comunas como un array vacío
      setCommunes([]);
    }
  };

  const onCommuneChange = (event) => {
    // Actualizar el estado de la comuna seleccionada
    setValue("commune", event.target.value);
  };

  const onSubmit = async (data) => {
    // Mapear IDs a nombres antes de enviar al servidor
    const regionIdName = await getRegionIdName(data.region);
    const communeIdName = await getCommuneIdName(data.commune);
  
    if (regionIdName && communeIdName) {
      data.region = regionIdName._id;
      data.commune = communeIdName._id;
      
      createAgreement(data).then(() => {
        navigate('/');
        console.log('Convenio creado');
      });
  
      // Enviar los datos al servidor
      console.log(data);
    } else {
      console.error('Error al obtener información de región o comuna');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nombre </label>
        <input autoComplete="off" {...register("name", { required: true } )} placeholder="Local de Comida" />
      </div>
      <div>
        <label htmlFor="description">Descripción </label>
        <input autoComplete="off" {...register("description", { required: true })} placeholder="Comida Rápida a domicilio, ubicados en ..." />
      </div>
      <div>
        <label htmlFor="image">Imagen/Logotipo </label>
        <input type='file' {...register("image")} />
      </div>
      <div>
        <label htmlFor="benefit">Beneficio </label>
        <input autoComplete="off" {...register("benefit", { required: true })} />
      </div>
      <div>
        <label htmlFor="region" className="form-label">
          Región
        </label>
        <select {...register("region")} name="region" onChange={onRegionChange}>
          <option value="" disabled selected>
            -- Selecciona una Región --
          </option>
          {regions.map((region) => (
            <option key={region._id} value={region._id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="commune" className="form-label">
          Comuna
        </label>
        <select {...register("commune")} name="commune" onChange={onCommuneChange}>
          <option value="" disabled selected>
            -- Selecciona una Comuna --
          </option>
          {communes.map((commune) => (
            <option key={commune._id} value={commune._id}>
              {commune.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="exclusiveSeniors">Adulto Mayor </label>
        <input type="checkbox" {...register("exclusiveSeniors")} />
      </div>
      <div>
        <label htmlFor="exclusivePregnant">Embarazada </label>
        <input type="checkbox" {...register("exclusivePregnant")} />
      </div>
      <div>
        <label htmlFor="exclusiveDisability">Discapacidad </label>
        <input type="checkbox" {...register("exclusiveDisability")} />
      </div>
      <input type="submit" />
    </form>
  );
};

export default AgreementForm;