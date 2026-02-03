import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

const Adddepartment = () => {
    const { theme } = useTheme();
    const [department, setDepartment] = useState({
        dep_name: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please login first');
                navigate('/login');
                return;
            }
            const response = await axios.post(
                'http://localhost:5000/api/department/add',
                department,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                alert('Department added successfully!');
                navigate("/admin-dashboard/departments");
            } else {
                alert(response.data.error || "Failed to add department");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert('Unauthorized. Please login again.');
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                alert("An error occurred while adding the department");
            }
        }
    };

    return (
        <div className={`max-w-3xl mx-auto mt-10 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10' : 'bg-white shadow-xl'} p-8 rounded-2xl w-full md:w-[450px] transition-all duration-300`}>
            <div className="text-center mb-8">
                <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text' : 'text-gray-800'}`}>
                    Add Department
                </h3>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Create a new organization unit</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="dep_name" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-cyan-300' : 'text-gray-700'}`}>
                        Department Name
                    </label>
                    <select
                        name="dep_name"
                        id="dep_name"
                        value={department.dep_name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 appearance-none ${theme === 'dark'
                                ? 'bg-gray-800/50 border-purple-500/30 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                                : 'bg-white border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50'
                            }`}
                    >
                        <option value="">Select Department</option>
                        <option value="Welding">Welding</option>
                        <option value="Office">Office</option>
                        <option value="Assistant Labour">Assistant Labour</option>
                        <option value="Helper">Helper</option>
                    </select>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin-dashboard/departments')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${theme === 'dark'
                                ? 'bg-gray-700 text-white hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-[2] py-3 px-4 bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Adddepartment;
