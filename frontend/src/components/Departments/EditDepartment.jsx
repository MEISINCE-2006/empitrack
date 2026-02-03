import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../context/themeContext';

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [department, setDepartment] = useState({ dep_name: '', description: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setDepartment({
                        dep_name: response.data.department.dep_name,
                        description: response.data.department.description || ''
                    });
                }
            } catch (error) {
                console.error(error);
                alert("Failed to fetch department details");
            } finally {
                setLoading(false);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update department");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className={`max-w-3xl mx-auto mt-10 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10' : 'bg-white shadow-xl'} p-8 rounded-2xl w-full md:w-[500px] transition-all duration-300`}>
            <div className="text-center mb-8">
                <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text' : 'text-gray-800'}`}>
                    Edit Department
                </h3>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Update organization unit details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="dep_name" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-cyan-300' : 'text-gray-700'}`}>
                        Department Name
                    </label>
                    <input
                        type="text"
                        name="dep_name"
                        id="dep_name"
                        value={department.dep_name}
                        onChange={handleChange}
                        placeholder="e.g. Mechanical Engineering"
                        required
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 ${theme === 'dark'
                                ? 'bg-gray-800/50 border-purple-500/30 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                                : 'bg-white border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50'
                            }`}
                    />
                </div>

                <div>
                    <label htmlFor="description" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-cyan-300' : 'text-gray-700'}`}>
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={department.description}
                        onChange={handleChange}
                        placeholder="Describe the department's role..."
                        rows="4"
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 resize-none ${theme === 'dark'
                                ? 'bg-gray-800/50 border-purple-500/30 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                                : 'bg-white border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50'
                            }`}
                    />
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
                        Update Department
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDepartment;
