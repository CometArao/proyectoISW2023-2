import React, { useState, useEffect } from "react";
import { getAgreements, getImageAgreement } from "../services/agreements.service";
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
  const navigate = useNavigate();
  // console.log("usuario: ", localStorage.getItem('user'));
  if (localStorage.getItem("user")) {
    var usuario = JSON.parse(localStorage.getItem('user'));
    rol = usuario.roles[0].name;
    // console.log("rol usuario:", rol);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAgreements();
        const agreementsWithNames = await Promise.all(
          data.map(async (agreement) => {
            const regionName = await getRegionName(agreement.region);
            const communeName = await getCommuneName(agreement.commune);
            // console.log("agreement ", agreement.name);
            // console.log("agreement.image", agreement.image);
            const imageBlob = await getImageAgreement(agreement.image);
            // console.log("imageBlob", imageBlob);
            // console.log("agreement id", agreement._id);
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
        // Después de cargar los datos, actualiza el estado de carga
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // NAVIGATE PARA IR A LA VISTA DE UN CONVENIO
  const handleViewClick = (id) => {
    navigate(`/convenios/${id}`);
  };


  return (
    <>
      <NavBar />
      <div className="container">
        <br />
        <br />
        <br />
        {loading && <Spinner />}
        <div className="row">
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
                        onClick={() => handleDeleteClick(agreement._id)}
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
    </>
  );
};

export default ListAgreements;
