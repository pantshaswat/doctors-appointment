import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const BookingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    doctorId: '',
    appointmentDate: 'none',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors from the backend API
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        throw new Error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      console.log('Booking appointment with doctor:', selectedDoctor);
      console.log('Appointment details:', formData);

      // Simulated API call
      try {
        // const response = await axios.post('API_ENDPOINT', formData);
        // if (response.status === 201) {
        //   console.log(`Appointment booked: ${response.data}`);
        //   navigate('/');
        // }
        navigate('/'); // Redirect to home page after successful booking
      } catch (error) {
        console.log(error);
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
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`p-4 border rounded-md cursor-pointer ${
                selectedDoctor && selectedDoctor.id === doctor.id
                  ? 'border-green-500 bg-green-100'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
              }`}
              onClick={() => handleSelectDoctor(doctor)}
            >
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialty}</p>
              <p className="text-sm text-gray-500">{doctor.location}</p>
            </div>
          ))}
        </div>
        {/* Selected Doctor Details */}
        {selectedDoctor && (
          <div className="mt-8 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Selected Doctor</h3>
            <p>{selectedDoctor.name}</p>
            <p>{selectedDoctor.specialty}</p>
            <p>{selectedDoctor.location}</p>
          </div>
        )}
        <div className="border-t my-8"></div>
        {/* Booking Form */}
        <div className="mt-8">
          <h3 className="text-3xl font-semibold mb-2 text-green-400">Booking Form</h3>
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
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
