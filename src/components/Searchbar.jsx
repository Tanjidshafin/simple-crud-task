"use client"

import { Search, X } from "lucide-react"
import { motion } from "framer-motion"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleClear = () => {
    setSearchTerm("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, width: "80%" }}
      animate={{ opacity: 1, width: "100%" }}
      transition={{ duration: 0.3 }}
      className="relative max-w-md w-full"
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users by name or email..."
        className="pl-10 pr-10 py-3 border-0 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 w-full transition-all"
      />

      {searchTerm && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={18} />
        </motion.button>
      )}
    </motion.div>
  )
}

export default SearchBar

