import axios from 'axios';
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const configuration = {
    method: 'post',
    url: 'http://localhost:3000/auth/signIn',
    headers: {
      "Content-Type": "application/json",


    },
    //with credentials
    withCredentials: true,
    data:{
      email,
      password
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios(configuration)
      .then((result) => {
        console.log(result);
        if (result.data.role === 'Admin') {
        console.log('Admin')
        navigate('/admin');
      }
      if(result.data.role === 'ClientUser' || result.data.role === 'Doctor'){
        navigate('/');
      }
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  return (
    <>
     
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-20">
         
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                onClick = {(e)=> handleSubmit(e)}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={'/register'} href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
Register   </Link>       </p>
        </div>
      </div>
    </>
  );
}
