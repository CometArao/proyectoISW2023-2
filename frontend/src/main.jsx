import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import ListAgreements from './components/ListAgreements.jsx';
import AgreementForm from './components/AgreementForm.jsx';
import ViewAgreement from './components/ViewAgreement.jsx';
import EditAgreement from './components/EditAgreement.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/convenios/crear',
        element: <AgreementForm />,
      },
      {
        path: '/convenios/editar/:_id',
        element: <EditAgreement />,
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
  {
    path: 'convenios/:_id',
    element: <ViewAgreement />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);