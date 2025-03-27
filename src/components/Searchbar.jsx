"use client"

import { Search, X } from "lucide-react"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleClear = () => {
        setSearchTerm("")
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />

            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    )
}

export default SearchBar

