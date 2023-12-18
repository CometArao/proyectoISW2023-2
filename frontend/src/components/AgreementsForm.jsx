import { useForm } from "react-hook-form"
import { createAgreement } from "../services/agreement.service"
import { useNavigate } from "react-router-dom"
import { getRegionIdName, getCommuneIdName } from "../lib/getNames";
import { useState, useEffect } from "react";

const AgreementForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    createAgreement(data).then(() => {
      navigate('/');
      console.log("Convenio creado");
    });

    // Enviar los datos al servidor
    console.log(data);
    // ...
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
            <label htmlFor="region">Región</label>
            <select {...register("region", { required: true })}></select>
                <option value="1">Arica y Parinacota</option>
                <option value="2">Tarapacá</option>
                <option value="3">Antofagasta</option>
                <option value="4">Atacama</option>
                <option value="5">Coquimbo</option>
                <option value="6">Valparaíso</option>
                <option value="7">Metropolitana</option>
                <option value="8">O’Higgins</option>
                <option value="9">Maule</option>
                <option value="10">Ñuble</option>
                <option value="11">Biobío</option>
                <option value="12">Araucanía</option>
                <option value="13">Los Ríos</option>
                <option value="14">Los Lagos</option>
                <option value="15">Aysén</option>
                <option value="16">Magallanes</option>
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