import React, { useState, useEffect } from "react";
import axios from "axios";
import Summarycard from "./Summarycard";
import { useTheme } from "../../context/themeContext";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle
} from "react-icons/fa";

const Adminsummary = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalSalary: 0,
    leaveStats: {
      applied: 0,
      approved: 0,
      pending: 0,
      rejected: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      // Fetch employees
      const employeesRes = await axios.get('http://localhost:5000/api/employee', { headers });
      const employees = employeesRes.data.success ? employeesRes.data.employees : [];

      // Fetch departments
      const departmentsRes = await axios.get('http://localhost:5000/api/department', { headers });
      const departments = departmentsRes.data.success ? departmentsRes.data.departments : [];

      // Fetch leaves
      const leavesRes = await axios.get('http://localhost:5000/api/leave', { headers });
      const leaves = leavesRes.data.success ? leavesRes.data.leaves : [];

      // Calculate stats
      const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
      const leaveStats = leaves.reduce((acc, leave) => {
        acc[leave.status.toLowerCase()] = (acc[leave.status.toLowerCase()] || 0) + 1;
        return acc;
      }, { applied: leaves.length, approved: 0, pending: 0, rejected: 0 });

      setStats({
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        totalSalary,
        leaveStats
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gray-100'} h-screen flex items-center justify-center`}>
        <div className={`text-xl ${theme === 'dark' ? 'text-purple-300' : ''}`}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gray-100'} h-screen overflow-hidden flex flex-col animate-fadeIn`}>

      {/* Dashboard Title */}
      <h3 className={`text-3xl font-bold mb-10 text-center ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text' : 'bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text'} drop-shadow-md tracking-wide`}>
        Dashboard Overview
      </h3>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-shrink-0 mb-12">
        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaUsers />} text="Total Employees" number={stats.totalEmployees} color={theme === 'dark' ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600' : 'bg-gradient-to-br from-teal-500 to-teal-700'} />
        </div>

        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaBuilding />} text="Departments" number={stats.totalDepartments} color={theme === 'dark' ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600' : 'bg-gradient-to-br from-yellow-500 to-orange-600'} />
        </div>

        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaMoneyBillWave />} text={`Monthly Salary`} number={`₹${stats.totalSalary.toLocaleString()}`} color={theme === 'dark' ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600' : 'bg-gradient-to-br from-blue-500 to-blue-700'} />
        </div>
      </div>

      {/* Leave Title */}
      <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text' : 'bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text'} drop-shadow-md tracking-wide`}>
        Leave Details
      </h3>

      {/* Leave Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-shrink-0">

        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaFileAlt />} text="Applied" number={stats.leaveStats.applied} color={theme === 'dark' ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600' : 'bg-gradient-to-br from-cyan-500 to-teal-600'} />
        </div>

        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaCheckCircle />} text="Approved" number={stats.leaveStats.approved} color={theme === 'dark' ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600' : 'bg-gradient-to-br from-green-500 to-green-700'} />
        </div>

        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaHourglassHalf />} text="Pending" number={stats.leaveStats.pending} color={theme === 'dark' ? 'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600' : 'bg-gradient-to-br from-yellow-400 to-yellow-600'} />
        </div>

        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <Summarycard icon={<FaTimesCircle />} text="Rejected" number={stats.leaveStats.rejected} color={theme === 'dark' ? 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-600' : 'bg-gradient-to-br from-red-500 to-red-700'} />
        </div>
      </div>

    </div>
  );
};

export default Adminsummary;
