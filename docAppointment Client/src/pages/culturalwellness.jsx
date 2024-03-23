import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Toaster, toast } from 'sonner';

export default function CulturalWellnessRegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    about: '',
    panCard: '',
    email: '',
    address: '',
    phoneNumber: '',
    culturalInterests: '',
    preferredLanguage: '',
    musicSelection: '',
    environmentPreference: '',
    customField1: '',
    customField2: '',
    customField3: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendDataToBackend(formData);
  };

  const sendDataToBackend = (data) => {
    axios
      .post('http://localhost:3000/serviceCenter/submit/', data)
      .then((response) => {
        if (response.status === 200) {
          console.log(`Request submitted: ${response.data}`);
          toast.success('Request submitted successfully. Please wait for approval.');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className='pt-2 pl-16 pr-16 pb-10'>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            {/* Existing form fields */}
            {/* Add fields for cultural wellness */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Cultural Wellness Information</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="culturalInterests" className="block text-sm font-medium leading-6 text-gray-900">
                    Cultural Interests
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="culturalInterests"
                      name="culturalInterests"
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Describe your cultural interests.</p>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="preferredLanguage" className="block text-sm font-medium leading-6 text-gray-900">
                    Preferred Language
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="preferredLanguage"
                      id="preferredLanguage"
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="musicSelection" className="block text-sm font-medium leading-6 text-gray-900">
                    Music Selection
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="musicSelection"
                      id="musicSelection"
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="environmentPreference" className="block text-sm font-medium leading-6 text-gray-900">
                    Environment Preference
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="environmentPreference"
                      id="environmentPreference"
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="customField1" className="block text-sm font-medium leading-6 text-gray-900">
                    Custom Field 1
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="customField1"
                      id="customField1"
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="customField2" className="block text-sm font-medium leading-6 text-gray-900">
                    Custom Field 2
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="customField2"
                      id="customField2"
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="customField3" className="block text-sm font-medium leading-6 text-gray-900">
                    Custom Field 3
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="customField3"
                      id="customField3"
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="mt-6 flex items-center justify-end gap-x-12">
            <button
              type="submit"
              className="mt-2 rounded-md bg-green-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Save
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
}
