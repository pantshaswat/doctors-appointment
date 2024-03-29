

import { Navigate, Outlet,Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import HomePage from '../pages/homePage';
import {jwtDecode} from 'jwt-decode';
import AdminPage from '../pages/AdminPage';
import SimpleLayout from './SideBar';


function validateJwt(token){
  const payload =  jwtDecode(token);
  return payload;
}

const PrivateHomeRoute = ({ element }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');

  if (!isAuthenticated || !token) {
    return <HomePage />;
  }

  const user = validateJwt(token);
  

  return isAuthenticated ? <Outlet /> : <HomePage />;
};

const PrivateLoginRoute = ({ element }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');

  if (isAuthenticated && token) {
    const user = validateJwt(token);
    if (user.role === 'HealthCare') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};
const PrivateAdminRoute = ({ element }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');

  if (!isAuthenticated || !token) {
    return <Navigate to="/" />;
  }

  const user = validateJwt(token);

  if (isAuthenticated && user.role === 'HealthCare') {
    return <AdminPage />;
  }

  return <Navigate to="/" />;
};

const PrivateServiceCenterRoute = ({ element }) => { 
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');
  if (!isAuthenticated || !token) {
    return <Navigate to="/" />;
  }
  const user = validateJwt(token);
  if (isAuthenticated && user.role === 'Doctor') {
    return <Outlet />;
  }
  return <Navigate to="/" />;

}
export { PrivateHomeRoute, PrivateLoginRoute, PrivateAdminRoute ,PrivateServiceCenterRoute};
