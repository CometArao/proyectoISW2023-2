import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getAgreementByID } from "../services/agreements.service";
import { getRegionName, getCommuneName } from "../lib/getNames";
import { getImageAgreement } from "../services/agreements.service";
import { useNavigate } from "react-router-dom";
import { deleteAgreement} from "../services/agreements.service";
import NavBar from "./NavBar";
import axios from "../services/root.service";

var rol = null;

const ViewAgreement = () => {
  const { _id } = useParams();
  const [agreement, setAgreement] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    var usuario = JSON.parse(localStorage.getItem('user'));
    rol = usuario.roles[0].name;
    // console.log("rol usuario:", rol);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agreementData = await getAgreementByID(_id);
        const regionName = await getRegionName(agreementData.region);
        const communeName = await getCommuneName(agreementData.commune);
        const imageBlob = await getImageAgreement(agreementData.image);

        agreementData.region= regionName;
        agreementData.commune = communeName;
        agreementData.image = URL.createObjectURL(imageBlob);
        agreementData.exclusiveSeniors = agreementData.exclusiveSeniors ? "Sí" : "No";
        agreementData.exclusivePregnant = agreementData.exclusivePregnant ? "Sí" : "No";
        agreementData.exclusiveDisability = agreementData.exclusiveDisability ? "Sí" : "No";

        setAgreement(agreementData);
      } catch (error) {
        console.error("Error al obtener detalles del convenio:", error);
      }
    };

    fetchData();
  }, [_id]);

  if (!agreement) {
    return (
      <>
        <NavBar />
        <div class="container">
            <div class="d-flex align-items-center">
                <br />
                <br />
                <br />
                <strong role="status">Cargando convenios...</strong>
                <div class="spinner-border ms-auto text-primary" aria-hidden="true"></div>
            </div>
        </div>
      </>
    );
  }

  const handleDeleteClick = async () => {
    try {
      await deleteAgreement(selectedAgreementId);
    } catch (error) {
      console.error("Error al eliminar convenio:", error);
    } finally {
      // Cerrar el modal
      handleCloseDeleteModal();
      // Actualizar la lista de convenios
      navigate("/convenios");
    };
    };
  const handleShowDeleteModal = (id) => {
    setSelectedAgreementId(id);
    setShowDeleteModal(true);
  };
  
  
  const handleCloseDeleteModal = () => {
    setSelectedAgreementId(null);
    setShowDeleteModal(false);
  };

  const handleBackClick = () => {
    navigate("/convenios");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <br />
        <div class="row align-items-start">
            <div class="col">
                <img src={agreement.image} alt={agreement.name} style={{ width: '540px', height: '540px' }}/>
            </div>
            <div class="col">
                <br />
                <br />
                <br />
                <h1>{agreement.name}</h1>
                <h3>{agreement.commune}, {agreement.region}</h3>
                <p>{agreement.description}</p>
                <h5>Beneficio</h5>
                <p>{agreement.benefit}</p>
                <h5>Convenio exclusivo para:</h5>
                <ul>
                    <li id="requisitos">
                        Adultos Mayores: {agreement.exclusiveSeniors}
                    </li>
                    <li id="requisitos">
                        Personas Gestantes: {agreement.exclusivePregnant}
                    </li>
                    <li id="requisitos">
                        Personas con Discapacidad: {agreement.exclusiveDisability}
                    </li>
                </ul>

                {/* Renderizar botones según el rol del usuario */}
                {rol === "admin" && (
                    <container>
                        <button type="button" class="btn btn-outline-success">Editar</button>
                        <button type="button" class="mx-2 btn btn-outline-danger" onClick={() => handleShowDeleteModal(agreement._id)}>Eliminar</button>
                    </container>
                )}
                <container class="sm">
                    <button type="button" class="btn btn-outline-primary" onClick={() => handleBackClick(agreement._id)}>Volver</button>
                </container>
            </div>
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

export default ViewAgreement;
