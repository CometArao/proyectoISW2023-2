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
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="..."/>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  );
};