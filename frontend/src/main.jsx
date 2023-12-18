import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import ListAgreements from './components/ListAgreements.jsx';
import AgreementForm from './components/AgreementsForm.jsx';

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
