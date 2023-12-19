import React, { useState, useEffect } from 'react';
import { estadoTarjeta } from '../services/tarjeta.service';

function Estado() {
  const [tarjeta, setEstado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await estadoTarjeta();
        setEstado(response);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const estado = tarjeta.estado;
  const fechavenc = tarjeta.fechaVencimiento;
  const fechaemision = tarjeta.fechaEmision;

  if (estado == 'activa') {
    return (
      <>
        <div>

          <div className="row">
            <div className="col-md-auto">
              <p className="fs-2">Estado de Tarjeta Vecino:</p>
            </div>
            <div className="col-md-auto">
              <p className="fs-2 text-success text-capitalize">{estado}</p>

            </div>
          </div>

          <p className='text-secondary'>(actualizada el día 1/12/23)</p>

          <div className="d-flex justify-content-center">

            <div className="card text-bg-light" style={{
              width: '400px',
            }}>
              <img src='/tarjeta-plantilla.jpeg' className="card-img" alt="..."
                style={{
                  width: 'auto',
                  height: 'auto',
                }}></img>
              <div className="card-img-overlay ">

                <div className="position-relative top-50 start-0">

                  <div className="container text-center text-uppercase">

                    <div className="row mb-2">
                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">R.U.N </p>
                        <p className="fw-bold mb-0">{tarjeta.rut}</p>
                      </div>

                    </div>

                    <div className="row mb-2">
                    <div className="col">
                        <p className="fw-bold text-primary mb-0 small">FECHA VENCIMIENTO </p>
                        <p className="fw-bold mb-0">{fechavenc.split('-')[1]}/{fechavenc.split('-')[0].slice(2,4)} </p>
                      </div>

                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">FECHA EMISION </p>
                        <p className="fw-bold mb-0">{fechaemision.split('-')[1]}/{fechaemision.split('-')[0].slice(2,4)} </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <br />

        </div>

      </>
    );

  } else {
    return (
      <>
        <div>

          <div className="row">
            <div className="col-md-auto">
              <p className="fs-2">Estado de Tarjeta Vecino:</p>
            </div>
            <div className="col-md-auto">
              <p className="fs-2 text-danger text-capitalize">{estado}</p>

            </div>
          </div>

          <p className='text-secondary'>(actualizada el día 1/12/23)</p>

          <div className="d-flex justify-content-center">

            <div className="card text-bg-light" style={{
              width: '400px',
            }}>
              <img src='/tarjeta-plantilla.jpeg' className="card-img" alt="..."
                style={{
                  width: 'auto',
                  height: 'auto',
                }}></img>
              <div className="card-img-overlay ">

                <div className="position-relative top-50 start-0">

                  <div className="container text-center text-uppercase">

                    <div className="row mb-2">
                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">NOMBRES </p>
                        <p className="fw-bold mb-0">JOHN JOHN</p>
                      </div>

                    </div>

                    <div className="row mb-2">
                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">APELLIDO PATERNO </p>
                        <p className="fw-bold mb-0">DOE</p>
                      </div>
                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">APELLIDO materno </p>
                        <p className="fw-bold mb-0">DOE</p>
                      </div>
                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">R.U.N </p>
                        <p className="fw-bold mb-0">{tarjeta.rut}</p>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">COMUNA </p>
                        <p className="fw-bold mb-0">PUENTE ALTO, </p>
                        <p className="fw-bold mb-0">metropolitana </p>
                      </div>

                      <div className="col">
                        <p className="fw-bold text-primary mb-0 small">FECHA VENCIMIENTO </p>
                        <p className="fw-bold mb-0">03/24 </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>




          <br />
        </div>

      </>
    );
  }


}

export default Estado;
