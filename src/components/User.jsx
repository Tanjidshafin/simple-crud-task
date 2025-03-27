"use client"

import { Edit, Trash2 } from "lucide-react"

const User = ({ user, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{`${user.first_name} ${user.last_name}`}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onEdit}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="Edit user"
                    >
                        <Edit size={18} />
                    </button>

                    <button
                        onClick={onDelete}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete user"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User

