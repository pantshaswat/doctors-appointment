// SquareCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const  Appointments = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/serviceCenter/getAll", { withCredentials: true });
        console.log(response.data);
            const filteredData = response.data.filter(center => center.status === "false");

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //get user details by page

    fetchData();
  }, []);


 const handleApprove = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/appointments/delete/${id}`, {}, { withCredentials: true });
      console.log(response.data);
      // Remove the approved appointment from the data
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };
  const handleReject = async (id) => {
    // Implement the logic for rejecting a service center

    console.log(`Rejecting service center with ID: ${id}`);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-4">
      <h3 className="text-xl font-semibold mb-2">Requests</h3>
      {data ? (
        <div>
          {data.filter((center) => center.status === "false").length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">About</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.filter((center) => center.status === "false").map((center) => (
                  <tr key={center._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{center.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{center.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{center.about}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{center.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{center.type}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleApprove(center.ownerUserId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        APPROVE
                      </button>
                      <button
                        onClick={() => handleReject(center.ownerUserId)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        REJECT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending service center requests found.</p>
          )}
        </div>
      ) : (
        <p>No requests available...</p>
      )}
    </div>
  );
};

export default Appointments;
