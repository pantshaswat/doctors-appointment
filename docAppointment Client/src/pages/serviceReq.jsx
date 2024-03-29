import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [appointments, setAppointments] = useState([]);
  const [data, setData]= useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put("http://localhost:3000/appointment/viewallappointment", { withCredentials: true });
        console.log(response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id) => {
   
      try {
        const response = await axios.put('http://localhost:3000/appointment/approveorreject', {
          status: 'Approved',
          appointmentId: id,
        });
        console.log(response.data); // Handle response
      } catch (error) {
        console.error('Error approving appointment:', error);
      }
    }
  ;

  const handleReject = async (id) => {
    try {
      const response = await axios.put('http://localhost:3000/appointment/approveorreject', {
        status: 'Rejected',
        appointmentId: id,
      });
      console.log(response.data); // Handle response
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };




  return (

      <div className="bg-white rounded-md shadow-md p-4 m-4">
        <h3 className="text-xl font-semibold mb-2">Appointments</h3>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked by</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking for</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-3 py-2 whitespace-nowrap">{appointment._id}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(appointment.createdAt).toLocaleDateString()}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{appointment.description}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div >
                      {appointment.userId.fullName}
                      ({appointment .userId.email})
                      </div></td>
                    <td className="px-3 py-2 whitespace-nowrap">{appointment.doctorUserId}.</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {(appointment.status === "Pending")?(
                        <>
                        <button
                          onClick={() => handleApprove(appointment._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(appointment._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                          Reject
                        </button>
                        </>
                      ):(
                        <div>
                        {appointment.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No appointments available...</p>
        )}
      </div>
    );
};


export default Services;
