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
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto text-black relative">
      <Link to={'/'}>
        {/* <img src={img} alt="Logo" style={{ height: '160px' }} /> */}
        <Link to={'/'} className="text-3xl font-bold text-green-600">
          Doctors Appointment
        </Link>
      </Link>

      <ul className="hidden md:flex space-x-4">
        <Link to={'/'} className="p-4">
          Home
        </Link>

        <Link to={'/book'} className="p-4">
          Appointment
        </Link>
        <Link to={'/profile'} className="p-4">
          Profile
        </Link>

        {token && (
          <>
            {/* //medical reports */}
          </>
        )}
        {token && <Link to={'/join'} className="p-4">
          Join
        </Link>}
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
          token && user && (
            <>
              <div
                onClick={() => {
                  cookies.remove('token');
                  navigate('/');
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
      <div onClick={handleNav} className="block md:hidden relative z-10">
        {nav ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <ul
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-20' // Increase z-index
            : 'ease-in-out duration-500 fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold text-green-600 m-4"></h1>
        <span className="p-4 border-b border-gray-600">Home</span>
        <span className="p-4 border-b border-gray-600">Services</span>
        <span className="p-4">Become a vendor</span>
      </ul>
    </div>
  );
};

export default Navbar;
