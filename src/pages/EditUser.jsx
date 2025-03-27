"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
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
            <div className="min-h-screen bg-gray-100">
                <Navbar onLogout={handleLogout} />
                <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar onLogout={handleLogout} />
                <div className="container mx-auto px-4 py-8 text-center text-red-500">
                    Error loading user data. Please try again.
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar onLogout={handleLogout} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>

                    <div className="flex justify-center mb-6">
                        <img
                            src={formData.avatar || "/placeholder.svg"}
                            alt={`${formData.first_name} ${formData.last_name}`}
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={updateMutation.isPending}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                            >
                                {updateMutation.isPending ? "Updating..." : "Update User"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUser

