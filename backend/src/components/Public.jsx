import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Public = ({children}) => {
    const isLoggedin = useAuth()
  return !isLoggedin ? children : <Navigate to={'/admin'} />
}

export default Public