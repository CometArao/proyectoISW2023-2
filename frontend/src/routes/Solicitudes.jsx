import React, { useState, useEffect } from 'react';
import { solicitudes } from '../services/tarjeta.service';

function Listado(){ 
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    // Llama a la función solicitudes al cargar el componente
    solicitudes()
      .then((data) => {
        setTarjetas(data); // Actualiza el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error('Error fetching tarjetas:', error);
      });
  }, []); // El segundo parámetro [] asegura que se ejecute solo una vez al montar el componente


function Listado() {
  return (
  <>
//       <div>
//         <h2>Solicitudes de emisión</h2>

//         <table class="table table-primary table-hover">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">RUT</th>
//               <th scope="col">Nombre</th>
//               <th scope="col">Comuna</th>
//               <th scope="col">Opciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">1</th>
//               <td>12.345.678-9</td>
//               <td>Nombre, Apellido</td>
//               <td>X</td>
//               <td>X</td>
//             </tr>
//             <tr>
//               <th scope="row">2</th>
//               <td>12.345.678-9</td>
//               <td>Nombre, Apellido</td>
//               <td>X</td>
//               <td>X</td>
//             </tr>
//             <tr>
//               <th scope="row">3</th>
//               <td>12.345.678-9</td>
//               <td>Nombre, Apellido</td>
//               <td>X</td>
//               <td>

//                 <div class="d-flex gap-2 mb-3">
//                   <button type="button" class="btn btn-success">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16">
//                       <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"></path>
//                       <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
//                     </svg>
//                     Button
//                   </button>
//                   <button type="button" class="btn btn-danger">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
//                       <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
//                       <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
//                     </svg>
//                     Button
//                   </button>
//                   <button type="button" class="btn btn-secondary">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
//                       <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
//                       <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
//                     </svg>
//                     Button
//                   </button>
//                 </div>

//               </td>
//             </tr>
//           </tbody>
//         </table>

//       </div>
    </>
   );
 };
};

export default Listado;

