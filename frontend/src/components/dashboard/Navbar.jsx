import React from "react";
import { useAuth } from "../../context/authContext";
import { useTheme } from "../../context/themeContext";

const Navbar = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    return (
        <div className={`flex items-center justify-center h-12 px-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-teal-600'}`}>
            <p className="text-white text-xl font-pacific tracking-wide">KANDA GURU HYDRAULICS</p>
        </div>
    )
}
export default Navbar
