import React, { useState, useEffect } from "react";
import { getAgreements, getImageAgreement } from "../services/agreements.service";
import { getRegionName, getCommuneName } from "../lib/getNames";
import { useNavigate } from "react-router-dom";
import axios from "../services/root.service";
import NavBar from "./NavBar";

const ListAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAgreements();
        const agreementsWithNames = await Promise.all(
          data.map(async (agreement) => {
            const regionName = await getRegionName(agreement.region);
            const communeName = await getCommuneName(agreement.commune);
            console.log("agreement ", agreement.name);
            console.log("agreement.image", agreement.image);
            const imageBlob = await getImageAgreement(agreement.image);
            // console.log("imageBlob", imageBlob);

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
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <br />
        <button type="button" class="btn btn-outline-info">Modificar</button>
        <br />
        <br />
        <div className="row">
          {agreements.map((agreement) => (
            <div className="col-sm-4 mb-3 mb-sm-4" key={agreement.id}>
              <div className="card" style={{ width: "18rem" }}>
                <br />
                <img src={agreement.image} className="card-img-top" alt={agreement.name} />
                <div className="card-body">
                  <h5 className="card-title">{agreement.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {agreement.communeName}, {agreement.regionName}
                  </h6>
                  <p className="card-text">{agreement.description}</p>
                  <a href="/" className="btn btn-outline-primary">
                    Conocer más
                  </a>
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
