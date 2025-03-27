"use client"

import { Edit, Trash2, Mail } from "lucide-react"
import { motion } from "framer-motion"

const User = ({ user, onEdit, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <div className="relative">
                <div className="h-16 bg-teal-500"></div>
                <div className="absolute -bottom-10 left-4">
                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                </div>
            </div>

            <div className="p-4 pt-12 mt-2">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h3 className="text-xl font-bold text-gray-800">{`${user.first_name} ${user.last_name}`}</h3>
                    <div className="flex items-center mt-1 text-gray-600 text-sm">
                        <Mail size={14} className="mr-1" />
                        <p className="truncate">{user.email}</p>
                    </div>
                </motion.div>

                <div className="flex justify-end gap-2 mt-4">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(20, 184, 166, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEdit}
                        className="p-2 text-teal-500 rounded-full transition-colors"
                        aria-label="Edit user"
                    >
                        <Edit size={18} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDelete}
                        className="p-2 text-red-600 rounded-full transition-colors"
                        aria-label="Delete user"
                    >
                        <Trash2 size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default User

