import './App.css';
import AdminLogin from './pages/AdminLogin';
import HomePage from './pages/homePage';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {PrivateHomeRoute, PrivateLoginRoute,PrivateAdminRoute, PrivateServiceCenterRoute} from './components/privateRoute';
import UserDashPage from './pages/userDashPage';
import Dashboard from './components/Admin/Dashboard';
import Register from './pages/Register';
import SimpleSidebar from './components/SideBar';
import SimpleLayout from './components/SideBar';
import AdminPage from './pages/AdminPage';
import DetailsPage from './pages/shop/DetailsPage';
import Example from './pages/shop/PartsPage';
import PartsPage from './pages/shop/PartsPage';
import Users from './components/Admin/users';
import ServiceCenterRegistrationForm from './pages/JoinForm';
import BookingPage from './pages/booking';
import DoctorBookings from './pages/doctorBookings';
import CulturalWellnessRegistrationForm from './pages/culturalwellness';
import HospitalPage from './pages/HospitalPage';

import PatientProfile from './components/Profile';
import FeedbackForm from './pages/JoinForm';
import EmergencyServicesPage from './pages/EmergencySerrvice';
import DoctorRegistration from './pages/DoctorRegistration';
import Appointment from './pages/Appointment';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/admin/*" element={<PrivateAdminRoute />} />
        <Route exact path="/register" element={<Register />} />
        
       

        <Route exact path="/" element={<PrivateHomeRoute />} >
        <Route exact path="/" element={<UserDashPage/>} />
        </Route>
        
        <Route exact path="/login" element={<PrivateLoginRoute />} >
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/detailsPage" element={<DetailsPage />} />

        <Route exact path="/feedback" element={<FeedbackForm />} />
        <Route exact path="/appointment" element={<Appointment />} />
        <Route exact path="/booking" element={<BookingPage />} />
        
                <Route exact path="/emergency" element={<EmergencyServicesPage />} />
        
                <Route exact path="/doctorrequest" element={<DoctorRegistration/>} />
<Route exact path="/doctorbookings" element={<DoctorBookings/>} />



        
        {/* <Route exact path="/cart" element={<ShopCart />} /> */}
        

              <Route exact path="/dashboard/" element={<AdminPage/>}  />


        





        
      </Routes>

    </Router>
  );
}

export default App;
