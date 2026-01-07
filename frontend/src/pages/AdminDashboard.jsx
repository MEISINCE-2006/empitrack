import React from "react";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/themeContext";
import Adminsidebar from "../components/dashboard/Adminsidebar";
import Navbar from "../components/dashboard/Navbar";
import Adminsummary from '../components/dashboard/Adminsummary'
import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (

      <div className="flex">
        <Adminsidebar/>
        <div className={`flex-1 ml-64 h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <Navbar />
          <Outlet/>

        </div>
      </div>

  );
};

export default AdminDashboard;
