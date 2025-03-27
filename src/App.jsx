import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Users from './pages/Users'
import { Toaster } from 'react-hot-toast'
import EditUser from './pages/EditUser'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App