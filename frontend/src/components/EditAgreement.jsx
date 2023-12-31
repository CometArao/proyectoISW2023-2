// EditAgreement.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getAgreementByID, updateAgreement } from '../services/agreements.service';
import axios from "../services/root.service"
import { useNavigate } from 'react-router-dom'
import { values } from 'lodash';

const EditAgreement = () => {
    const { _id } = useParams();
    const { register, handleSubmit, errors, setValue } = useForm();
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [image, setImage] = useState(null);
    const [agreementData, setAgreementData] = useState(null);
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

        // Obtener los datos del convenio
        const fetchData = async () => {
            try {
                const agreement = await getAgreementByID(_id);
                setAgreementData(agreement);

                // Asignar valores del convenio al formulario
                const fieldsToSet = ['name', 'description', 'benefit', 'region', 'commune', 'exclusiveSeniors', 'exclusivePregnant', 'exclusiveDisability'];
                fieldsToSet.forEach(field => setValue(field, agreement[field]));

            } catch (error) {
                console.error('Error al obtener detalles del convenio:', error);
            }
        };

        fetchData();
}, [_id, setValue]);

    const handleUpdateSubmit = async (updatedData) => {
        try {
            const formData = new FormData();
    
            // Agregar campos al objeto FormData
            Object.entries(updatedData).forEach(([key, value]) => {
                formData.append(key, value);
            });
    
            // Agregar la imagen al objeto FormData
            formData.append('image', image);
    
            await updateAgreement(_id, formData);
            navigate(`/convenios/${_id}`);
        } catch (error) {
            console.error('Error al actualizar el convenio:', error);
            // Manejar errores...
        }
    };
    

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
    
    const onRegionChange = async (event) => {
        console.log('Region changed');
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
        console.log('Commune changed');
        // Actualizar el estado de la comuna seleccionada
        setValue("commune", event.target.value);
      };

    if (!agreementData) {
        // Mostrar carga o mensaje de error
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Editar Convenio</h1>
            <form onSubmit={handleSubmit(handleUpdateSubmit)} encType="multipart/form-data">
    
            <div class="mb-3">
                <label class="form-label" htmlFor="name">Nombre </label>
                <input class="form-control" autoComplete="off" {...register("name", { required: true } )}/>
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
                <select 
                    class="form-select" 
                    aria-label="Default select example" 
                    {...register("region")} 
                    name="region" 
                    onChange={onRegionChange}
                    value={agreementData.region}>
                <option value="" disabled>
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
                <select class="form-select"
                aria-label="Default select example" 
                {...register("commune")} 
                name="commune" 
                onChange={onCommuneChange}
                value={agreementData.commune}>
                <option value="" disabled defaultValue>
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
            <div class=" gap-2 d-md-flex justify-content-md-end">
                <input type="submit" class="btn btn-outline-success" value={"Guardar Cambios"}/>
            </div>
            <hr />
            </form>
        </div>
      );
};

export default EditAgreement;
