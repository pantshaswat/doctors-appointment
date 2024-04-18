import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import ShopCart from './shopCart';
import img from '../assets/images/logo.png';

function validateJwt(token) {
  const payload = jwtDecode(token);
  return payload;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const cookies = new Cookies();
  const isAuthenticated = cookies.get('token') !== undefined;
  const token = cookies.get('token');
  let user = null;

  if (token) {
    user = validateJwt(token);
  }


  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };
  const handleOpenCart = () => {
    setOpen(true);
  };
  const handleCloseCart = () => {
    setOpen(false);
  };

  return (
    <div style={{ 
      position: 'relative', 
      zIndex: 500, 
   
     
      width: '100%',
      display: 'flex', 
      justifyContent: 'space-between', // Align items horizontally
      alignItems: 'center' // Align items vertically
    }} className="flex justify-between items-center h-24  max-w-[1240px] mx-auto text-black relative">
      <Link to={'/'}>
        {/* <img src={img} alt="Logo" style={{ height: '160px' }} /> */}
        <Link to={'/'} className="text-3xl font-bold text-green-600">
          Doctors Appointment
        </Link>
      </Link>

      <ul className="hidden md:flex space-x-4 text-green-600">
        <Link to={'/'} className="p-4">
          Home
        </Link>
        
        {token && (
          <>
            {/* //medical reports */}
          </>
        )}
        {/* {token && <Link to={'/join'} className="p-4">
          Join
        </Link>} */}
        {!isAuthenticated ? (
          <>
            <Link
              to="/register"
              className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-green-600 mr-5"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-green-600"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Login
            </Link>
          </>
        ) : (
          token  && (
            <>
            {
              user && user.role === 'ClientUser' && (
<Link className='p-4 underline hover:text-blue-500' to={'/doctorrequest'}>Register as a Doctor?</Link>
              )
            }
             {user && user.role === 'ClientUser' && (
                      <Link to={'/emergency'} className="p-4">
                      Emergency Appointment
                    </Link>
                    )}
                    {user && user.role === 'Doctor' && (
                      <Link to={'/doctorBookings'} className="p-4">
                      My Appointments
                    </Link>
                    )}
                    
       
              <div
                onClick={() => {
                  cookies.remove('token');
               
                  navigate('/');
                  window.location.reload();
                }}
                className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
                style={{
                  height: '40px',
                  paddingTop: '9px',
                  marginTop: '6px',
                  cursor: 'pointer', // Add cursor pointer
                  zIndex: 100000, // Ensure the button has higher z-index
                }}
              >
                Logout
              </div>
            </>
          )
        )}
      </ul>
      <div onClick={handleNav} className="block  md:hidden relative z-10">
        {nav ? (
          <AiOutlineClose size={20}/>
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <ul
      style={{ 
      
     
        backgroundColor: '#4c4f9f', // Background color
        
        
      }}
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 flex flex-col'
            : 'ease-in-out duration-500 fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#575ec2] m-4">

        </h1>
        <Link to={'/'} className="p-4 border-b border-gray-100">Home</Link>
        
        {user && user.role === 'Doctor' && (
                      <Link to={'/doctorBookings'} className="p-4">
                      My Appointments
                    </Link>
                    )}
       
        {token && user.role === 'ClientUser' && (

<Link className='p-4 underline hover:text-blue-500' to={'/doctorrequest'}>Register as a Doctor?</Link>

        )}

        {!isAuthenticated ? (
          <>
            <Link
              to="/register"
              className="p-4 border-b border-gray-100 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2] mr-5"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="p-4 border-b border-gray-100 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
              style={{
                height: '40px',
                paddingTop: '9px',
                marginTop: '6px',
              }}
            >
              Login
            </Link>

          </>
        ) : (

          token && user && (
            <>

              {/* logout */}
              <div
                onClick={() => {
                  cookies.remove('token');

                 
                  navigate('/');
                  window.location.reload();
                }}
                className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-[#575ec2]"
                style={{
                  height: '40px',
                  paddingTop: '9px',
                  marginTop: '6px',
                }}
              >
                Logout
              </div>

            </>



          )
        )}
        
     
      </ul>
    </div>
  );
};

export default Navbar;
