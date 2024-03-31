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
  const [departBarChart, setDepartBarChart] = useState({});
const   [genderPieChart, setGenderPieChart] = useState({});
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
        
        const totalUser = response.data.find(item => item._id === 'ClientUser')?.count || 0;
        
        const totalDoc = response.data.find(item => item._id === 'Doctor')?.count || 0;
        setTotalCustomers(totalUser);
        setTotalVendors(totalDoc);
       
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    fetchData();
  }, []);


  useEffect(()=>{
    const fetchDepartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/patient/getAmounts');
        console.log(response.data)
        const  departmentStats  = response.data.departmentStats;
        const genderStats = response.data.genderStats;
        
        if ( genderStats && Array.isArray(genderStats)) {
          const genderNames = genderStats.map((item) => item._id);
          const genderCounts = genderStats.map((item) => item.count);
          setGenderPieChart({
            labels: genderNames,
            datasets: [
              {
                data: genderCounts,
                backgroundColor: [ '#36A2EB','#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB','#FF6384',  '#FFCE56'],
               
              },
            ],
          })
        } else {
          console.log('genderStats is not an array');
        }
        if ( departmentStats && Array.isArray(departmentStats)) {
          const departNames = departmentStats.map((item) => item._id);
          const departCounts = departmentStats.map((item) => item.count);
          setDepartBarChart({
            labels:departNames,
            datasets: [
              {
                label: 'Number of Patients',
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0','#FF7834'],
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                data: departCounts,
              },
            ],
          });
        } else {
          console.log('departmentStats is not an array');
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDepartData();
  },[])
  // Sample data for additional charts (replace with actual data)


 

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
              <p className="text-gray-500">Total Users</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center">
            <IoPeople className="text-3xl text-green-500" />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{totalVendors}</h2>
              <p className="text-gray-500">Total Doctors</p>
            </div>
          </div>

        </div>
        
      </div>
      {/* Display main charts */}
      <div className="flex justify-center pt-20">
        <div className="w-1/2">
          {/* Display main Bar chart */}
          <h2 className="text-2xl font-semibold text-center mb-4">Patients in Departments</h2>
          {departBarChart && Object.keys(departBarChart).length !== 0 ? (
    <Bar data={departBarChart} />
  ) : (
    <p>Loading...</p>
  )}
        </div>
        <div className="w-1/2">
          {/* Display main Pie chart */}
          <h2 className="text-2xl font-semibold text-center mb-4">Patient Gender Count</h2>
          <div
            className='
            pl-40
            
            '
            style={{ width: '500px', height: '300px' }}>
              
              {genderPieChart && Object.keys(genderPieChart).length !== 0 ? (
    <Pie data={genderPieChart} />
  ) : (
    <p>Loading...</p>
  )}
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
