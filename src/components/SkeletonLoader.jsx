"use client"

import { motion } from "framer-motion"

const SkeletonLoader = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[160px]">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mr-4"></div>
                    <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export const SkeletonGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: "easeOut",
                        }}
                    >
                        <SkeletonLoader />
                    </motion.div>
                ))}
        </div>
    )
}

export default SkeletonLoader

