import { useForm } from "react-hook-form"
import { createAgreement } from "../services/agreement.service"
import { useNavigate } from "react-router-dom"
import { getRegionIdName, getCommuneIdName } from "../lib/getNames";
import { useState, useEffect } from "react";

const AgreementForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    // Obtener y configurar las regiones
    const fetchRegions = async () => {
      const response = await fetch('http://localhost:5000/api/ubicaciones/regiones');
      const data = await response.json();
      setRegions(data);
    };

    fetchRegions();
  }, []);

  const onSubmit = async (data) => {
    // Mapear IDs a nombres antes de enviar al servidor
    data.region = (await getRegionIdName(data.region)).name;
    data.commune = (await getCommuneIdName(data.commune)).name;
    createAgreement(data).then(() => {
      navigate('/');
      console.log("Convenio creado");
    });

    // Enviar los datos al servidor
    console.log(data);
    // ...
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
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
        <div className="mb-3">
        <label htmlFor="region" className="form-label">Región</label>
        <select className="form-control" id="region" name="region" ref={register({ required: 'Este campo es obligatorio' })}>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        {errors.region && <p>{errors.region.message}</p>}
      </div>
        <div>
            <label htmlFor="commune">Comuna </label>
            <input autoComplete="off" {...register("commune", { required: true })} />
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
        {errors.exampleRequired && <span>Este campo es obligatorio</span>}

      <input type="submit" />
    </form>
  )
}

export default AgreementForm