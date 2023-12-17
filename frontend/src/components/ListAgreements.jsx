import { useState, useEffect } from "react";
import { getData } from "../lib/getAgreements";

const ListAgreements = () => {
    const [agreements, setAgreements] = useState([]);

    useEffect(() => {
        getData().then((data) => setAgreements(data));
    }, []);

    return (
        <>
            {agreements.map((agreement) => (
            <div key={agreement._id}>
                <div>
                    <img src={agreement.image} alt={agreement.name} />
                    <h2>{agreement.name}</h2>
                    <p>{agreement.benefit}</p>
                    <p>{agreement.region}</p>
                    <p>{agreement.commune}</p>
                </div>
                <br />
            </div>
            ))}
        </>
    );
}

export default ListAgreements;