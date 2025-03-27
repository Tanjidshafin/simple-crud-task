"use client"

import { LogOut } from "lucide-react"
import { NavLink } from "react-router"

const Navbar = ({ onLogout }) => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="text-xl font-bold text-blue-600">
                        EmployWise
                    </NavLink>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Logout"
                    >
                        <span className="hidden sm:inline">Logout</span>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

