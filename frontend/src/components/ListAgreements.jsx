import { useState, useEffect } from "react";
import { getAgreements } from "../services/agreements.service";
import { getRegionName, getCommuneName } from "../lib/getNames"
import { useNavigate } from 'react-router-dom';
import axios from "../services/root.service"
import NavBar from "./NavBar";

const ListAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAgreements();
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
        <NavBar />
        {agreements.map((agreement) => (
            <div className="card" style={{ width: '18rem' }}>
                <br/>
                <img src="..." class="card-img-top" alt={agreement.image}/>
                <div class="card-body" key={agreement.id}>
                    <h5 class="card-title">{agreement.name}</h5>
                    <p class="card-text">{agreement.description}</p>
                    <a href="/" class="btn btn-primary">Conocer más</a>
                </div>
            </div>
        ))}
    </>
  );
};

export default ListAgreements;