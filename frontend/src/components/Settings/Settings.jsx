import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaPalette, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/themeContext';

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    const [showThemeModal, setShowThemeModal] = useState(false);
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

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setShowThemeModal(false);
    };

    return (
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'} h-screen overflow-hidden flex flex-col`}>
            <h3 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text drop-shadow-md tracking-wide">
                Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                    <div className="flex items-center mb-4">
                        <FaUser className="text-teal-500 text-2xl mr-3" />
                        <h4 className="text-xl font-semibold">Profile Settings</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage your profile information and preferences.</p>
                    <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
                        Edit Profile
                    </button>
                </div>

                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                    <div className="flex items-center mb-4">
                        <FaLock className="text-teal-500 text-2xl mr-3" />
                        <h4 className="text-xl font-semibold">Security Settings</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Change password and manage security preferences.</p>
                    <button onClick={() => setShowPasswordModal(true)} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
                        Change Password
                    </button>
                </div>

                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                    <div className="flex items-center mb-4">
                        <FaBell className="text-teal-500 text-2xl mr-3" />
                        <h4 className="text-xl font-semibold">Notifications</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Configure notification preferences and alerts.</p>
                    <button onClick={() => setShowNotificationsModal(true)} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
                        Manage Notifications
                    </button>
                </div>

                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                    <div className="flex items-center mb-4">
                        <FaPalette className="text-teal-500 text-2xl mr-3" />
                        <h4 className="text-xl font-semibold">Appearance</h4>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Customize the look and feel of your dashboard.</p>
                    <button onClick={() => setShowThemeModal(true)} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
                        Customize Theme
                    </button>
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded shadow-lg max-w-md w-full`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">Change Password</h3>
                            <button onClick={() => setShowPasswordModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            />
                            <button onClick={handleChangePassword} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Notifications Modal */}
            {showNotificationsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded shadow-lg max-w-md w-full`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">Manage Notifications</h3>
                            <button onClick={() => setShowNotificationsModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
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
                            <button onClick={handleSaveNotifications} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Customize Theme Modal */}
            {showThemeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded shadow-lg max-w-md w-full`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">Customize Theme</h3>
                            <button onClick={() => setShowThemeModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => handleThemeChange('light')} className="w-full bg-gray-200 hover:bg-gray-300 text-black py-2 rounded">
                                Light Theme
                            </button>
                            <button onClick={() => handleThemeChange('dark')} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                                Dark Theme
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
