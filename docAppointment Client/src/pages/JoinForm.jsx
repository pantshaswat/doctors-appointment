import { UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

//toast
import { Toaster, toast } from 'sonner';

export default function FeedbackForm() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
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
    axios.post('http://localhost:3000/feedback/submit', data,
      { withCredentials: true }
    ).then(response => {
      if (response.status === 200) {
        console.log(`Feedback submitted: ${response.data}`);
        toast.success("Feedback submitted successfully. Thank you for your feedback!");
        navigate('/');
      }
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <>
      <Navbar />
      <div className='pt-2 pl-16 pr-16 pb-10'>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                    Subject
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        onChange={handleInputChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter subject"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                    Message
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      onChange={handleInputChange}
                      rows={5}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your feedback message"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button
              type="submit"
              className="mt-2 rounded-md bg-green-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Submit Feedback
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </>
  )
}

