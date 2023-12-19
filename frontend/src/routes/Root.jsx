import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
// import Image from 'next/image';
// import escudo from '../assets/Escudo_Universidad_del_Bío-Bío.png';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();
  return (
    <div>

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle bg-body-tertiary fixed-top"> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Escudo_Universidad_del_Bío-Bío.png" alt="" style={{
              width: '100px',
              height: 'auto',
            }}></img>

          </a>
          <a className="navbar-brand" href="/">Junta de vecinos</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li> */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Tarjeta Vecino
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/estado-tarjeta">Consultar Estado de Tarjeta</a></li>
                  <li><a className="dropdown-item" href="/emitir-tarjeta">Emitir Tarjeta</a></li>
                  <li><a className="dropdown-item" href="/ver-solicitudes">Solicitudes</a></li>
                </ul>
              </li>

              <div className="vr"></div>

              <li className="nav-item">
                <a className="nav-link" href="#">Convenios</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                  </svg>
                </a>
                <ul className="dropdown-menu ms-auto" aria-labelledby='userDrop'>
                  <li><h6 className="dropdown-header">{user.roles[0].name}: {user.email}</h6></li>
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href='' onClick={handleLogout}>Cerrar sesion</a></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Outlet />
      </div>

    </div>
  );
}

export default Root;
