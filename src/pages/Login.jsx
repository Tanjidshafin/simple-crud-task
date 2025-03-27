"use client"

import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { loginUser } from "../hooks/ApiCalls"
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

        // Basic validation
        if (!email.trim() || !password.trim()) {
            toast.error("Please enter both email and password")
            return
        }

        loginMutation.mutate({ email, password })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to EmployWise</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                    >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </button>

                    {/* Demo credentials hint */}
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>Demo credentials:</p>
                        <p>Email: eve.holt@reqres.in</p>
                        <p>Password: cityslicka</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

