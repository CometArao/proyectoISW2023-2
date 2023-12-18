function Estado() {
  return (
    <>
      <div>

        <div class="row">
          <div class="col-md-auto">
            <p class="fs-2">Estado de Tarjeta Vecino:</p>
          </div>
          <div class="col-md-auto">
            <p class="fs-2 text-success">Activa</p>

          </div>
        </div>

        <p className='text-secondary'>(actualizada el día 1/12/23)</p>

        <div class="d-flex justify-content-center">

          <div class="card text-bg-light" style={{
            width: '400px',
          }}>
            <img src='/tarjeta-plantilla.jpeg' className="card-img" alt="..."
              style={{
                width: 'auto',
                height: 'auto',
              }}></img>
            <div class="card-img-overlay ">

              <div class="position-relative top-50 start-0">

                <div class="container text-center text-uppercase">

                  <div class="row mb-2">
                    <div className="col">
                      <p class="fw-bold text-primary mb-0 small">NOMBRES </p>
                      <p class="fw-bold mb-0">JOHN JOHN</p>
                    </div>

                  </div>

                  <div class="row mb-2">
                    <div className="col">
                      <p class="fw-bold text-primary mb-0 small">APELLIDO PATERNO </p>
                      <p class="fw-bold mb-0">DOE</p>
                    </div>
                    <div className="col">
                      <p class="fw-bold text-primary mb-0 small">APELLIDO materno </p>
                      <p class="fw-bold mb-0">DOE</p>
                    </div>
                    <div className="col">
                      <p class="fw-bold text-primary mb-0 small">R.U.N </p>
                      <p class="fw-bold mb-0">12.345.678-9</p>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div className="col">
                      <p class="fw-bold text-primary mb-0 small">COMUNA </p>
                      <p class="fw-bold mb-0">PUENTE ALTO, </p>
                      <p class="fw-bold mb-0">metropolitana </p>
                    </div>

                    <div className="col">
                      <p class="fw-bold text-primary mb-0 small">FECHA VENCIMIENTO </p>
                      <p class="fw-bold mb-0">03/24 </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>




        <br />

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card text-bg-light" >
                  <img src='/tarjeta-plantilla.jpeg' class="card-img" alt="..." width={100} height={600} sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}></img>
                  <div class="card-img-overlay">
                    {/* <div class="position-absolute top-50 start-0">
                      <div class="container text-center">
                        <div class="row">
                          <div class="col">
                            Nombres: John Doe
                          </div>
                          <div class="col">
                            Rut: 12.345.678-9
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            1 of 3
                          </div>
                          <div class="col">
                            2 of 3
                          </div>
                          <div class="col">
                            3 of 3
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default Estado;
