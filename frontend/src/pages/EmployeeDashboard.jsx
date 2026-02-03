import React from "react";
import { useTheme } from "../context/themeContext";

const EmployeeDashboard = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-6`}>
      <h1 className="text-3xl font-bold">Employee Dashboard</h1>
    </div>
  );
};

export default EmployeeDashboard;
