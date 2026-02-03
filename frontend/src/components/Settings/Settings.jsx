import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/themeContext';

const Settings = () => {
    const { theme } = useTheme();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [phoneNotifications, setPhoneNotifications] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            const data = await response.json();
            if (data.success) {
                alert('Password changed successfully');
                setShowPasswordModal(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                alert(data.error || 'Failed to change password');
            }
        } catch (error) {
            alert('An error occurred while changing password');
        }
    };

    const handleSaveNotifications = () => {
        // Here you would typically make an API call to save notification preferences
        alert('Notification preferences saved');
        setShowNotificationsModal(false);
    };

    return (
        <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white' : 'bg-gray-100'} h-screen overflow-hidden flex flex-col`}>
            <h3 className={`text-3xl font-bold mb-10 text-center ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text' : 'bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text'} drop-shadow-md tracking-wide`}>
                Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border border-purple-500/20' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center mb-4">
                        <FaUser className={`${theme === 'dark' ? 'text-cyan-400' : 'text-teal-500'} text-2xl mr-3`} />
                        <h4 className="text-xl font-semibold">Profile Settings</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage your profile information and preferences.</p>
                    <button className={`mt-4 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' : 'bg-teal-600 hover:bg-teal-700'} text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                        Edit Profile
                    </button>
                </div>

                <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border border-purple-500/20' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center mb-4">
                        <FaLock className={`${theme === 'dark' ? 'text-purple-400' : 'text-teal-500'} text-2xl mr-3`} />
                        <h4 className="text-xl font-semibold">Security Settings</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Change password and manage security preferences.</p>
                    <button onClick={() => setShowPasswordModal(true)} className={`mt-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-teal-600 hover:bg-teal-700'} text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                        Change Password
                    </button>
                </div>

                <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border border-purple-500/20' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center mb-4">
                        <FaBell className={`${theme === 'dark' ? 'text-pink-400' : 'text-teal-500'} text-2xl mr-3`} />
                        <h4 className="text-xl font-semibold">Notifications</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Configure notification preferences and alerts.</p>
                    <button onClick={() => setShowNotificationsModal(true)} className={`mt-4 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' : 'bg-teal-600 hover:bg-teal-700'} text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                        Manage Notifications
                    </button>
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30' : 'bg-white'} p-6 rounded-xl shadow-2xl max-w-md w-full`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text' : ''}`}>Change Password</h3>
                            <button onClick={() => setShowPasswordModal(false)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} text-2xl transition-colors`}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700/50 text-white border-purple-500/30 focus:border-purple-500' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700/50 text-white border-purple-500/30 focus:border-purple-500' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700/50 text-white border-purple-500/30 focus:border-purple-500' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                            />
                            <button onClick={handleChangePassword} className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-teal-600 hover:bg-teal-700'} text-white py-2 rounded transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Notifications Modal */}
            {showNotificationsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30' : 'bg-white'} p-6 rounded-xl shadow-2xl max-w-md w-full`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text' : ''}`}>Manage Notifications</h3>
                            <button onClick={() => setShowNotificationsModal(false)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} text-2xl transition-colors`}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="email"
                                    checked={emailNotifications}
                                    onChange={(e) => setEmailNotifications(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="email">Email Notifications</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="phone"
                                    checked={phoneNotifications}
                                    onChange={(e) => setPhoneNotifications(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="phone">Phone Notifications</label>
                            </div>
                            <button onClick={handleSaveNotifications} className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' : 'bg-teal-600 hover:bg-teal-700'} text-white py-2 rounded transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
