import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"))
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
            setIsAuthenticated(true)
        } else {
            localStorage.removeItem("token")
            setIsAuthenticated(false)
        }
    }, [token])
    const login = (newToken) => {
        setToken(newToken)
    }
    const logout = () => {
        setToken(null)
    }
    const value = { token, isAuthenticated, login, logout }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;