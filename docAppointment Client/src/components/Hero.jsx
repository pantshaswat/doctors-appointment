import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Doctors from './Doctors';

const DoctorAppointment = () => {
    // Array of image URLs
    const imageUrls = [
        'https://hips.hearstapps.com/hmg-prod/images/book-gp-appointment-1641476111.jpg',
        'https://demigos.com/media/cache/61/e8/61e8be99d482c40c4f294b577a7d2e92.jpg',
        'https://healthplan.co.uk/wp-content/uploads/2023/01/how-to-book-an-appointment-with-gp.jpg',
        // Add more image URLs as needed
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Function to cycle through images
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [imageUrls.length]);

    return (
        <>
            <div
                className="relative text-white h-screen overflow-x-auto"
                style={{
                    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative', // Ensure the position is relative for overlay
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="max-w-screen-lg mx-auto text-center flex flex-col justify-center items-center h-full relative">
                    <p>Welcome to</p>
                    <p className="text-lg md:text-xl font-bold p-2 z-10 relative">
                        DOCTOR APPOINTMENT SYSTEM
                    </p>
                    <h1 className="md:text-6xl sm:text-5xl text-3xl font-bold md:py-6 z-10 relative">
                        Schedule Your Doctor's Appointment Online
                    </h1>
                    <div className="flex justify-center items-center z-10 relative">
                        <p className="md:text-4xl sm:text-3xl text-lg font-bold py-4">
                            Book Your Appointment Today
                        </p>
                    </div>
                    <p className="md:text-lg text-base font-bold text-gray-200 z-10 relative">
                        Your trusted platform for scheduling doctor appointments
                    </p>
                    <Link
                        to={'/login'}
                        className="bg-white text-green-500 w-[200px] rounded-md font-bold my-6 mx-auto py-4 z-10 relative"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            <section id='featuresection' className="featuresection">
                <div className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold leading-7 text-green-600 text-center">Discover our services</h2>
                    <p className="mt-4 text-lg leading-7 text-gray-600 text-center">

                        </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service Card */}
                        <ServiceCard
                            serviceName="General Checkup"
                            description="Schedule regular checkups with our experienced doctors to ensure your well-being."
                            price={50}
                            imageUrl="https://www.swaconhospital.com/wp-content/uploads/2019/09/34-5-reasons-why-you-need-a-regular-checkup-feat.jpg"
                        />
                        <ServiceCard
                            serviceName="Specialist Consultation"
                            description="Consult with specialist doctors in various fields for personalized treatment plans."
                            price={75}
                            imageUrl="https://myacare.com/uploads/AdminBlogs/5fc9301f8d7b4836976632ee11e27d03.png"
                        />
                        <ServiceCard
                            serviceName="Diagnostic Tests"
                            description="Book appointments for diagnostic tests to aid in the diagnosis of medical conditions."
                            price={100}
                            imageUrl="https://familypracticecenterpc.com/wp-content/uploads/2019/09/family-practice-near-me-medical-testing-center-Atlanta-GA-x-rays-Atlanta-GA-types-of-medical-tests-blood-test-1080x675.jpg"
                        />
                    </div>
                </div>
            </section>
            
            <Doctors />
            
            

            
        </>
    );
};

const ServiceCard = ({ serviceName, description, price, imageUrl }) => {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <img
                className="w-full h-56 object-cover object-center"
                src={imageUrl}
                alt="service"
            />
            <div className="p-4">
                <h2 className="text-gray-800 text-xl font-bold">{serviceName}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-600 font-bold"></span>
                    <Link to={'/appointment'} className="px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded">
                        Book now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointment;
