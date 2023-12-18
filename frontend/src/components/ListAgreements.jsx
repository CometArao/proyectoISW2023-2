import { useState, useEffect } from "react";
import { getData } from "../lib/getAgreements";
import { getRegionName, getCommuneName } from "../lib/getNames";

const ListAgreements = () => {
  const [agreements, setAgreements] = useState([]);

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
          };
        })
      );
      setAgreements(agreementsWithNames);
    };

    fetchData();
  }, []);

  return (
    <>
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


// import { useState, useEffect } from "react";
// import { getData } from "../lib/getAgreements";

// const ListAgreements = () => {
//     const [agreements, setAgreements] = useState([]);

//     useEffect(() => {
//         getData().then((data) => setAgreements(data));
//     }, []);

//     return (
//         <>
//             {agreements.map((agreement) => (
//             <div key={agreement._id}>
//                 <div>
//                     <img src={agreement.image} alt={agreement.name} />
//                     <h2>{agreement.name}</h2>
//                     <p>{agreement.benefit}</p>
//                     <p>{agreement.region}</p>
//                     <p>{agreement.commune}</p>
//                 </div>
//                 <br />
//             </div>
//             ))}
//         </>
//     );
// }

// export default ListAgreements;