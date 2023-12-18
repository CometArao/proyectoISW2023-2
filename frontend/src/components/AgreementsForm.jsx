import { useForm } from 'react-hook-form';
import { createAgreement } from '../services/agreement.service';
import { useNavigate } from 'react-router-dom';
import { getRegionIdName, getCommuneIdName } from '../lib/getNames';
import { useState, useEffect } from 'react';

const AgreementForm = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener y configurar las regiones
    const fetchRegions = async () => {
      const response = await fetch('http://localhost:5000/api/ubicaciones/regiones');
      const data = await response.json();
      setRegions(data.data);
    };

    fetchRegions();

    // Obtener y configurar las comunas
    const fetchCommunes = async () => {
      const response = await fetch('http://localhost:5000/api/ubicaciones/comunas');
      const data = await response.json();
      setCommunes(data.data);
    };

    fetchCommunes();
  }, []);

  const onRegionChange = async (event) => {
    // Obtener y configurar las comunas basadas en la región seleccionada
    const selectedRegionId = event.target.value;
    // Realiza una llamada para obtener las comunas de la región seleccionada
    // y actualiza el estado de las comunas
    // Puedes usar una función similar a fetchRegions
    // para obtener las comunas y actualizar setCommunes
  };

  const onCommuneChange = async (event) => {
    // Obtener y configurar las comunas basadas en la región seleccionada
    const selectedCommuneId = event.target.value;
    // Realiza una llamada para obtener las comunas de la región seleccionada
    // y actualiza el estado de las comunas
  };

  const onSubmit = async (data) => {
    // Mapear IDs a nombres antes de enviar al servidor
    data.region = (await getRegionIdName(data.region))._id;
    data.commune = (await getCommuneIdName(data.commune))._id;
    createAgreement(data).then(() => {
      navigate('/');
      console.log('Convenio creado');
    });

    // Enviar los datos al servidor
    console.log(data);
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
        <input autoComplete="off" {...register("image")} />
      </div>
      <div>
        <label htmlFor="benefit">Beneficio </label>
        <input autoComplete="off" {...register("benefit", { required: true })} />
      </div>
      <div>
        <label htmlFor="region" className="form-label">
          Región
        </label>
        <select>
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
        <select>
          {communes.map((commune) => (
            <option key={commune._id} value={commune._id}>
              {commune.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="exclusiveSeniors">Adulto Mayor </label>
        <input autoComplete="off" {...register("exclusiveSeniors")} />
      </div>
      <div>
        <label htmlFor="exclusivePregnant">Embarazada </label>
        <input autoComplete="off" {...register("exclusivePregnant")} />
      </div>
      <div>
        <label htmlFor="exclusiveDisability">Discapacidad </label>
        <input autoComplete="off" {...register("exclusiveDisability")} />
      </div>
      <input type="submit" />
    </form>
  );
};

export default AgreementForm;