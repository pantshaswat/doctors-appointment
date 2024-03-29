import React from 'react';
import Dashboard from '../components/Admin/Dashboard';
import { Routes, Route } from 'react-router-dom';
import UserDashPage from './userDashPage';
import Sidebar from '../components/SideBar';
import Users from '../components/Admin/users';
import Services from './serviceReq';
import NotificationScreen from './sendNotification';
import ServiceCenter from '../components/Admin/serviceCenter';
import Login from './Login';
import Appointments from './appointments';
import DoctorsPage from '../components/Admin/DoctorPageAdmin';
import Inventory from '../components/Admin/Inventory';

const AdminPage = () => {

	

	
  	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1">
			<Routes>
						<Route path="/" element={<Dashboard />} />
					
						<Route path="/users" element={<Users />} />
          				<Route path="/services" element={<Services/>} />
						<Route path="/appointments" element={<Appointments />} />
						<Route path="/doctor" element={<DoctorsPage />} />
						{/* <Route path="/medical-institution" element={<Appointments />} /> */}
						<Route path="/inventory" element={<Inventory />} />

						

						
						<Route path="/notifications" element={<NotificationScreen />} />
						{/* //logout button */}
						
						
						
						
          {/* Add other routes as needed */}
        </Routes> 
			</div>
		</div>
	)
   
};

export default AdminPage;
