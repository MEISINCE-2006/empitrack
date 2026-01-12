import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import { useTheme } from '../../context/themeContext';

const Employeelist = () => {
  const { theme } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/employee', {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        setEmployees(response.data.employees);
      }
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/employee/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      alert('Failed to delete employee');
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleViewDetails = (employee) => {
    setViewingEmployee(employee);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className={`p-6 ${showAddForm ? 'overflow-hidden' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </div>
      {showAddForm && (
        <div className="mt-4">
          <AddEmployee onEmployeeAdded={() => { fetchEmployees(); setShowAddForm(false); }} onClose={() => setShowAddForm(false)} />
        </div>
      )}
      {!showAddForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(employee => (
          <div key={employee._id} className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 text-center`}>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{employee.userId.name}</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Employee ID: {employee.employeeId}</p>
            {employee.photo && (
              <img
                src={`/uploads/${employee.photo}`}
                alt={`${employee.userId.name}'s photo`}
                className="w-20 h-20 object-cover rounded-full mt-2 mx-auto"
              />
            )}
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{employee.department.dep_name}</p>
            <div className="mt-2 flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(employee)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleViewDetails(employee)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm transition-colors duration-200"
              >
                Details
              </button>
              <button
                onClick={() => handleDelete(employee._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <AddEmployee
              employee={editingEmployee}
              onEmployeeAdded={() => {
                fetchEmployees();
                setEditingEmployee(null);
              }}
              onClose={() => setEditingEmployee(null)}
            />
          </div>
        </div>
      )}

      {viewingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded shadow-lg max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Employee Details</h3>
              <button
                onClick={() => setViewingEmployee(null)}
                className={`${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'} text-2xl`}
              >
                ✕
              </button>
            </div>
            <div className="text-center">
              {viewingEmployee.photo && (
                <img
                  src={`http://localhost:5000/uploads/${viewingEmployee.photo}`}
                  alt={`${viewingEmployee.userId.name}'s photo`}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
              )}
              <p><strong>Name:</strong> {viewingEmployee.userId.name}</p>
              <p><strong>Email:</strong> {viewingEmployee.userId.email}</p>
              <p><strong>Employee ID:</strong> {viewingEmployee.employeeId}</p>
              <p><strong>Phone:</strong> {viewingEmployee.phone}</p>
              <p><strong>Department:</strong> {viewingEmployee.department.dep_name}</p>
              <p><strong>Salary:</strong> {viewingEmployee.salary}</p>
              <p><strong>Address:</strong> {viewingEmployee.address}</p>
              <p><strong>Gender:</strong> {viewingEmployee.gender}</p>
              <p><strong>Marital Status:</strong> {viewingEmployee.maritalStatus}</p>
              <p><strong>Date of Birth:</strong> {viewingEmployee.dob ? new Date(viewingEmployee.dob).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Age:</strong> {viewingEmployee.age}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employeelist;
