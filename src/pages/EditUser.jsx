"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { AppContext } from "../context/AppContext"
import { getUserById, updateUser } from "../hooks/ApiCalls"

const EditUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { logout } = useContext(AppContext)
    const queryClient = useQueryClient()

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
    })

    // Fetch user data
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
    })

    // Update user mutation
    const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success("User updated successfully")
            queryClient.invalidateQueries({ queryKey: ["users"] })
            navigate("/")
        },
        onError: () => {
            toast.error("Failed to update user")
        },
    })

    // Set form data when user data is loaded
    useEffect(() => {
        if (data?.data) {
            setFormData({
                first_name: data.data.first_name,
                last_name: data.data.last_name,
                email: data.data.email,
                avatar: data.data.avatar,
            })
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim()) {
            toast.error("Please fill in all required fields")
            return
        }

        updateMutation.mutate({
            id,
            userData: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
            },
        })
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
                <Navbar onLogout={handleLogout} />
                <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[70vh]">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-teal-500 animate-pulse mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
                <Navbar onLogout={handleLogout} />
                <div className="container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center"
                    >
                        <h3 className="text-xl font-bold text-red-500 mb-2">Error Loading User</h3>
                        <p className="text-gray-600 mb-4">We couldn't load the user data. Please try again later.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => queryClient.invalidateQueries({ queryKey: ["user", id] })}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                            >
                                Retry
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Back to Users
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <Navbar onLogout={handleLogout} />

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <div className="h-32 bg-teal-500 relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                        >
                            <img
                                src={formData.avatar || "/placeholder.svg"}
                                alt={`${formData.first_name} ${formData.last_name}`}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="pt-20 p-6"
                    >
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit User Profile</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                                    required
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={updateMutation.isPending}
                                    className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-70 shadow-md"
                                >
                                    {updateMutation.isPending ? "Updating..." : "Update User"}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-sm"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default EditUser

