
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import ShopCart from '../components/shopCart';
import PartsPage from './shop/PartsPage';
import Navbar from '../components/Navbar';
import HomePage from './homePage';

export default function UserDashPage(){
    const cookies = new Cookies();
    const navigate = useNavigate();

const handleLogOut = ()=>{
    cookies.remove('token');
    navigate('/login');
}
   return (<>
       <div>
<HomePage/>          {/* <ShopCart/> */}
           
    </div>
  
    </>)
}