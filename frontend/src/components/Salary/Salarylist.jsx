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
      <h2 className="text-2xl font-bold mb-4">Salary Management</h2>
      <div className="overflow-x-auto">
        <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'} border`}>
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <th className="py-2 px-4 border-b">Employee ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary._id} className={`${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50'}`}>
                <td className="py-2 px-4 border-b">{salary.employeeId.employeeId}</td>
                <td className="py-2 px-4 border-b">{salary.employeeId.userId.name}</td>
                <td className="py-2 px-4 border-b">{salary.employeeId.department.dep_name}</td>
                <td className="py-2 px-4 border-b">{salary.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salarylist;
