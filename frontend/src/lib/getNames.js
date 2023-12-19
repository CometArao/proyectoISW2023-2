import axios from "../services/root.service.js";
// Función para obtener el nombre de una región por su ID
export async function getRegionName(regionId) {
    const response = await axios.get(`/ubicaciones/${regionId}`);
    const data = response.data.data;
    return data.name;
  }
  
  // Función para obtener el nombre de una comuna por su ID
  export async function getCommuneName(communeId) {
    const response = await axios.get(`/ubicaciones/${communeId}`);
    const data = response.data.data;
    return data.name;
  }


// Función para obtener el nombre de una región por su ID
export async function getRegionIdName(regionId) {
  console.log("regionId", regionId)
  const response = await axios.get(`/ubicaciones/${regionId}`);
  const data = response.data.data;
  return data.name;
}

// Función para obtener el nombre de una comuna por su ID
export async function getCommuneIdName(communeId) {
  const response = await axios.get(`/ubicaciones/${communeId}`);
  const data = response.data.data;
  return data.name;
}
