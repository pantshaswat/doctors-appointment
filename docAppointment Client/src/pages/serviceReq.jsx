import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/appointments/view", { withCredentials: true });
        console.log(response.data.bookings);
        setAppointments(response.data.bookings);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/appointments/delete/${id}`, { withCredentials: true });
      console.log(response.data);
      // Remove the approved appointment from the data
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/appointments/delete/${id}`, { withCredentials: true });
      console.log(response.data);
      // Remove the rejected appointment from the data
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };
    



  return (
    <div className="bg-white rounded-md shadow-md p-4 m-4">
      <h3 className="text-xl font-semibold mb-2">Appointments</h3>
      {appointments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Schedule</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Type</th>


              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="px-6 py-4 whitespace-nowrap">{appointment._id}</td>

<td className="px-6 py-4 whitespace-nowrap">
  {new Date(appointment.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })}
</td>
  <td className="px-6 py-4 whitespace-nowrap">{appointment.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.bookingSchedule}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{appointment.bookingType
                }</td>
                

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleApprove(appointment._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(appointment._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments available...</p>
      )}
    </div>
  );
};


export default Services;
