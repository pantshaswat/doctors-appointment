import React from 'react'
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import BookingPage from './booking';

const Appointment = () => {

  const navigate = useNavigate();
  function validateJwt(token) {
    const payload = jwtDecode(token);
    return payload;
}
const cookies = new Cookies();
const isAuthenticated = cookies.get('token') !== undefined;
const token = cookies.get('token');
let user = null;

if (token) {
  user = validateJwt(token);
}

  return (
    <>
    {user.role === "ClientUser" ?(
      <BookingPage/>

    ):(
      <div>
        
      </div>

    )}
    </>
  )
}

export default Appointment