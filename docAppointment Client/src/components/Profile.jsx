import React, { useState } from 'react';
import Navbar from './Navbar';

// Custom Card Component for Appointments
const AppointmentCard = ({ doctor, date, time, status }) => (
  <div className="bg-white shadow-md rounded-md p-4 mb-4">
    <h3 className="text-lg font-semibold mb-2">{doctor}</h3>
    <p className="text-sm text-gray-600 mb-1">Date: {date}</p>
    <p className="text-sm text-gray-600 mb-1">Time: {time}</p>
    <p className="text-sm text-gray-600">Status: {status}</p>
  </div>
);

const PatientProfile = () => {
  // Dummy patient data
  const [isEditable, setIsEditable] = useState(false);
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    address: '123 Main St',
    contactNumber: '123-456-7890',
    email: 'john.doe@example.com',
    history: [
      {
        doctor: 'Dr. Smith',
        date: '2023-03-15',
        diagnosis: 'Common cold',
        prescription: 'Antibiotics',
      },
      {
        doctor: 'Dr. Johnson',
        date: '2022-12-10',
        diagnosis: 'Headache',
        prescription: 'Painkillers',
      },
    ],
    appointments: [
      {
        doctor: 'Dr. Brown',
        date: '2024-04-01',
        time: '10:00 AM',
        status: 'Scheduled',
      },
      {
        doctor: 'Dr. White',
        date: '2024-04-15',
        time: '11:30 AM',
        status: 'Confirmed',
      },
    ],
  });
  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
    // Perform save operation, e.g., update data on the server
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 flex justify-between">
        {/* Profile Section */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Patient Profile</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="flex flex-col">
              <label className="mb-1">
                <strong>Name:</strong>{' '}
                {isEditable ? (
                  <input
                    type="text"
                    value={patientData.name}
                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                    className="border-b border-green-500 focus:outline-none"
                  />
                ) : (
                  patientData.name
                )}
              </label>
              {/* Other fields omitted for brevity */}
            </div>
            {isEditable ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Edit
              </button>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Appointment History</h3>
            <div>
              {patientData.history.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                  {/* History item content */}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Appointments Section */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div>
            {patientData.appointments.map((item, index) => (
              <AppointmentCard
                key={index}
                doctor={item.doctor}
                date={item.date}
                time={item.time}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
