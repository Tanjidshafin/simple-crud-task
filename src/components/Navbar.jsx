"use client"

import { LogOut, Users } from "lucide-react"
import { NavLink } from "react-router"
import { motion } from "framer-motion"

const Navbar = ({ onLogout }) => {
    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md sticky top-0 z-10"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="bg-teal-500 p-2 rounded-full"
                        >
                            <Users size={20} className="text-white" />
                        </motion.div>
                        <span className="text-xl font-bold text-teal-700">EmployWise</span>
                    </NavLink>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-red-700 hover:bg-gray-200 transition-colors"
                        aria-label="Logout"
                    >
                        <span className="hidden sm:inline">Logout</span>
                        <LogOut size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar

