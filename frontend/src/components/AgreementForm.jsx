import { useForm } from 'react-hook-form';
import { createAgreement } from '../services/agreements.service';
import { useNavigate } from 'react-router-dom';
import { getRegionIdName, getCommuneIdName } from '../lib/getNames';
import { useState, useEffect } from 'react';
import axios from "../services/root.service"

const AgreementForm = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [image, setImage] = useState(null);
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", image); // Agrega la imagen al FormData
    formData.append("benefit", data.benefit);
    formData.append("region", data.region);
    formData.append("commune", data.commune);
    formData.append("exclusiveSeniors", data.exclusiveSeniors);
    formData.append("exclusivePregnant", data.exclusivePregnant);
    formData.append("exclusiveDisability", data.exclusiveDisability);

    console.log("imagen", image);
    await createAgreement(formData);

    navigate('/convenios');
    console.log('Convenio creado');
  } catch (error) {
    console.error("Error al crear el convenio:", error);
  }
};

const handleCancel = () => {
  navigate(`/convenios`);
};

  return (
    <div className="container">
      <h1>Crear Convenio</h1>
      <br />
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

        <div class="mb-3">
            <label class="form-label" htmlFor="name">Nombre </label>
            <input class="form-control" autoComplete="off" {...register("name", { required: true } )} placeholder="Local de Comida" />
        </div>
        <div class="mb-3">
            <label class="form-label" htmlFor="description">Descripción </label>
            <input class="form-control" autoComplete="off" {...register("description", { required: true })} placeholder="Comida Rápida a domicilio, ubicados en ..." />
        </div>
        <div class="mb-3">
            <label class="form-label" htmlFor="image">Imagen/Logotipo </label>
            <input class="form-control" type='file' {...register("image")} onChange={handleImageChange}/>
        </div>
        <div class="mb-3">
            <label class="form-label" htmlFor="benefit">Beneficio </label>
            <input class="form-control" autoComplete="off" {...register("benefit", { required: true })} />
        </div>
        <div class="mb-3">
            <label class="form-label" htmlFor="region" className="form-label">
            Región
            </label>
            <select class="form-select" aria-label="Default select example" {...register("region")} name="region" onChange={onRegionChange}>
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
        <div class="mb-3">
            <label class="form-label" htmlFor="commune" className="form-label">
            Comuna
            </label>
            <select class="form-select" aria-label="Default select example" {...register("commune")} name="commune" onChange={onCommuneChange}>
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

        <div class="form-check">
            <label class="form-check-label" for="flexCheckDefault" htmlFor="exclusiveSeniors">Adulto Mayor </label>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" {...register("exclusiveSeniors")} />
        </div>
        <div class="form-check">
            <label class="form-check-label" for="flexCheckDefault" htmlFor="exclusivePregnant">Embarazada </label>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" {...register("exclusivePregnant")} />
        </div>
        <div class="form-check">
            <label class="form-check-label" for="flexCheckDefault" htmlFor="exclusiveDisability">Discapacidad </label>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" {...register("exclusiveDisability")} />
        </div>
        <br/>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-outline-secondary" onClick={handleCancel}>Cancelar</button>
            <input type="submit" class="btn btn-outline-primary" value={"Crear"}/>
        </div>
        <hr />
        </form>
    </div>
  );
};

export default AgreementForm;
