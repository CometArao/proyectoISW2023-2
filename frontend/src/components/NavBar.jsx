import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return( 
    <nav>
        <ul>
            <li>
                <button onClick={() => navigate('/')}>Home</button>
            </li>
            <li>
                <button onClick={() => navigate('/auth')}>Login</button>
            </li>
            <li>
                <button onClick={() => navigate('/convenios')}>Convenios</button>
            </li>
        </ul>
    </nav>
    );
};

export default NavBar;