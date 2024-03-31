
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import ShopCart from '../components/shopCart';
import PartsPage from './shop/PartsPage';
import Navbar from '../components/Navbar';
import HomePage from './homePage';
import Doctors from '../components/Doctors';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
export default function UserDashPage(){
    const cookies = new Cookies();
    const navigate = useNavigate();
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
                        <Link to={'/booking'} className="px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded">
                            Book now
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
const handleLogOut = ()=>{
    cookies.remove('token');
    navigate('/login');
}
   return (<>
       <div>
        <Navbar/>
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
           <Footer/>
    </div>
  
    </>)
}