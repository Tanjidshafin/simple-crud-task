"use client"

import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { loginUser } from "../hooks/ApiCalls"
import { Users } from "lucide-react"
import { AppContext } from "../context/AppContext"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useContext(AppContext)
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            login(data.token)
            toast.success("Login successful!")
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || "Login failed. Please try again.")
        },
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email.trim() || !password.trim()) {
            toast.error("Please enter both email and password")
            return
        }
        loginMutation.mutate({ email, password })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2,
                        }}
                        className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <Users size={32} className="text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-teal-700"
                    >
                        Welcome to EmployWise
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 mt-2"
                    >
                        Sign in to access your dashboard
                    </motion.p>
                </div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="eve.holt@reqres.in"
                            className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="cityslicka"
                            className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-teal-500 flex justify-center items-center gap-2 text-white py-3 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-70 shadow-md"
                    >
                        {loginMutation.isPending ? (<span className="loading loading-spinner loading-xs"></span>) : ""}
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </motion.button>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600"
                    >
                        <p className="font-medium mb-1">Demo credentials:</p>
                        <p>
                            Email: <span className="text-teal-600">eve.holt@reqres.in</span>
                        </p>
                        <p>
                            Password: <span className="text-teal-600">cityslicka</span>
                        </p>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    )
}

export default Login

