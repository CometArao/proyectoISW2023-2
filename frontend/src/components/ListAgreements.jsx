import { useState, useEffect } from "react";
import { getData } from "../lib/getAgreements";
import { getRegionName, getCommuneName } from "../lib/getNames";
import { useNavigate } from 'react-router-dom';
import axios from "../services/root.service"

const ListAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const agreementsWithNames = await Promise.all(
        data.map(async (agreement) => {
          const regionName = await getRegionName(agreement.region);
          const communeName = await getCommuneName(agreement.commune);

          return {
            ...agreement,
            regionName,
            communeName,
            // image: await axios.get(`/images/${agreement.image}`),
          };
        })
      );
      setAgreements(agreementsWithNames);
    };

    fetchData();
  }, []);

  return (
    <>
        <h1>Convenios</h1>
        <hr />
        <button onClick={() => navigate('/convenios/crear')}>Crear Convenio</button>
        <br />
        <br />
        {agreements.map((agreement) => (
        <div key={agreement._id}>
          <div>
            <img src={agreement.image} alt={agreement.name} />
            <h2>{agreement.name}</h2>
            <p>{agreement.benefit}</p>
            <p>{agreement.regionName}</p>
            <p>{agreement.communeName}</p>
          </div>
          <br />
        </div>
      ))}
    </>
  );
};

export default ListAgreements;
