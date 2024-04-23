import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorVerification = ({ doctor }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');

  function validateJwt(token) {
    const payload = jwtDecode(token);
    return payload;
  }

  let user = null;
  if (token) {
    user = validateJwt(token);
  }

  const handleApprove = async (id) => {
    // Implement the logic for approving a service center
    try {
      await axios({
        method: 'put',
        url: `http://localhost:3000/doctor/approve/${id}`,
        withCredentials: true
      })
        .then(response => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) { console.log(error) }
  }

  const handleReject = (id) => {
    // Implement the logic for rejecting a doctor
    console.log(`Rejecting doctor with ID: ${id}`);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-4 overflow-auto h-[100vh]" >
      <h3 className="text-xl font-semibold mb-2">Doctor Verification Requests</h3>
      {doctor ? (
        <div>
          {doctor.filter((doctorr) => doctorr.status === "Pending").map((doctorr) => (
            <div key={doctorr._id} className="mb-4">
              <p>Doctor's name: {doctorr.doctorUserId.fullName}</p>
              <p>License number: {doctorr.licenseNumber}</p>
              <p>Specialization: {doctorr.specialization}</p>
              <p>Qualification: {doctorr.qualification}</p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleApprove(doctorr.doctorUserId._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(doctorr.doctorUserId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {doctor.filter((doctorr) => doctorr.status === "Verified").length === 0 && <p>No doctor verification requests.</p>}
        </div>
      ) : (
        <p>No requests available...</p>
      )}
    </div>
  );
}

export default DoctorVerification;
