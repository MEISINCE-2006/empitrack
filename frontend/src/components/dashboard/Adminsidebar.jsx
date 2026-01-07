import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import { motion } from "framer-motion";
import { useAuth } from '../../context/authContext';
import { useTheme } from '../../context/themeContext';

const Adminsidebar = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} h-screen fixed left-0 top-0 bottom-0 w-64 shadow-2xl p-3 flex flex-col justify-between`}>

      <div>
        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-teal-600'} h-12 flex items-center justify-center rounded-lg shadow-lg`}>
          <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-2" />
          <h3 className="text-2xl font-pacific font-semibold tracking-wide">EmpiTrack</h3>
        </div>
        <nav className="mt-3 space-y-1">
          <NavLink to="/admin-dashboard" className={({isActive}) => `${isActive ? "bg-teal-500 shadow-md scale-[1.02]" : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`} flex items-center space-x-4 py-2.5 px-4 rounded-lg transition-all duration-200`}end>
            <FaTachometerAlt className="text-lg" />
            <span className="text-lg">Dashboard</span>
          </NavLink>

          <NavLink to="/admin-dashboard/employees" className={({isActive}) => `${isActive ? "bg-teal-500 shadow-md scale-[1.02]" : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`} flex items-center space-x-4 py-2.5 px-4 rounded-lg transition-all duration-200`}>
            <FaUsers className="text-lg" />
            <span className="text-lg">Employees</span>
          </NavLink>

          <NavLink to="/admin-dashboard/departments" className={({isActive}) => `${isActive ? "bg-teal-500 shadow-md scale-[1.02]" : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`} flex items-center space-x-4 py-2.5 px-4 rounded-lg transition-all duration-200`}>
            <FaBuilding className="text-lg" />
            <span className="text-lg">Department</span>
          </NavLink>

          <NavLink to="/admin-dashboard/leaves" className={({isActive}) => `${isActive ? "bg-teal-500 shadow-md scale-[1.02]" : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`} flex items-center space-x-4 py-2.5 px-4 rounded-lg transition-all duration-200`}>
            <FaCalendarCheck className="text-lg" />
            <span className="text-lg">Leaves</span>
          </NavLink>

          <NavLink to="/admin-dashboard/salary" className={({isActive}) => `${isActive ? "bg-teal-500 shadow-md scale-[1.02]" : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`} flex items-center space-x-4 py-2.5 px-4 rounded-lg transition-all duration-200`}>
            <FaMoneyBillWave className="text-lg" />
            <span className="text-lg">Salary</span>
          </NavLink>

          <NavLink to="/admin-dashboard/settings" className={({isActive}) => `${isActive ? "bg-teal-500 shadow-md scale-[1.02]" : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`} flex items-center space-x-4 py-2.5 px-4 rounded-lg transition-all duration-200`}>
            <FaCog className="text-lg" />
            <span className="text-lg">Settings</span>
          </NavLink>
        </nav>
      </div>
      <div className={`border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-700'} pt-3`}>
        <div className="flex items-center space-x-3 px-3 py-2">
          <FaUserCircle className={`${theme === 'dark' ? 'text-teal-300' : 'text-teal-400'}`} />
          <div>
            <h4 className="font-semibold text-white">Admin</h4>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'} text-sm`}>HR Manager</p>
          </div>
        </div>

        <button onClick={handleLogout} className="flex items-center justify-start space-x-3 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg mt-2 transition-all duration-200">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Adminsidebar;
