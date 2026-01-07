import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ onEmployeeAdded, onClose, employee: initialEmployee }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        employeeId: '',
        dob: '',
        age: '',
        gender: '',
        maritalStatus: '',
        department: '',
        salary: '',
        phone: '',
        address: '',
        photo: null
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const isEdit = !!initialEmployee;

    useEffect(() => {
        fetchDepartments();
        if (isEdit) {
            setEmployee({
                name: initialEmployee.userId.name,
                email: initialEmployee.userId.email,
                employeeId: initialEmployee.employeeId,
                dob: initialEmployee.dob ? new Date(initialEmployee.dob).toISOString().split('T')[0] : '',
                age: initialEmployee.age || '',
                gender: initialEmployee.gender || '',
                maritalStatus: initialEmployee.maritalStatus || '',
                department: initialEmployee.department._id,
                salary: initialEmployee.salary || '',
                phone: initialEmployee.phone || '',
                address: initialEmployee.address || '',
                photo: null
            });
        }
    }, [isEdit, initialEmployee]);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/department', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data.success) {
                setDepartments(response.data.departments);
            }
        } catch (error) {
            console.error('Failed to fetch departments', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dob') {
            const age = value ? new Date().getFullYear() - new Date(value).getFullYear() : '';
            setEmployee({ ...employee, [name]: value, age });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/employee/add', employee, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                alert('Employee added successfully!');
                onEmployeeAdded();
            } else {
                alert(response.data.error || "Failed to add employee");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while adding the employee");
            }
        }
    };

    return (
        <div className="w-full bg-white p-8 rounded-md shadow-md animate-slide-down">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{isEdit ? 'Edit Employee' : 'Add New Employee'}</h3>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="employeeId" className="text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={employee.employeeId}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={employee.dob}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="age" className="text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={employee.age}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        readOnly
                    />
                </div>

                <div>
                    <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={employee.gender}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700">Marital Status</label>
                    <select
                        name="maritalStatus"
                        value={employee.maritalStatus}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>

                
                <div>
                    <label htmlFor="department" className="text-sm font-medium text-gray-700">Department</label>
                    <select
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="salary" className="text-sm font-medium text-gray-700">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                

                <div>
                    <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={employee.address}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        rows="1"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="photo" className="text-sm font-medium text-gray-700">Photo</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={(e) => setEmployee({ ...employee, photo: e.target.files[0] })}
                        className="mt-0 w-full p-2 border border-gray-300 rounded-md"
                        accept="image/*"
                    />
                </div>

                <div className="md:col-span-3 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (isEdit) {
                                setEmployee({
                                    name: initialEmployee.userId.name,
                                    email: initialEmployee.userId.email,
                                    employeeId: initialEmployee.employeeId,
                                    dob: initialEmployee.dob ? new Date(initialEmployee.dob).toISOString().split('T')[0] : '',
                                    age: initialEmployee.age || '',
                                    gender: initialEmployee.gender || '',
                                    maritalStatus: initialEmployee.maritalStatus || '',
                                    department: initialEmployee.department._id,
                                    salary: initialEmployee.salary || '',
                                    phone: initialEmployee.phone || '',
                                    address: initialEmployee.address || '',
                                    photo: null
                                });
                            } else {
                                setEmployee({
                                    name: '',
                                    email: '',
                                    employeeId: '',
                                    dob: '',
                                    gender: '',
                                    maritalStatus: '',
                                    department: '',
                                    salary: '',
                                    phone: '',
                                    address: '',
                                    photo: null
                                });
                            }
                        }}
                        className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isEdit ? 'Reset' : 'Clear'}
                    </button>
                    <button
                        type="submit"
                        className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isEdit ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
