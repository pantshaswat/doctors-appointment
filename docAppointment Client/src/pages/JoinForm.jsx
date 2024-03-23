
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from '../components/Navbar'
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';

//toast
import { Toaster, toast } from 'sonner';

function validateJwt(token){
  const payload =  jwtDecode(token);
  return payload;
}


export default function ServiceCenterRegistrationForm() {
    const cookies = new Cookies();

  
  const token = cookies.get('token');
  const user = validateJwt(token);


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    panCard: '',
    email: '',
    address: '',
    phoneNumber: '',
    type: 'spa',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(
      `name: ${name}, value: ${value}`
    )
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  sendDataToBackend(formData);
  //set a timer
  

  // navigate to home



  
  };
  const sendDataToBackend = (data) => {
    axios.post('http://localhost:3000/serviceCenter/submit/' + user._id, data,
    
    { withCredentials: true }
    )
  .then(response=>{
    if(response.status === 200){
      console.log(`Request submitted: ${response.data}`);
      toast.success("Request submitted successfully, Wait for approval.")
  setTimeout(() => {

    navigate('/');
  }, 1000);

    }
  })
    .catch(error => {
      console.log(error)
  })
  };
    return (<>
            <Navbar/>
        <div className='pt-2 pl-16 pr-16 pb-10'>
        <form
      onSubmit={handleSubmit}
        >
      <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              
          

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Business Name
                  </label>
                 
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 </div>sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                        autoComplete="name"
                        onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                    </div>
                    
              </div>
                </div>
                 <div>
                  <p className='block text-sm font-medium leading-6 text-gray-900'>Select your service</p>
                  <select name='type' onChange={handleInputChange} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                    <option value={'spa'}>Spa</option>
                    <option value={'salon'}>Salon</option>
                  </select>

                  </div>
                
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                      name="about"
                                              onChange={handleInputChange}

                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about service center.</p>
            </div>
  <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                PAN number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                  <input
                    type="number"
                    name="panCard"
                        id="panCard"
                                                onChange={handleInputChange}

                    autoComplete="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="12315"
                  />
                </div>
              </div>
                </div>
              
          
          

         

        
              </div>
              
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
                   <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                  <input
                    type="number"
                    name="phoneNumber"
                        id="phoneNumber"
                                                onChange={handleInputChange}

                    autoComplete="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            </div>

          

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                      id="email"
                                              onChange={handleInputChange}

                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

         

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                      type="text"
                                              onChange={handleInputChange}

                  name="address"
                  id="address"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          
          </div>
        </div>

      
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-12">
        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button> */}
        <button
              type="submit"
              onSubmit={handleSubmit}
          className="mt-2 rounded-md bg-green-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
          Save
        </button>
      </div>
        </form>
        <Toaster/>
            </div>
              </>
  )
}
