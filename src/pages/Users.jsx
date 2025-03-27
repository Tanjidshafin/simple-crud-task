"use client"

import { useContext, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import User from "../components/User"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import Navbar from "../components/Navbar"
import { SkeletonGrid } from "../components/SkeletonLoader"
import { AppContext } from "../context/AppContext"
import { deleteUser, getUsers } from "../hooks/ApiCalls"

const UsersList = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const { logout } = useContext(AppContext)
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
    })
    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("User deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: () => {
            toast.error("Failed to delete user")
        },
    })
    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleEditUser = (userId) => {
        navigate(`/edit/${userId}`)
    }

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteMutation.mutate(userId)
        }
    }
    const filteredUsers =
        data?.data.filter((user) => {
            if (!searchTerm) return true
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
            return fullName.includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        }) || []

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <Navbar onLogout={handleLogout} />
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                >
                    <h1 className="text-3xl font-bold text-teal-700">Users List</h1>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </motion.div>

                {isLoading ? (
                    <SkeletonGrid />
                ) : (
                    <>
                        <AnimatePresence>
                            {filteredUsers.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredUsers.map((user, index) => (
                                        <motion.div
                                            key={user.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.1,
                                                ease: "easeOut",
                                            }}
                                        >
                                            <User
                                                user={user}
                                                onEdit={() => handleEditUser(user.id)}
                                                onDelete={() => handleDeleteUser(user.id)}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                                        alt="No results"
                                        className="w-32 h-32 mb-4 rounded-full object-cover opacity-50"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
                                    <p className="text-gray-500">We couldn't find any users matching your search criteria.</p>
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!searchTerm && filteredUsers.length > 0 && (
                            <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={setPage} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default UsersList

