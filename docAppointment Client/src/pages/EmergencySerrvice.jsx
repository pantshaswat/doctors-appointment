import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function validateJwt(token) {
  const payload = jwtDecode(token);
  return payload;
}

const EmergencyServicesPage = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const isAuthenticated = cookies.get('token') !== undefined;
  const navigate = useNavigate();

 
  let user = null;

  if (token) {

    user = validateJwt(token);
  }
  // State for form data
  const [formData, setFormData] = useState({
  
    description: '',
    emergencyContact: '',
    location: [], // Initial state set to empty array
  });

  // Effect for getting location when component mounts
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array ensures it runs only once when component mounts

  // Function to get the current location of the user
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // Update location state with obtained coordinates
        setFormData(prevState => ({
          ...prevState,
          location: [position.coords.latitude, position.coords.longitude],
        }));
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // Function to handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log('formdata', formData)
    try {
      const response = await axios.post(`http://localhost:3000/appointment/emergency/${user._id}`, formData);
      if (response.status === 201) {
        toast.success('Emergency request submitted successfully. Help is on the way!');
        // Clear form after successful submission
        setFormData({
          ...formData,
          description: '',
          emergencyContact: '',
        });
      }
    } catch (error) {
      console.error('Error submitting emergency request:', error);
      toast.error('Failed to submit emergency request. Please try again later.');
    }
  };

  // Redirect to homepage if user is not authenticated
  if (!isAuthenticated || !token) {
    return <HomePage />;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-3xl text-green-400 font-semibold mb-4">Request Emergency Assistance</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="emergencyContact"
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-10 py-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
            Request Assistance
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default EmergencyServicesPage;
