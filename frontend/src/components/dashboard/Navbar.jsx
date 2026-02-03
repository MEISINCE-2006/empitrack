import React from "react";
import { useAuth } from "../../context/authContext";
import { useTheme } from "../../context/themeContext";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={`fixed top-0 left-64 right-0 z-50 flex items-center justify-between h-16 px-6 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 via-purple-900 to-gray-800 border-b border-purple-500/20' : 'bg-gradient-to-r from-teal-600 to-blue-600'} shadow-lg backdrop-blur-lg`}>
            {/* Company Name */}
            <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-500 to-purple-500' : 'bg-white/20'} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xl">K</span>
                </div>
                <h1 className={`text-2xl font-bold tracking-wide ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text' : 'text-white'}`}>
                    KANDA GURU HYDRAULICS
                </h1>
            </div>

            {/* Right Side - User Info & Theme Toggle */}
            <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-white/5 backdrop-blur-xl border border-purple-500/20' : 'bg-white/10'}`}>
                    <FaUserCircle className={`text-2xl ${theme === 'dark' ? 'text-cyan-400' : 'text-white'}`} />
                    <div className="text-left">
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                            {user?.name || 'Admin'}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-purple-300' : 'text-white/80'}`}>
                            {user?.role || 'Administrator'}
                        </p>
                    </div>
                </div>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className={`relative p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${theme === 'dark'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50'
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {theme === 'dark' ? (
                        <FaSun className="text-yellow-300 text-xl animate-pulse" />
                    ) : (
                        <FaMoon className="text-white text-xl" />
                    )}
                </button>
            </div>
        </div>
    )
}
export default Navbar
