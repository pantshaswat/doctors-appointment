import React, { useState, useEffect } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js



export default function Dashboard() {
  // State variables for total counts and chart data
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalApprovals, setTotalApprovals] = useState(0);
  const [totalPendings, setTotalPendings] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  
    const barChartData = {
    labels: ['Total Customers', 'Total Vendors', 'Total Approvals', 'Total Pendings'],
    datasets: [
      {
        label: 'Count',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [totalCustomers, totalVendors, totalApprovals, totalPendings],
      },
    ],
  };
    const pieChartData = {
    labels: ['Total Customers', 'Total Vendors', 'Total Approvals', 'Total Pendings'],
    datasets: [
      {
        data: [12, 24, 1, 12],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
       
      },
    ],
  }
  

  // Fetch data from backend API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/count');
        const { totalCustomers, totalVendors, totalApprovals, totalPendings } = response.data;
        setTotalCustomers(totalCustomers);
        setTotalVendors(totalVendors);
        setTotalApprovals(totalApprovals);
        setTotalPendings(totalPendings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  //    const fetchAppointmentData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/appointment/view/${userId}/types`);
  //     setAppointmentTypeChartData(response.data.appointmentData);
  //   } catch (error) {
  //     console.error('Error fetching appointment data:', error);
  //   }
  // };

  // fetchAppointmentData();

    fetchData();
  }, []);

  // Sample data for additional charts (replace with actual data)


  // Sample data for additional charts (replace with actual data)
  const appointmentTypeChartData = {
    labels: ['Spa', 'Salon', 'Others'],
    datasets: [
      {
        label: 'Appointments by Type',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [50, 75, 25], // Sample data, replace with actual values
      },
    ],
  };

  return (
    <div className="flex flex-col pt-8 ">
      {/* Display total counts */}
      <div className="flex gap-4">
        {/* Render total count boxes */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center">
            <IoPeople className="text-3xl text-green-500" />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{totalCustomers}</h2>
              <p className="text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center">
            <IoPeople className="text-3xl text-green-500" />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{totalVendors}</h2>
              <p className="text-gray-500">Total Vendors</p>
            </div>
          </div>

        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center">
            <IoBagHandle className="text-3xl text-green-500" />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{totalApprovals}</h2>
              <p className="text-gray-500">Total Approvals</p>
            </div>
          </div>
          </div>
      </div>
      {/* Display main charts */}
      <div className="flex justify-center pt-20">
        <div className="w-1/2">
          {/* Display main Bar chart */}
          <h2 className="text-2xl font-semibold text-center mb-4">Appointments by Type</h2>
          <Bar data={appointmentTypeChartData} />
        </div>
        <div className="w-1/2">
          {/* Display main Pie chart */}
          <h2 className="text-2xl font-semibold text-center mb-4">Pie Chart</h2>
          <div
            className='
            pl-40
            
            '
            style={{ width: '500px', height: '300px' }}>
  <Pie data={pieChartData} />
</div>
        </div>
      </div>
      {/* Display additional charts */}
      <div className="flex justify-center mt-8">
        
        <div className="w-1/3">
          {/* Display additional Bar chart for appointments */}
         
        </div>
      </div>
    </div>
  );
}
