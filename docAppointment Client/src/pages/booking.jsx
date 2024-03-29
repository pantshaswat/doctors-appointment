import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from "axios"

const BookingPage = () => {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    doctorId: '',
    appointmentDate: '',
  });

  const navigate = useNavigate();
  function validateJwt(token) {
    const payload = jwtDecode(token);
    return payload;
}
const cookies = new Cookies();
const isAuthenticated = cookies.get('token') !== undefined;
const token = cookies.get('token');
let user = null;

if (token) {

  user = validateJwt(token);
}

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/doctor/getAll", { withCredentials: true });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctors();
  }, []);



  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookAppointment = async () => {
    toast.success('Appointment Booked Successfully');
  
    if (selectedDoctor) {
      console.log('Booking appointment with doctor:', selectedDoctor.fullName);
      console.log('Appointment details:', formData);
  
      try {
        // Send a POST request to create a new appointment
        const response = await axios.post('http://localhost:3000/appointment/bookappointment', {
          userId: user,
          description: formData.description,
          location: formData.location,
          doctorId: selectedDoctor,
          appointmentDate: formData.appointmentDate,
        });
  
        if (response.status === 201) {
          console.log('Appointment created:', response.data.appointment);
          navigate('/'); // Redirect to home page after successful booking
        }
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    } else {
      alert('Please select a doctor before booking.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-3xl text-green-400 font-semibold mb-4 ">Select Doctor</h2>
        {/* Doctor List */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.filter((doctor) => doctor.status === "Verified").map((doctor) => (
            <div
              key={doctor._id}
              className={`p-4 border rounded-md cursor-pointer ${
                selectedDoctor && selectedDoctor.id === doctor.id
                  ? 'border-green-500 bg-green-100'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
              }`}
              onClick={() => handleSelectDoctor(doctor.doctorUserId)}
            >
              <h3 className="text-lg font-semibold">{doctor.doctorUserId.fullName}</h3>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
              <p className="text-sm text-gray-500">{doctor.qualification}</p>
            </div>
          ))}
        </div>
        {/* Selected Doctor Details */}
        {selectedDoctor && (
          <div className="mt-8 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Selected Doctor</h3>
            <p>{selectedDoctor.fullName}</p>

          </div>
        )}
        <div className="border-t my-8"></div>
        {/* Booking Form */}
        <div className="mt-8">
          <h3 className="text-3xl font-semibold mb-2 text-green-400 ">Booking Form</h3>
          <form className="">
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
                required
              />
            </div>
            {/* Appointment Date */}
            <div className='pt-6'>
              <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-600">
                Appointment Date:
              </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="mt-1 p-2 w-200 border rounded-md focus:outline-none focus:ring focus:border-green-300"
                required
              />
            </div>
          </form>
          {/* add location dropdown */}
          <div className='pt-6'>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">
              Location:
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
              required
            >
              <option value="none">Select Location</option>
              <option value="Lagos">Kathmandu</option>
              <option value="Abuja">Bhaktapur</option>
              <option value="Kano">Lalitpur</option>
              <option value="Port Harcourt">Suryabinayak</option>
            </select>
          </div>
          {/* Book Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleBookAppointment}
              className="bg-green-500 text-white 
              px-10 py-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
              disabled={!selectedDoctor}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default BookingPage;
