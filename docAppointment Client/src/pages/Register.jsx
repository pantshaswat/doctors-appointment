
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "ClientUser",
    password: "",
    allocatedDepartment: "Cardiology",
    medicalCondition: "",
    dateOfBirth: "",
    gender: "Male"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`${key} is empty.`);
        
        return; // Prevent form submission
      }
    }

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email address.");
      return; // Prevent form submission
    }

    sendDataToBackend(formData);
  };

  const sendDataToBackend = (data) => {
    axios.post('http://localhost:3000/auth/register', data)
      .then(response => {
        if (response.status === 201) {
          console.log(`Account created: ${response.data}`);
          navigate('/login');
        }
        
         
        
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          alert('Email already in use')
        } else {
          console.error("Error creating user:", error);
          // Handle other errors
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  autoComplete="fullName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div><div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  autoComplete="phoneNumber"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
            <div className="flex items-center justify-between">
                <label htmlFor="allocatedDepartment" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Department
                </label>
                
              </div>              <select
                name='allocatedDepartment'
                id='allocatedDepartment'
                value={formData.allocatedDepartment}
                onChange={handleInputChange}
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300'
                required
                >
                <option value="Cardiology">Cardiology</option>
                <option value="Urology">Urology</option>
                <option value="Medicine">Medicine</option>
                <option value="Oncology">Oncology</option>
                <option value="Orthopedics">Orthopedics</option>
                
              </select>
</div>
<div>
<div className="flex items-center justify-between">
                <label htmlFor="medicalCondition" className="block text-sm font-medium leading-6 text-gray-900">
                 Medical Condition
                </label>
                
              </div>
<input
                  id="medicalCondition"
                  name="medicalCondition"
                  type="text"
                  value={formData.medicalCondition}
                  onChange={handleInputChange}
                  autoComplete="medicalCondition"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
</div>

<div>
<div className="flex items-center justify-between">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-gray-900">
                  Date of Birth
                </label>
                
              </div>           
                 <input
                type='date'
                name='dateOfBirth'
                id='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300'
                required
                >
</input>
</div>
<div>
<div className="flex items-center justify-between">
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                 Gender
                </label>
                
              </div>              
                <select
                name='gender'
                id='gender'
                value={formData.gender}
                onChange={handleInputChange}
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300'
                required
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
</div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Register
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={'/login'} href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
