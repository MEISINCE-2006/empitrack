import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/themeContext';

const Leaveslist = () => {
  const { theme } = useTheme();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/leave', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLeaves(response.data.leaves);
      } catch (err) {
        setError('Failed to fetch leaves');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  if (loading) return <div className="p-6">Loading leaves...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text' : ''}`}>Leaves Management</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className={`min-w-full ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border-purple-500/20' : 'bg-white border-gray-300'} border rounded-lg overflow-hidden`}>
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50' : 'bg-gray-100'}`}>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Employee ID</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Leave Type</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Start Date</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>End Date</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className={`${theme === 'dark' ? 'hover:bg-purple-500/20 border-purple-500/10' : 'hover:bg-gray-50'} transition-all duration-200`}>
                <td className="py-2 px-4 border-b">{leave.employeeId}</td>
                <td className="py-2 px-4 border-b">{leave.leaveType}</td>
                <td className="py-2 px-4 border-b">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className={`py-2 px-4 border-b font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaveslist;
