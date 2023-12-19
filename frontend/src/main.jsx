import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';

// import './index.css';
import './styles/global.scss'; // bootstrap
import BootstrapClient from './components/BootstrapClient.js';


import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';

import Estado from './routes/EstadoTarjeta.jsx';
import Emitir from './routes/EmitirTarjeta.jsx';
import Listado from './routes/Solicitudes.jsx';

import ListAgreements from './components/ListAgreements.jsx';
import AgreementForm from './components/AgreementsForm.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,

    // errorElement: <ErrorPage />,
    errorElement: <Login />,

    errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <App />,
      },
      {

        path: '/estado-tarjeta',
        element: <Estado />,
      },
      {
        path: '/emitir-tarjeta',
        element: <Emitir />,
      },
      {
        path: '/ver-solicitudes',
        element: <Listado />,
      },

        path: '/convenios/crear',
        element: <AgreementForm />,
      }

    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },


  {
    path: '/convenios',
    element: <ListAgreements />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

);

);

