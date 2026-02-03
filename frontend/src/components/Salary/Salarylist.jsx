import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/themeContext';

const Salarylist = () => {
  const { theme } = useTheme();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/salary', {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.data.success) {
          setSalaries(response.data.salaries);
        }
      } catch (err) {
        setError('Failed to fetch salaries');
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  if (loading) return <div className="p-6">Loading salaries...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text' : ''}`}>Salary Management</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className={`min-w-full ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border-purple-500/20' : 'bg-white border-gray-300'} border rounded-lg overflow-hidden`}>
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50' : 'bg-gray-100'}`}>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Employee ID</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Name</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Department</th>
              <th className={`py-3 px-4 border-b ${theme === 'dark' ? 'text-cyan-300' : ''}`}>Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary._id} className={`${theme === 'dark' ? 'hover:bg-purple-500/20 border-purple-500/10' : 'hover:bg-gray-50'} transition-all duration-200`}>
                <td className="py-2 px-4 border-b">{salary.employeeId.employeeId}</td>
                <td className="py-2 px-4 border-b">{salary.employeeId.userId.name}</td>
                <td className="py-2 px-4 border-b">{salary.employeeId.department.dep_name}</td>
                <td className={`py-2 px-4 border-b font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-green-600'}`}>{salary.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salarylist;
