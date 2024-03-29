import React from 'react'
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import BookingPage from './booking';
import { useEffect,useState } from 'react';

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
const [bookings, setBookings] = useState([]);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/appointment/viewappointment\${user._id}`);
  //       console.log(response.data);
  //       setBookings(response.data.bookings);
  //     } catch (error) {
  //       console.error("Error fetching appointments:", error);
  //     }
  //   };

  //   fetchBookings();
  // }, [user._id]);

  return (
    <>
    {user.role === "ClientUser" ?(
      <BookingPage/>

    ):(
      <div>
        {/* Appointments for Doctor {user.fullName}({user.role})
        <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>{booking.description}</li>
        ))}
      </ul> */}
      </div>

    )}
    </>
  )
}

export default Appointment