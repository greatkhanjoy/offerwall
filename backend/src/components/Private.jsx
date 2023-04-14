import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Private = ({children}) => {
    const isLoggedIn = useAuth()

  return isLoggedIn ? children : <Navigate to="/login" />
}

export default Private