import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import { useTheme } from '../../context/themeContext';

const Departmentlist = () => {
    const { theme } = useTheme();
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);

    const onDepartmentDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                setDepartments(prev => prev.filter(dep => dep._id !== id));
                setFilteredDepartments(prev => prev.filter(dep => dep._id !== id));
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete department");
        }
    };

    const fetchDepartments = async () => {
        setDepLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/api/department', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.departments.map((dep) => ({
                    _id: dep._id,
                    sno: sno++,
                    dep_name: dep.dep_name,
                    action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
                }));
                setDepartments(data);
                setFilteredDepartments(data);
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setDepLoading(false)
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredDepartments(records);
    }

    const customStyles = {
        table: {
            style: {
                backgroundColor: 'transparent',
            },
        },
        header: {
            style: {
                backgroundColor: 'transparent',
                color: theme === 'dark' ? '#fff' : '#000',
            },
        },
        headRow: {
            style: {
                backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
                borderBottomWidth: '1px',
                borderBottomColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderRadius: '8px 8px 0 0',
            },
        },
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: theme === 'dark' ? '#9ca3af' : '#4b5563',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#fff',
                color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
                borderBottomWidth: '1px',
                borderBottomColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                '&:hover': {
                    backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : '#f9fafb',
                    transition: 'all 0.2s',
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                borderTopWidth: '1px',
                borderTopColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            },
        },
    };

    return (
        <div className={`p-6 min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            <div className='text-center mb-8'>
                <h3 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text' : 'text-gray-900'}`}>
                    Manage Departments
                </h3>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>View, add, edit, or delete organization departments</p>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10'>
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search by department name..."
                        onChange={filterDepartments}
                        className={`w-full pl-4 pr-10 py-2.5 rounded-xl border outline-none transition-all duration-300 ${theme === 'dark'
                                ? 'bg-gray-800/50 border-purple-500/30 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                                : 'bg-white border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50'
                            }`}
                    />
                </div>

                <Link
                    to="/admin-dashboard/add-department"
                    className='w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center'>
                    + Add New Department
                </Link>
            </div>

            <div className={`rounded-xl shadow-2xl overflow-hidden border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                <DataTable
                    columns={columns}
                    data={filteredDepartments}
                    pagination
                    progressPending={depLoading}
                    progressComponent={<div className="p-10 text-xl font-medium">Loading Departments...</div>}
                    customStyles={customStyles}
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
};

export default Departmentlist;
