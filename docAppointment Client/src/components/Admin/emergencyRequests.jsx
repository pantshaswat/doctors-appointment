import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function validateJwt(token) {
  const payload = jwtDecode(token);
  return payload;
}

const EmergencyRequestList = () => {
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const isAuthenticated = cookies.get('token') !== undefined;
  const navigate = useNavigate();
  const user = validateJwt(token);
  
  if (!isAuthenticated || !token) {
    return <HomePage />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointment/allemergency`);
        setAssistanceRequests(response.data);
      } catch (error) {
        console.error('Error fetching assistance requests:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewLocation = (location) => {
    const [latitude, longitude] = location;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (<>

<div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Assistance Requests</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assistanceRequests.map((request) => (
          <div key={request._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Request ID: {request._id}</h3>
            <h3 className="text-lg font-semibold mb-2">Name: {request.userId.fullName}</h3>
            <p className="mb-2"><span className="font-semibold">Description:</span> {request.description}</p>
            <p className="mb-2"><span className="font-semibold">Description:</span> {request.emergencyContact}</p>
            <p className="mb-2"><span className="font-semibold">Location:</span> {request.location.join(', ')}</p>
            <button 
              onClick={() => handleViewLocation(request.location)} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              View Location on Google Maps
            </button>
          </div>
        ))}
      </div>
    </div>
  </>

  );
};

export default EmergencyRequestList;