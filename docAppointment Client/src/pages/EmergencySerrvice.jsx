import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Toaster, toast } from 'react-hot-toast';

const EmergencyServicesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    emergencyType: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/emergency/request', formData);
      if (response.status === 200) {
        toast.success('Emergency request submitted successfully. Help is on the way!');
        // Clear form after successful submission
        setFormData({
          name: '',
          phoneNumber: '',
          address: '',
          emergencyType: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error submitting emergency request:', error);
      toast.error('Failed to submit emergency request. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-3xl text-green-400 font-semibold mb-4">Request Emergency Assistance</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}
                   className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
                   required />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}
                   className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
                   required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
            <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange}
                   className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
                   required />
          </div>
          <div>
            <label htmlFor="emergencyType" className="block text-sm font-medium text-gray-600">Emergency Type</label>
            <input type="text" name="emergencyType" id="emergencyType" value={formData.emergencyType} onChange={handleInputChange}
                   className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
                   required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">Additional Message (if any)</label>
            <textarea name="message" id="message" value={formData.message} onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-green-300"
                      rows={3} />
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
