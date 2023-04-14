import React from 'react'
import { Navigate } from 'react-router-dom'
import usePermissionCheck from '../hook/usePermissionCheck'

const AdminOnly = ({children}) => {
    const isLoggedIn = usePermissionCheck()

  return isLoggedIn ? children : <Navigate to="/admin" />
}

export default AdminOnly