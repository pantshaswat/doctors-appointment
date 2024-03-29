import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import HomePage from './homePage'
import axios from 'axios'
import { Toaster, toast } from 'sonner';

const DoctorRegistration= () => {

const navigate= useNavigate()
const [doctorInfo, setDoctorInfo] = useState(null);



function validateJwt(token) {
    const payload = jwtDecode(token);
    return payload;
}
const getDoctorInfo =(userId) =>{
    axios.get(`http://localhost:3000/doctor/getDoctorByUserId/${userId}`, { withCredentials: true })
      .then(response => {
         // Log the response data
         
        if (response.status === 200) {
          const doctorData = response.data;
          setDoctorInfo(doctorData);
         console.log(doctorData)
        }
      })
      .catch(error => {
        console.log('Error fetching doctor:', error);
      });
  };

  
  
  
 

      const cookies = new Cookies();
      const isAuthenticated = cookies.get('token') !== undefined;
      const token = cookies.get('token');
      let user = null;
    
      if (token) {
    
        user = validateJwt(token);
      }
      if (user.role === 'Doctor' && doctorInfo === null) {

        getDoctorInfo(user._id);
    }
      if (!isAuthenticated || !token) {
        return <HomePage />;
      }

      const [formData, setFormData] = useState({
        licenseNumber:"",
        qualification:"",
        specialization:"",
        status:"Pending"
      });


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        sendDataToBackend(formData);        
        };




    const sendDataToBackend = (data) => {

        axios.post('http://localhost:3000/doctor/submitRequest/'+user._id,data, {withCredentials: true})
        .then(response=>{
          if(response.status === 200){
            console.log(`Request submitted: ${response.data}`);
            toast.success("Request submitted successfully, Wait for approval.")
        setTimeout(() => {
      
          navigate('/');
        }, 1000);
      
          }
        })
          .catch(error => {
            console.log(error)
        })
        };

  return (
   <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <div className= 'text-5xl font-bold text-center text-[#423E37]'>DocAppointment</div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#423E37]">
        Register as a Doctor
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                  <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-[#e3b23c]">
            License Number
          </label>
          <div className="mt-2">
            <input
              id="licenseNumber"
              name="licenseNumber"
              type="text"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              autoComplete="licenseNumber"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a39594] sm:text-sm sm:leading-6"
            />
          </div>
        </div><div>
          <label htmlFor="qualification" className="block text-sm font-medium leading-6 text-[#e3b23c]">
            Qualification
          </label>
          <div className="mt-2">
            <input
              id="qualification"
              name="qualification"
              type="text"
              value={formData.qualification}
              onChange={handleInputChange}
              autoComplete="qualification"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a39594] sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium leading-6 text-[#e3b23c]">
           Specialization
          </label>
          <div className="mt-2">
            <input
              id="specialization"
              name="specialization"
              type="text"
              value={formData.specialization}
              onChange={handleInputChange}
              autoComplete="specialization"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#a39594] sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex w-full justify-center rounded-md bg-[#423E37] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6E675F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
Register              </button>
        </div>
      </form>
    </div>
    <Toaster/>
</div>
   </>
  )
}

export default DoctorRegistration