import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };
    
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Tarjeta Vecino</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/">Inicio</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link" to="/convenios">Convenios</Link>
                    </li>
                </ul>
                <div className="ms-auto">
                <button onClick={handleLogout} type="button" class="btn btn-outline-danger">Cerrar Sesión</button>
                </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;