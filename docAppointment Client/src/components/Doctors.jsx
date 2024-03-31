import { useEffect, useState } from "react";
import axios from "axios";
const people = [
    {
        name: 'Dr. Emily Thompson',
        role: 'Cardiologist',
        imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
    name: 'Dr. James Roberts',
    role: 'Neurologist',
    imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'  },
    {
        name: 'Dr. Sarah Evans',
        role: 'Pediatrician',
        imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        name: 'Dr. John Doe',
        role: 'Dentist',
        imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // Add more doctors here...
];

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  useEffect( ()=> {
    const getDocs = async () => {
    try{

      const response = await axios.get('http://localhost:3000/doctor/getAll');
      console.log(response.data);
      if(Array.isArray(response.data)){
        setDoctors(response.data);
      }
      else{
        console.log("incorrect format")
      }
    }
    catch(error){
      console.error("Error fetching data:", error);
    }
  }
  getDocs();
  },[])
    return (
        <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Doctors</h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
            Our team of doctors are here to help you with your health concerns. We have specialists in various fields, including cardiology, neurology, pediatrics, and dentistry. Book an appointment with one of our doctors today.
            
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {doctors.map((doc) => (
            <li key={doc._id}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src='/docpic.jpg' alt="doc pic" />
                <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{doc.doctorUserId.fullName}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{doc.specialization}</p>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{doc.qualification}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
