import React from 'react';
import { Outlet, Link, useLocation ,useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
      const cookies = new Cookies();


  const sidebarLinks = [
    { to: '/admin/', label: 'Dashboard', icon: '📊' },
    { to: '/admin/users', label: 'Users', icon: '💵' },

    { to: '/admin/services', label: 'Appointments', icon: '✅' },
        { to: '/admin/doctor', label: 'Doctor', icon: '👨‍⚕️' },
{to: '/admin/emergencyRequests', label: 'Emergency Requests', icon: "🚑"},

    { to: '/admin/inventory', label: 'Inventory', icon: '📦' },

        

    // { to: '/admin/notifications', label: 'Send Notifications', icon: '🔔' }, 


    
    
    // Add more links as needed
  ];
const handleLogOut = ()=>{
  cookies.remove('token');
               
                  navigate('/');
}
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-[#0d1117] w-60 p-3 flex flex-col">
        <div className="flex items-center gap-2 px-1 py-3">
          <Link to="/" className="
          
          text-3xl font-bold text-green-600
          text-center pl-8
          
          ">
            Doctor 
          </Link>
        </div>
        <div className="py-8 flex flex-1 flex-col gap-0.5">
          {sidebarLinks.map((link) => (
            <SimpleSidebarLink
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
              pathname={location.pathname}
            />
          ))
          }
          <button
            type="button"
            className={`${linkClass} text-neutral-400`}
            onClick={handleLogOut}
          >
          🚪Logout
        </button>
        </div>
        
      </nav>
      {/* Content on the right side */}
      <div className="flex-grow p-8 overflow-y-auto">
        <Outlet />
        
      </div>
    </div>
  );
}

function SimpleSidebarLink({ to, label, icon, pathname }) {
  return (
    <Link
      to={to}
      className={`${linkClass} ${pathname === to ? 'bg-neutral-700 text-white' : 'text-neutral-400'}`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}
