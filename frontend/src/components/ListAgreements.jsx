import React, { useState, useEffect } from "react";
import { getAgreements, getImageAgreement, deleteAgreement } from "../services/agreements.service";
import { getAgreementsByRegion, getAgreementsByRegionAndCommune } from "../services/locations.service";
import { getRegionName, getCommuneName } from "../lib/getNames";
import { useNavigate } from "react-router-dom";
import axios from "../services/root.service";
import NavBar from "./NavBar";

var rol = null;

const Spinner = () => (
  <div class="d-flex align-items-center">
    <br />
    <br />
    <br />
    <strong role="status">Cargando convenios...</strong>
    <div class="spinner-border ms-auto text-primary" aria-hidden="true"></div>
  </div>
);

const ListAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const navigate = useNavigate();

  // console.log("usuario: ", localStorage.getItem('user'));
  if (localStorage.getItem("user")) {
    var usuario = JSON.parse(localStorage.getItem('user'));
    rol = usuario.roles[0].name;
    // console.log("rol usuario:", rol);
  }

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

    const fetchData = async () => {
      try {
        // Utilizar los filtros de región y comuna
        let data;
        if (selectedRegion && selectedCommune) {
          data = await getAgreementsByRegionAndCommune(selectedRegion, selectedCommune);
        } else if (selectedRegion) {
          data = await getAgreementsByRegion(selectedRegion);
        } else {
          data = await getAgreements();
        }

        const agreementsWithNames = await Promise.all(
          data.map(async (agreement) => {
            const regionName = await getRegionName(agreement.region);
            const communeName = await getCommuneName(agreement.commune);
            const imageBlob = await getImageAgreement(agreement.image);
            return {
              ...agreement,
              regionName,
              communeName,
              image: URL.createObjectURL(imageBlob),
            };
          })
        );
        setAgreements(agreementsWithNames);
      } catch (error) {
        console.error("Error al obtener convenios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRegion, selectedCommune]);

  // handles
  // NAVIGATE PARA IR A LA VISTA DE UN CONVENIO
  const handleCreateClick = () => {
    navigate("/convenios/crear");
  };

  const handleViewClick = (id) => {
    navigate(`/convenios/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/convenios/editar/${id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteAgreement(selectedAgreementId);
    } catch (error) {
      console.error("Error al eliminar convenio:", error);
    } finally {
      // Cerrar el modal
      handleCloseDeleteModal();
      // Actualizar la lista de convenios
      const data = await getAgreements();
      const agreementsWithNames = await Promise.all(
        data.map(async (agreement) => {
          const regionName = await getRegionName(agreement.region);
          const communeName = await getCommuneName(agreement.commune);
          const imageBlob = await getImageAgreement(agreement.image);
          return {
            ...agreement,
            regionName,
            communeName,
            image: URL.createObjectURL(imageBlob),
          };
        })
      );
      setAgreements(agreementsWithNames);
    }
  };

  const handleShowDeleteModal = (id) => {
    setSelectedAgreementId(id);
    setShowDeleteModal(true);
  };
  
  
  const handleCloseDeleteModal = () => {
    setSelectedAgreementId(null);
    setShowDeleteModal(false);
  };

  // Filtros por región-comuna
  const handleRegionChange = async (event) => {
    const regionValue = event.target.value;
    setSelectedRegion(regionValue);
    setSelectedCommune(null); // Reiniciar la comuna al cambiar la región

    try {
      // Obtener y configurar las comunas basadas en la región seleccionada
      const response = await axios.get(`/ubicaciones/comunas/${regionValue}`);
      const data = response.data.data;
      setCommunes(data);
    } catch (error) {
      console.error(error);
      // Manejo de errores, por ejemplo, establecer comunas como un array vacío
      setCommunes([]);
    }
  };

  const handleCommuneChange = (event) => {
    const communeValue = event.target.value;
    setSelectedCommune(communeValue);
  };



  return (
    <>
      <NavBar />
      <div className="container">
        <br />
        <br />
        {loading && <Spinner />}

        <div className="row">
          <div className="col-md-3 mb-3">
              <label htmlFor="region">Filtrar por Región:</label>
              <select id="region" className="form-select" onChange={handleRegionChange} value={selectedRegion || ""}>
                <option value="">Todas las Regiones</option>
                {regions.map((region) => (
                <option key={region._id} value={region._id}>
                {region.name}
                </option>
                ))}
              </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="commune">Filtrar por Comuna:</label>
            <select id="commune" className="form-select" onChange={handleCommuneChange} value={selectedCommune || ""}>
              <option value="">Todas las Comunas</option>
              {communes.map((commune) => (
                <option key={commune._id} value={commune._id}>
                {commune.name}
                </option>
            ))}
            </select>
          </div>
          <br />
          {rol === "admin" && (
            <button className="btn btn-outline-primary my-5" onClick={() => handleCreateClick()}>
              Crear Convenio
            </button>
          )}

          {agreements.map((agreement) => (
            <div className="col-sm-4 mb-3 mb-sm-4" key={agreement._id}>
              <div className="card" style={{ width: "18rem" }}>
                <br />
                <img src={agreement.image} className="card-img-top" alt={agreement.name} />
                <div className="card-body">
                  <h5 className="card-title">{agreement.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {agreement.communeName}, {agreement.regionName}
                  </h6>
                  <p className="card-text">{agreement.description}</p>
                  {/* Renderizar botones según el rol del usuario */}
                  {rol === "admin" && (
                    <div>
                      <button
                        className="btn btn-outline-primary mx-1"
                        onClick={() => handleViewClick(agreement._id)}
                      >
                        Ver
                      </button>
                      <button
                        className="btn btn-outline-success mx-1"
                        onClick={() => handleEditClick(agreement._id)}
                      >
                        Modificar
                      </button>
                      <button
                        className="btn btn-outline-danger mx-1"
                        onClick={() => handleShowDeleteModal(agreement._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}

                  {/* Si el rol no es "admin", mostrar el botón original */}
                  {rol !== "admin" && (
                    <a className="btn btn-outline-primary" onClick={() => handleViewClick(agreement._id)}>
                      Conocer más
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showDeleteModal ? 'block' : 'none' }}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminar Convenio</h5>
              <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseDeleteModal}></button>
            </div>
            <div class="modal-body">
              <p>¿Está seguro de eliminar este convenio?</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={handleCloseDeleteModal}>Cancelar</button>
              <button type="button" class="btn btn-danger" onClick={handleDeleteClick}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAgreements;
