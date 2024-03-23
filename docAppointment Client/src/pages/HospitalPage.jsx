import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the CSS for styling

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [formData, setFormData] = useState({
    userId: '65d72bbe3d32d88c3e241543',
    symptoms: '',
    hospitalId: '',
    appointmentDate: null,
    appointmentTime: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/serviceCenter/hospitals', { withCredentials: true });
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchHospitals();
  }, []);

  const handleSelectHospital = (hospital) => {
    setSelectedHospital(hospital);
    setFormData((prevData) => ({
      ...prevData,
      hospitalId: hospital._id,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleBookAppointment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/appointments/book', {
        ...formData,
        appointmentSchedule: selectedDate,
        centerId: selectedHospital._id,
        appointmentType: 'hospital',
      },
      { withCredentials: true });
      console.log(response.data);
      toast.success('Appointment Booked Successfully');
      navigate('/');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">Book Hospital Appointment</h2>
        {/* Hospital List */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="p-6 border rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer bg-white"
              onClick={() => handleSelectHospital(hospital)}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{hospital.name}</h3>
              <p className="text-lg text-gray-600 mb-2">{hospital.about}</p>
              <p className="text-lg text-gray-600">{hospital.address}</p>
            </div>
          ))}
        </div>
        {/* Selected Hospital Details */}
        {selectedHospital && (
          <div className="mt-8 p-6 border rounded-md shadow-md bg-white">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">Selected Hospital</h3>
            <div>
              <h3 className="text-xl font-semibold mb-2">{selectedHospital.name}</h3>
              <p className="text-lg text-gray-600 mb-2">{selectedHospital.about}</p>
              <p className="text-lg text-gray-600 mb-2">{selectedHospital.address}</p>
              <p className="text-lg text-gray-600">{selectedHospital.phoneNumber}</p>
            </div>
          </div>
        )}
        {/* Calendar */}
        <div className="mt-8 flex">
          <div className="w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 pt-4">Select Date</h3>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="border rounded-md shadow-md p-4"
            />
          </div>
          {/* Time Picker */}
          <div className="w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 pt-4">Select Time</h3>
            <DatePicker
              selected={selectedTime}
              onChange={setSelectedTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              className="border rounded-md shadow-md p-4"
            />
          </div>
        </div>
        {/* Booking Form */}
        <div className="mt-8">
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Symptoms */}
            <div>
              <label htmlFor="symptoms" className="block text-lg font-medium text-gray-700">
                Symptoms:
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </form>
          {/* Book Button */}
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={handleBookAppointment}
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

export default HospitalPage;
