"use client"

import { useContext, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "react-hot-toast"
import User from "../components/User"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import Navbar from "../components/Navbar"
import { deleteUser, getUsers } from "../hooks/ApiCalls"
import { AppContext } from "../context/AppContext"

const Users = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const { logout } = useContext(AppContext)
    const queryClient = useQueryClient()

    // Fetch users with React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
    })

    // Delete user mutation
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

    // Filter users based on search term
    const filteredUsers =
        data?.data.filter((user) => {
            if (!searchTerm) return true
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
            return fullName.includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        }) || []

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar onLogout={handleLogout} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Users List</h1>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500 py-8">Error loading users. Please try again.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.map((user) => (
                                <User
                                    key={user.id}
                                    user={user}
                                    onEdit={() => handleEditUser(user.id)}
                                    onDelete={() => handleDeleteUser(user.id)}
                                />
                            ))}
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-8 text-gray-500">No users found matching your search.</div>
                        )}

                        {!searchTerm && <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={setPage} />}
                    </>
                )}
            </div>
        </div>
    )
}

export default Users

