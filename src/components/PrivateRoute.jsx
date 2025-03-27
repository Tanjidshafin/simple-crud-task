import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AppContext } from '../context/AppContext'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AppContext)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default PrivateRoute