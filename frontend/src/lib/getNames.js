// Función para obtener el nombre de una región por su ID
export async function getRegionName(regionId) {
    const response = await fetch(`http://localhost:5000/api/ubicaciones/${regionId}`);
    console.log(response);
    const data = await response.json();
    return data.data.name;
  }
  
  // Función para obtener el nombre de una comuna por su ID
  export async function getCommuneName(communeId) {
    const response = await fetch(`http://localhost:1611/api/ubicaciones/${communeId}`);
    const data = await response.json();
    return data.data.name;
  }


// Función para obtener el nombre de una región por su ID
export async function getRegionIdName(regionId) {
  const response = await fetch(`http://localhost:1611/api/ubicaciones/${regionId}`);
  console.log(response);
  const data = await response.json();
  return data.data.name;
}

// Función para obtener el nombre de una comuna por su ID
export async function getCommuneIdName(communeId) {
  const response = await fetch(`http://localhost:1611/api/ubicaciones/${communeId}`);
  const data = await response.json();
  return data.data.name;
}